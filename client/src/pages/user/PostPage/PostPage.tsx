import { CommentOutlined, HeartOutlined, LikeOutlined, ShareAltOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react";
import { Form, Input, Button } from 'antd';


const { TextArea } = Input;

const PostForm = ({ onSubmit }) => {
    const onFinish = (values) => {
        // Handle the form submission, pass the data to the parent component
        onSubmit(values);
    };

    return (
        <Form name="postForm" onFinish={onFinish}>
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please enter the title!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Content"
                name="content"
                rules={[{ required: true, message: 'Please enter the content!' }]}
            >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Post
                </Button>
            </Form.Item>
        </Form>
    );
};

const Post = () => {
    const [allPosts, setAllPosts] = useState([]);
    const handlePostSubmission = async (postData) => {
        try {
            // Make a POST request to your API endpoint
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                // Handle successful response (e.g., show a success message)
                console.log('Article posted successfully!');
            } else {
                // Handle error response
                console.error('Error posting article:', response.status);
            }
        } catch (error) {
            console.error('Error posting article:', error);
        }
    };

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

    return <>

        {allPosts.map((post) => (
            <div key={post.id}>
                <main className="pt-8 lg:pt-16 bg-white dark:bg-gray-900 antialiased mb-10">
                    <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                            <header className="mb-4 lg:mb-6 not-format">
                                <address className="flex items-center mb-6 not-italic">
                                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                        <img className="mr-4 w-16 h-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos" />
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
                            {/* img */}
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
                {/* comment */}

                <div className="antialiased mx-auto max-w-screen-sm mb-20">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Tất cả bình luận</h3>
                    <div className="space-y-4">
                        {post.comments.map((comment) => (
                            <div key={comment.id}>
                                <div className="flex">
                                    <div className="flex-shrink-0 mr-3">
                                        <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="" />
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
                                    {comment.replies.map((reply) => (
                                        <div key={reply.id} className="flex ml-6">
                                            <div className="flex">
                                                <div className="flex-shrink-0 mr-3">
                                                    <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="" />
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
                    </div >
                </div >

            </div >
        ))}

    </>

}
export default Post