import { useState, useEffect, useCallback } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { AiOutlineLoading } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAddVideoMutation } from '@/api/video';
import { CloudinaryContext, Video } from 'cloudinary-react';
import { useDropzone } from 'react-dropzone';
const { Option } = Select;

const AdminVideoAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [addVideo, { isLoading: isAddProductLoading }] = useAddVideoMutation();
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const onDrop = useCallback((acceptedFiles: any[]) => {

        form.setFieldsValue({ videoFile: acceptedFiles[0] });
    }, []);
    const cloudName = 'your_cloud_name'; // Thay thế bằng tên cloud của bạn trên Cloudinary
    const uploadPreset = 'your_upload_preset'; // Thay thế bằng upload preset của bạn trên Cloudinary
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    useEffect(() => {
        // Fetch courses
        fetch('http://localhost:3000/Courses')
            .then((response) => response.json())
            .then((data) => {
                setCourses(data);
            })
            .catch((error) => {
                console.error('Error fetching courses: ', error);
            });
    }, []);

    const onFinish = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append('file', values.videoFile);
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dsk9jrxzf/video/upload?upload_preset=movies`,
                {
                    method: 'POST',
                    body: formData,
                }
            );
            const responseData = await response.json();
            console.log(responseData);
            const uploadedVideoUrl = responseData.secure_url;

            setVideoUrl(uploadedVideoUrl);

            // Create the video object to be added
            const videoData = {
                videoTitle: values.videoTitle,
                videoURL: uploadedVideoUrl,
            };

            if (selectedCourseId) {
                videoData.courseId = selectedCourseId;
            }

            // Add video to your database or API
            addVideo(videoData)
                .unwrap()
                .then(() => {
                    const courseId = selectedCourseId;
                    const updatedCourse = courses.find((course: any) => course.id === courseId);
                    if (updatedCourse) {
                        // Update course on your server
                        fetch(`http://localhost:3000/Courses/${courseId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedCourse),
                        })
                            .then(() => {

                                messageApi.open({
                                    type: 'success',
                                    content: 'Video added to the course successfully. Redirecting in 3 seconds.',
                                });

                                form.resetFields();
                                setTimeout(() => {
                                    navigate('/admin/videos');
                                }, 3000);
                            })
                            .catch((error) => {
                                console.error('Error updating course:', error);
                            });
                    }
                });
        } catch (error) {
            console.error('Error uploading video to Cloudinary:', error);
            message.error('Error uploading video. Please try again.');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <CloudinaryContext cloudName={cloudName}>
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
                        { required: true, message: 'Title Video is required!' },
                        { min: 3, message: 'Title Video must be at least 3 characters' },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Video File"
                    name="videoFile"
                    rules={[
                        { required: true, message: 'Please select a video file' },
                    ]}
                >
                    <div {...getRootProps()} style={{ border: '1px solid #d9d9d9', padding: '20px', borderRadius: '4px', cursor: 'pointer' }}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : (
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        )}
                    </div>
                </Form.Item>

                <Form.Item
                    label="Choose Course"
                    name="selectedCourse"
                    rules={[{ required: true, message: 'Please select a course' }]}
                >
                    <Select
                        onChange={(value) => setSelectedCourseId(value)}
                        placeholder="Select a course"
                    >
                        {courses.map((course: any) => (
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
                            'Add'
                        )}
                    </Button>
                </Form.Item>

                {videoUrl && (
                    <div>
                        <Video publicId={videoUrl} width="300" controls />
                    </div>
                )}
            </Form>
        </CloudinaryContext>
    );
};

export default AdminVideoAdd;
