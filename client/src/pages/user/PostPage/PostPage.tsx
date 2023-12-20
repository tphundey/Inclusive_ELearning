import { CommentOutlined, HeartOutlined, LikeOutlined } from "@ant-design/icons";
import { useEffect, useId, useState } from "react";
import { Form, Input, Button, message, Modal } from 'antd';
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useRef } from "react";
import './Postpage.css'
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from 'uuid';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Post = () => {

    const [likedPosts, setLikedPosts] = useState([]);
    const [user, setUser] = useState<User | null>(null);
    const [userID, setUserID] = useState<User | null>(null);
    const [allPosts, setAllPosts] = useState([]);
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const formRef = useRef(null);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
        likes: 0,
        likedBy: [],  // Initialize likedBy as an array
    });


    const onDrop = async (acceptedFiles: any) => {
        try {
            const formData = new FormData();
            formData.append("file", acceptedFiles[0]);
            formData.append("upload_preset", "your_cloudinary_upload_preset");

            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dsk9jrxzf/image/upload?upload_preset=movies",
                formData
            );

            const imageUrl = response.data.secure_url;
            console.log("Image uploaded successfully:", imageUrl);

            setPostData({ ...postData, image: imageUrl });
            setImagePreviewUrl(imageUrl);
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            console.error("Cloudinary response:", error);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const toggleCommentFormVisibility = () => {
        setShowCommentForm((prevShowCommentForm) => !prevShowCommentForm);
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
                    photoURL: user?.photoURL || "",
                    date: new Date().toDateString(),
                    likes: 0,
                    likedBy: [],
                    comments: [],
                }),
            });

            if (response.ok) {
                // Reset the form fields using the formRef
                formRef.current.resetFields();

                // Clear the image preview URL
                setImagePreviewUrl("");

                const newPost = await response.json();
                setAllPosts((prevPosts: any) => [newPost, ...prevPosts]);

                message.success("Đăng bài thành công");
            } else {
                message.error("Error posting the data.");
            }
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setUserID(currentUser.uid)
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

                // Assuming you have a function to check if the current user has liked a post
                const userLikedPosts = data.filter(post => post.likedBy.includes(user?.uid));

                setLikedPosts(userLikedPosts.map(post => post.id));
                setAllPosts(data.reverse());
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [user?.uid]);
    const [likedPostIds, setLikedPostIds] = useState([]);
    const [likedPostStatus, setLikedPostStatus] = useState({});
    const generateUniqueId = () => {
        return uuidv4();
    };
    const handleLike = async (postId) => {
        try {
            const updatedPosts = allPosts.map((post) => {
                if (post.id === postId) {
                    const liked = post.likedBy.includes(user?.uid);
                    const updatedLikedBy = liked
                        ? post.likedBy.filter((id) => id !== user?.uid)
                        : [...post.likedBy, user?.uid];

                    return {
                        ...post,
                        likes: liked ? post.likes - 1 : post.likes + 1,
                        likedBy: updatedLikedBy,
                    };
                }
                return post;
            });

            const response = await axios.patch(`http://localhost:3000/posts/${postId}`, {
                likes: updatedPosts.find((post) => post.id === postId)?.likes,
                likedBy: updatedPosts.find((post) => post.id === postId)?.likedBy,
            });

            if (response) {
                setAllPosts(updatedPosts);

                // Cập nhật danh sách ID đã like và trạng thái đã like
                const updatedLikedPostIds = updatedPosts
                    .filter((post) => post.likedBy.includes(user?.uid))
                    .map((post) => post.id);

                setLikedPostIds(updatedLikedPostIds);

                const updatedLikedPostStatus = updatedPosts.reduce((status, post) => {
                    status[post.id] = post.likedBy.includes(user?.uid);
                    return status;
                }, {});

                setLikedPostStatus(updatedLikedPostStatus);
            } else {
                message.error("Error updating like status.");
            }
        } catch (error) {
            console.error("Error updating like status:", error);
        }
    };
    const [commentData, setCommentData] = useState({
        text: "",
    });

    const handleCommentSubmit = async (postId) => {
        try {
            if (!commentData.text) {
                message.warning("Please enter your comment.");
                return;
            }

            const response = await axios.patch(`http://localhost:3000/posts/${postId}`, {
                comments: [
                    ...allPosts.find((post) => post.id === postId)?.comments || [],
                    {
                        id: generateUniqueId(),
                        author: user?.displayName || "Anonymous",
                        photoURL: user?.photoURL || "",
                        text: commentData.text,
                        time: new Date().toDateString(),
                    },
                ],
            });

            if (response) {
                const updatedPosts = allPosts.map((post: any) => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            comments: response.data.comments,
                        };
                    }
                    return post;
                });

                setAllPosts(updatedPosts);
                setCommentData({ text: "" }); // Reset trường nhập comment
                message.success("Bình luận thành công");
            } else {
                message.error("Error updating comment.");
            }
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };
    return (
        <>
            <div className="contaner-post-full">
                <div className="container-postpage">
                    <div className="cmt_flex gap-3 items-center">
                        <div>
                            <img className="comment_img mt-7" width={40} src={user?.photoURL} alt="" />
                        </div>
                        <div className="mt-6 w-64">
                            <Button className="mt-2 new-post" onClick={showModal}>Bạn muốn chia sẻ điều gì ?</Button>
                        </div>
                    </div>
                    <Modal
                        title="Tạo bài viết mới"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <Form className="mt-6" ref={formRef} onFinish={handleFormSubmit}>
                            <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Cần nhập vào tiêu đề' }]}>
                                <Input value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                            </Form.Item>
                            <Form.Item label="Nội dung" name="content" rules={[{ required: true, message: 'Cần nhập vào nội dung' }]}>
                                <Input.TextArea value={postData.content} onChange={(e) => setPostData({ ...postData, content: e.target.value })} />
                            </Form.Item>

                            <Form.Item
                                label="Hình ảnh"
                                name="image"
                            >
                                <div {...getRootProps()} style={{ border: '1px dashed #d9d9d9', padding: '20px', textAlign: 'center' }}>
                                    <input {...getInputProps()} />
                                    <p>Thả hình ảnh vào đây hoặc click để chọn hình</p>
                                </div>
                                {imagePreviewUrl && (
                                    <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px" }} />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button className="w-96" type="dashed" htmlType="submit">
                                   Đăng 
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>


                </div>

                {allPosts.slice().reverse().map((post: any) => (
                    <div key={post.id}>
                        <main className="pt-8 lg:pt-16 bg-white dark:bg-gray-900 antialiased mb-10">
                            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                                <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                                    <header className="mb-4 lg:mb-6 not-format">
                                        <address className="flex items-center mb-6 not-italic">
                                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                <img className="mr-4 w-14 h-14 rounded-full" src={post.photoURL} alt="Jese Leos" />
                                                <div>
                                                    <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{post.author}</a>
                                                    <p className="text-base text-gray-500 dark:text-gray-400">{post.date}</p>
                                                </div>
                                            </div>
                                        </address>
                                        <h1 className="text-3xl font-extrabold leading-tight text-gray-900  lg:text-4xl dark:text-white">{post.title}</h1>
                                    </header>
                                    <p className="lead">{post.content}</p>
                                    <br />
                                    <div className="mb-2 img-post">
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
                                            <button
                                                className={`inline-flex items-center px-1 pt-2 ml-1 flex-column}`}
                                                onClick={() => handleLike(post.id)}
                                            // Thay đổi màu sắc tùy thuộc vào trạng thái đã like
                                            >
                                                <LikeOutlined /> <span className="ml-2">Like</span>
                                            </button>
                                            <button className="inline-flex items-center px-1 -ml-1 flex-column mr-20">
                                                <CommentOutlined className="mr-2" />
                                                <Button onClick={() => {
                                                    toggleCommentFormVisibility();
                                                    setSelectedPostId(post.id);
                                                }}> Bình Luận</Button>
                                            </button>
                                            {/* <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column">
                                                <ShareAltOutlined /><span className="ml-2">Chia sẻ</span></button> */}
                                        </div>
                                    </div>
                                    <hr className="shadow-lg text-red-500" />
                                </article>
                            </div>
                        </main>

                        <div className="container-postpage">

                            {showCommentForm && selectedPostId === post.id && (
                                <Form className="container-postpage" ref={formRef} onFinish={() => handleCommentSubmit(post.id)}>
                                    <div className="cmt_flex gap-3 items-center">
                                        <div>
                                            <img className="comment_img" width={40} src={user?.photoURL} alt="" />
                                        </div>
                                        <div className="mt-6 w-64">
                                            <Form.Item name="comment" rules={[{ required: true, message: 'Vui lòng nhập bình luận!' }]}>
                                                <Input placeholder="Viết bình luận công khai" value={commentData.text} onChange={(e) => setCommentData({ text: e.target.value })} />
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

                                                        {/* <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column mr-3" onClick={() => handleLike(post.id)}>Like</button>
                                                        <button onClick={() => toggleReplyFormVisibility(comment.id)}>Reply</button> */}
                                                        {/* {showReplyForm && selectedCommentId === comment.id && (
                                                            <Form onFinish={() => handleReplyFormSubmit(comment.id)}>
                                                                <Form.Item name="reply" rules={[{ required: true, message: 'Please enter your reply!' }]}>
                                                                    <Input placeholder="Your reply" value={commentData.text} onChange={(e) => setCommentData({ text: e.target.value })} />
                                                                </Form.Item>
                                                                <Form.Item>
                                                                    <Button type="primary" htmlType="submit">
                                                                        Reply
                                                                    </Button>
                                                                </Form.Item>
                                                            </Form>
                                                        )} */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 mt-2">
                                            {comment.replies > 0 && (
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
                                                                    {/* Thêm các chức năng khác cho câu trả lời nếu cần */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Post;
