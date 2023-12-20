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
    const [videoDuration, setVideoDuration] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const onDrop = useCallback((acceptedFiles: any[]) => {
        form.setFieldsValue({ videoFile: acceptedFiles[0] });
    }, []);

    const cloudName = 'dsk9jrxzf';
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

            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', values.videoFile);
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dsk9jrxzf/video/upload?upload_preset=movies`,
                {
                    method: 'POST',
                    body: formData,
                }
            );
            setIsUploading(false);
            const responseData = await response.json();
            const uploadedVideoUrl = responseData.secure_url;
            setVideoUrl(uploadedVideoUrl);
            const durationInSeconds = responseData.duration;

            // Lưu trữ thông tin thời lượng vào state
            setVideoDuration(durationInSeconds);
            const durationInMinutes = (durationInSeconds / 60).toFixed(2);
            setVideoDuration(durationInMinutes);
            const videoData = {
                videoTitle: values.videoTitle,
                videoURL: uploadedVideoUrl,
                duration: parseFloat(durationInMinutes),
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
                        updatedCourse.duration += parseFloat(durationInMinutes);
                        fetch(`http://localhost:3000/Courses/${courseId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedCourse),
                        })
                        fetch(`http://localhost:3000/Courses/${courseId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedCourse),
                        })
                            .then(() => {

                                messageApi.open({
                                    type: 'success',
                                    content: 'Thêm video thành công. Vui lòng đợi 3 giây để quay trở lại',
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
                        { required: true, message: 'Tiêu đề video không được bỏ trống' },
                        { min: 3, message: 'Tiêu đề video phải có tối thiểu 3 kí tự' },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* <Form.Item
                    label="Duration"
                    name="duration"
                    rules={[
                        { required: true, message: 'Please enter the duration' },

                    ]}
                >
                    <Input type="number" />
                </Form.Item> */}
                <Form.Item
                    label="Video File"
                    name="videoFile"
                    rules={[
                        { required: true, message: 'Vui lòng chọn file' },
                    ]}
                >
                    <div {...getRootProps()} style={{ border: '1px solid #d9d9d9', padding: '20px', borderRadius: '4px', cursor: 'pointer' }}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Kéo thả file vào đây</p>
                        ) : (
                            <p>Kéo thả flie vào đây, hoặc chọn file</p>
                        )}
                    </div>
                    {videoUrl && (
                        <div>
                            <Video publicId={videoUrl} width="300" controls />
                        </div>
                    )}
                </Form.Item>

                <Form.Item
                    label="Choose Course"
                    name="selectedCourse"
                    rules={[{ required: true, message: 'Vui lòng chọn khóa học' }]}
                >
                    <Select
                        onChange={(value) => setSelectedCourseId(value)}
                        placeholder="Chọn khóa học"
                    >
                        {courses.map((course: any) => (
                            <Option key={course.id} value={course.id}>
                                {course.courseName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    {isUploading ? (
                        <p>Uploading video... <AiOutlineLoading className="animate-spin" /></p>
                    ) : (
                        <>
                            <Button
                                type="primary"
                                danger
                                htmlType="submit"
                                disabled={isUploading} // Disable nút khi đang upload
                            >
                                Add
                            </Button>
                            {videoDuration && <p>Video Duration: {videoDuration} seconds</p>}
                        </>
                    )}
                </Form.Item>


            </Form>
        </CloudinaryContext>
    );
};

export default AdminVideoAdd;
