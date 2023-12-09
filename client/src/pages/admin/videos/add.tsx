import { useAddVideoMutation } from "@/api/video";
import { Button, Form, Input, Select, message } from "antd";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const { Option } = Select;

type FieldType = {
    videoTitle: string;
    videoURL: string;
};

const AdminVideoAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [addVideo, { isLoading: isAddProductLoading }] = useAddVideoMutation();
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);


    useEffect(() => {
        fetch("http://localhost:3000/Courses")
            .then((response) => response.json())
            .then((data) => {
                setCourses(data);
            })
            .catch((error) => {
                console.error("Error fetching courses: ", error);
            });
    }, []);

    const onFinish = (values: any) => {
        // Create the video object to be added
        const videoData = {
            videoTitle: values.videoTitle,
            videoURL: values.videoURL,
        };

        if (selectedCourseId) {
            videoData.courseId = selectedCourseId;
        }

        addVideo(videoData)
            .unwrap()
            .then(() => {
                const courseId = selectedCourseId;
                const updatedCourse = courses.find((course: any) => course.id === courseId);
                if (updatedCourse) {
                    fetch(`http://localhost:3000/Courses/${courseId}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedCourse),
                    })
                        .then(() => {
                            messageApi.open({
                                type: "success",
                                content: "Video added to the course successfully. Redirecting in 3 seconds.",
                            });
                            form.resetFields();
                            setTimeout(() => {
                                navigate("/admin/videos");
                            }, 3000);
                        })
                        .catch((error) => {
                            console.error("Error updating course:", error);
                        });
                }
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            {contextHolder}
            <header className="mb-4">
                <h2 className="text-2xl">Thêm Video</h2>
            </header>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Title Video"
                    name="videoTitle"
                    rules={[
                        { required: true, message: "Title Video is required!" },
                        { min: 3, message: "Title Video must be at least 3 characters" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="URL Video"
                    name="videoURL"
                    rules={[{ required: true, message: "Video URL is required" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Choose Course"
                    name="selectedCourse"
                    rules={[{ required: true, message: "Please select a course" }]
                    }>
                    <Select
                        onChange={(value) => setSelectedCourseId(value)}
                        placeholder="Select a course"
                    >
                        {courses.map((course) => (
                            <Option key={course.id} value={course.id}>
                                {course.courseName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" danger htmlType="submit">
                        {isAddProductLoading ? (
                            <AiOutlineLoading className="animate-spin" />
                        ) : (
                            "Add"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AdminVideoAdd;
