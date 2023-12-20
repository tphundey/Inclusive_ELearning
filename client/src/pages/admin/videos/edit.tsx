import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from "@/api/category";
import {
    useAddProductMutation,
    useGetProductByIdQuery,
    useGetProductsQuery,
    useUpdateProductMutation,
} from "@/api/courses";
import { useAddVideoMutation, useGetVideoByIdQuery, useUpdateVideoMutation } from "@/api/video";
import { IProduct } from "@/interfaces/product";
import { Button, Form, Input, Select, Skeleton, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useDropzone } from 'react-dropzone';
import { CloudinaryContext, Video } from 'cloudinary-react';
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
type FieldType = {
    videoTitle: string,
    videoURL : string,
};

const AdminVideoEdit = () => {
    const { idVideo } = useParams<{ idVideo: string }>();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const { data: productData, isLoading: isProductLoading } = useGetVideoByIdQuery(
        idVideo || ""
    );
    const [addVideo, { isLoading: isAddProductLoading }] = useAddVideoMutation();
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoDuration, setVideoDuration] = useState(null);
    const onDrop = useCallback((acceptedFiles: any[]) => {
        form.setFieldsValue({ videoFile: acceptedFiles[0] });
    }, []);
    const cloudName = 'dsk9jrxzf';
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const [updateVideo, { isLoading: isUpdateLoading }] = useUpdateVideoMutation();
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

    useEffect(() => {
        form.setFieldsValue(productData);
    }, [productData]);
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

            updateVideo({ ...videoData, id: idVideo })
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
                                    content: 'Sửa video thành công. Vui lòng đợi 3 giây để quay trở lại',
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
                }).then(() => {

                    messageApi.open({
                        type: 'success',
                        content: 'Sửa video thành công. Vui lòng đợi 3 giây để quay trở lại',
                    });

                    form.resetFields();
                    setTimeout(() => {
                        navigate('/admin/videos');
                    }, 3000);
                });
        } catch (error) {
            console.error('Error uploading video to Cloudinary:', error);
            message.error('Có lỗi xảy ra khi cập nhật video, vui lòng thử lại');
        }
        // updateVideo({ ...values, id: idVideo })
        //     .unwrap()
        //     .then(() => {
        //         messageApi.open({
        //             type: "success",
        //             content: "Bạn đã cập nhật video thành công. Chờ 3s để quay về quản trị",
        //         });
        //         setTimeout(() => {
        //             navigate("/admin/videos");
        //         }, 3000);
        //     });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const { data: dataCourse } = useGetProductsQuery();
    const dataSource = dataCourse?.map((item: IProduct) => ({
        key: item.id,
        courseName: item.courseName
    }));

    return (
        
        <CloudinaryContext cloudName={cloudName}>
            {contextHolder}
            <header className="mb-4">
                <h2 className="text-2xl">Cập nhật Video</h2>
            </header>
            {isProductLoading ? (
                <Skeleton />
            ) : (
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
                    <Form.Item<FieldType>
                        label="Title video"
                        name="videoTitle"
                        rules={[
                            { required: true, message: "Mô tả không được để trống!" },
                            { min: 3, message: "Mô tả ít nhất phải 3 ký tự" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

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
                </Form.Item>
                    <Form.Item name="courseId" label="Khóa học" rules={[{ required: true }]}>
                    <Select
                        placeholder="chọn khóa học"
                        allowClear
                        >
                        {
                            dataSource?.map((item: any) => {
                                return (
                                    <Option value={item.key}>{item.courseName}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" danger htmlType="submit">
                            {isUpdateLoading ? (
                                <AiOutlineLoading className="animate-spin" />
                            ) : (
                                "Cập nhật"
                            )}
                        </Button>
                    </Form.Item>
                </Form>
            )}
            </CloudinaryContext>
       
    );
};

export default AdminVideoEdit;
