import { CommentOutlined, HeartOutlined, LikeOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Form, Input, Button, message } from 'antd';
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useRef } from "react";
import './Postpage.css'
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Post = () => {
    const [user, setUser] = useState<User | null>(null);
    const [allPosts, setAllPosts] = useState([]);
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
    });
    const [commentData, setCommentData] = useState({
        text: "",
    });
    const formRef = useRef(null);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const toggleCommentFormVisibility = () => {
        setShowCommentForm((prevShowCommentForm) => !prevShowCommentForm);
    };

    const toggleFormVisibility = () => {
        setShowForm((prevShowForm) => !prevShowForm);
    };

    const handleFormSubmit = async () => {
        try {
            const response = await fetch("http://localhost:3000/posts", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...postData,
                    author: user?.displayName || "Anonymous",
                    photoURL: user?.photoURL || "", // Include the user's avatar in the post data
                    date: new Date().toDateString(),
                    likes: 0,
                    comments: [],
                }),
            });

            if (response.ok) {
                // Clear the form data
                setPostData({
                    title: "",
                    content: "",
                    image: "",
                });

                // Fetch and update the posts data
                const newPost = await response.json();

                // Update the local state with the new post
                setAllPosts((prevPosts) => [newPost, ...prevPosts]);

                // Display a success message
                message.success("Post successful!");
            } else {
                message.error("Error posting the data.");
            }
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    const handleCommentFormSubmit = async () => {
        try {
            // Tìm bài viết hiện tại trong danh sách allPosts
            const currentPost = allPosts.find(post => post.id === selectedPostId);

            const response = await fetch(`http://localhost:3000/posts/${selectedPostId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Thêm mới comment vào mảng comments của bài viết
                    comments: [
                        ...currentPost.comments, // Sử dụng currentPost.comments thay vì post.comments
                        {
                            author: user?.displayName || "Anonymous",
                            photoURL: user?.photoURL || "",
                            text: commentData.text,
                            time: new Date().toLocaleString(),
                            likes: 0,
                            replies: [],
                        },
                    ],
                }),
            });

            if (response.ok) {
                // Clear the comment form data
                setCommentData({
                    text: "",
                });

                // Fetch and update the posts data
                const updatedPost = await response.json();

                // Update the local state with the updated post
                setAllPosts((prevPosts) => {
                    return prevPosts.map((post) => {
                        if (post.id === selectedPostId) {
                            return updatedPost;
                        }
                        return post;
                    });
                });

                // Hiển thị thông báo thành công
                message.success("Bình luận thành công!");
            } else {
                message.error("Lỗi khi đăng bình luận.");
            }
        } catch (error) {
            console.error("Lỗi khi đăng bình luận:", error);
        }
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, [auth, selectedPostId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/posts");
                const data = await response.json();
                setAllPosts(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="container-postpage">
                <Button className="mt-2" onClick={toggleFormVisibility}>Bạn muốn chia sẻ điều gì ?</Button>

                {showForm && (
                    <Form ref={formRef} onFinish={handleFormSubmit}>
                        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
                            <Input value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="Content" name="content" rules={[{ required: true, message: 'Please input the content!' }]}>
                            <Input.TextArea value={postData.content} onChange={(e) => setPostData({ ...postData, content: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="Image URL" name="image">
                            <Input value={postData.image} onChange={(e) => setPostData({ ...postData, image: e.target.value })} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Post
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </div>

            {allPosts.slice().reverse().map((post: any) => (
                <div key={post.id}>
                    <main className="pt-8 lg:pt-16 bg-white dark:bg-gray-900 antialiased mb-10">
                        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                            <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                                <header className="mb-4 lg:mb-6 not-format">
                                    <address className="flex items-center mb-6 not-italic">
                                        <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                            <img className="mr-4 w-16 h-16 rounded-full" src={post.photoURL} alt="Jese Leos" />
                                            <div>
                                                <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{post.author}</a>
                                                <p className="text-base text-gray-500 dark:text-gray-400">{post.date}</p>
                                            </div>
                                        </div>
                                    </address>
                                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{post.title}</h1>
                                </header>
                                <p className="lead">{post.content}</p>
                                <br />
                                <div className="mb-2">
                                    <img src={post.image} alt="" />
                                </div>
                                <div className="flex items-center mb-2">
                                    <p className="inline-flex items-center px-1 pt-2 ml-1 flex-column">
                                        <HeartOutlined className="text-red-500" /> <LikeOutlined className="text-blue-500" /><span className="ml-1">{post.likes}</span>
                                    </p>
                                </div>
                                <div className="pb-1">
                                    <hr />
                                </div>
                                <div className="mb-2 flex items-center">
                                    <div className="text-m text-gray-500 font-semibold">
                                        <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column mr-20 ml-20">
                                            < LikeOutlined /> <span className="ml-2">Thích</span>
                                        </button>
                                        <button className="inline-flex items-center px-1 -ml-1 flex-column mr-20">
                                            <CommentOutlined /> <span className="ml-2">Bình luận</span>
                                        </button>
                                        <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column">
                                            <ShareAltOutlined /><span className="ml-2">Chia sẻ</span></button>
                                    </div>
                                </div>
                                <hr className="shadow-lg text-red-500" />
                            </article>
                        </div>
                    </main>

                    <div className="container-postpage">
                        <Button onClick={() => {
                            toggleCommentFormVisibility();
                            setSelectedPostId(post.id);
                        }}>Hiển thị/Ẩn Form Bình Luận</Button>

                        {showCommentForm && selectedPostId === post.id && (
                            <Form className="container-postpage" ref={formRef} onFinish={handleCommentFormSubmit}>
                                <div className="cmt_flex gap-3 items-center">
                                    <div>
                                        <img className="comment_img" width={40} src={user?.photoURL} alt="" />
                                    </div>
                                    <div className="mt-6 w-64">
                                        <Form.Item name="comment" rules={[{ required: true, message: 'Vui lòng nhập bình luận!' }]}>
                                            <Input  placeholder="Viết bình luận công khai" value={commentData.text} onChange={(e) => setCommentData({ text: e.target.value })} />
                                        </Form.Item>
                                    </div>
                                </div>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Đăng Bình Luận
                                    </Button>
                                </Form.Item>
                            </Form>
                        )}

                    </div>
                    <div className="antialiased mx-auto max-w-screen-sm mb-20">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Tất cả bình luận</h3>
                        <div className="space-y-4">
                            {post.comments.map((comment: any) => (
                                <div key={comment.id}>
                                    <div className="flex">
                                        <div className="flex-shrink-0 mr-3">
                                            <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={comment.photoURL} alt="" />
                                        </div>
                                        <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                            <strong>{comment.author}</strong> <span className="text-xs text-gray-400">{comment.time}</span>
                                            <p className="text-sm">
                                                {comment.text}
                                            </p>
                                            <div className="flex items-center">
                                                <div className="text-sm text-gray-500 font-semibold">
                                                    <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column mr-3">
                                                        Thích
                                                    </button>
                                                    <button className="inline-flex items-center px-1 -ml-1 flex-column mb-5">
                                                        Phản hồi
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mt-2">
                                        {comment.replies.map((reply: any) => (
                                            <div key={reply.id} className="flex ml-6">
                                                <div className="flex">
                                                    <div className="flex-shrink-0 mr-3">
                                                        <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={reply.photoURL} alt="" />
                                                    </div>
                                                    <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                                        <strong>{reply.author}</strong> <span className="text-xs text-gray-400">{reply.time}</span>
                                                        <p className="text-sm">
                                                            {reply.text}
                                                        </p>
                                                        <div className="flex items-center">
                                                            <div className="text-sm text-gray-500 font-semibold">
                                                                <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column mr-3">
                                                                    Thích
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Post;
