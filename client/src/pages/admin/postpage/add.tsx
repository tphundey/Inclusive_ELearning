import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useRef } from "react";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { CommentOutlined, HeartOutlined, LikeOutlined } from "@ant-design/icons";
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigate } from "react-router-dom";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



const AdminPostAdd = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [allPosts, setAllPosts] = useState([]);
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
    });
    const formRef = useRef(null);
    const [selectedPostId, setSelectedPostId] = useState(null);
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
                setPostData({
                    title: "",
                    content: "",
                    image: "",
                });


                const newPost = await response.json();
                setAllPosts((prevPosts: any) => [newPost, ...prevPosts]);

                message.success("Đăng bài thành công");
                setTimeout(() => {
                    navigate("/admin/postpage");
                }, 3000);
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

                
                const reversedData = data.reverse();
                setAllPosts(reversedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
         {/* {contextHolder} */}
           
            <header className="mb-4">
                <h2 className="text-2xl">Thêm Post</h2>
            </header>
            {/* <Form className="mt-6" ref={formRef} onFinish={handleFormSubmit}>	
                            <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>	
                                <Input value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />	
                            </Form.Item>	
                            <Form.Item label="Nội dung" name="content" rules={[{ required: true, message: 'Please input the content!' }]}>	
                                <Input.TextArea value={postData.content} onChange={(e) => setPostData({ ...postData, content: e.target.value })} />	
                            </Form.Item>	
                            <Form.Item label="Hình ảnh (url)" name="image">	
                                <Input value={postData.image} onChange={(e) => setPostData({ ...postData, image: e.target.value })} />	
                            </Form.Item>	
                            <Form.Item>	
                                <Button className="w-96" type="dashed" htmlType="submit">	
                                    Post	
                                </Button>	
                            </Form.Item>	
                        </Form> */}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                ref={formRef}
                onFinish={handleFormSubmit}
                autoComplete="off"
            >
                <Form.Item<any>
                    label="Tiêu đề"
                    name="title" rules={[{ required: true, message: 'Cần nhập vào tiêu đề' }]}
                >
                    <Input value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                </Form.Item>

                <Form.Item<any>
                    label="Nội dung" 
                    name="content" 
                    rules={[{ required: true, message: 'Cần nhập vào nội dung' }]}
                >
                <Input.TextArea value={postData.content} onChange={(e) => setPostData({ ...postData, content: e.target.value })} />
                </Form.Item>
                <Form.Item label="Hình ảnh (url)" name="image">
                    <Input value={postData.image} onChange={(e) => setPostData({ ...postData, image: e.target.value })} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" danger htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AdminPostAdd;
