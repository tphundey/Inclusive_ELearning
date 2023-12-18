import { useGetCategorysQuery } from "@/api/category";
import {
    useAddProductMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation,
} from "@/api/courses";
import { Icategory } from "@/interfaces/category";
import { Button, DatePicker, Form, Input, Select, Skeleton, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { CloudinaryContext, Video } from 'cloudinary-react';
const { Option } = Select;

type FieldType = {
    courseName?: string;
    price?: number;
    description? : string;
    date : string;
    videoID : Number;
    categoryID : Number;
    courseIMG : Number;
    duration : number;
    intro: string;
};

const AdminProductEdit = () => {
    
    const { idProduct } = useParams<{ idProduct: string }>();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const { data: productData, isLoading: isProductLoading } = useGetProductByIdQuery(
        idProduct || ""
    );
    const [updateProduct, { isLoading: isUpdateLoading }] = useUpdateProductMutation();

    useEffect(() => {
        form.setFieldsValue(productData);
    }, [productData]);

    const onFinish = (values: any) => {
        updateProduct({ ...values, id: idProduct, isDeleted: true})
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Bạn đã cập nhật sản phẩm thành công. Chờ 3s để quay về quản trị",
                });
                setTimeout(() => {
                    navigate("/admin/product");
                }, 3000);
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const { data: cateData } = useGetCategorysQuery();
    const dataSource = cateData?.map((item: Icategory) => ({
        key: item.id,
        categoryName: item.categoryName,
        categoryDescription : item.categoryDescription
    }));
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
            form.setFieldsValue({ courseIMG: imageUrl, videoFile: acceptedFiles[0] });
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
        }
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
        <>
            {contextHolder}
            <header className="mb-4">
                <h2 className="text-2xl">Cập nhật khóa học</h2>
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
                        label="Tiêu đề khóa học"
                        name="courseName"
                        rules={[
                            { required: true, message: "Tên sản khóa học được để trống!" },
                            { min: 3, message: "Tên khóa học ít nhất phải 3 ký tự" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Giá khóa học"
                        name="price"
                        rules={[{ required: true, message: "Phải nhập giá tiền" }]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                    label="Hình ảnh"
                    name="courseIMG"
                    rules={[{ type: 'url', message: 'Hình ảnh không hợp lệ', required: true }]}
                >
                    <div {...getRootProps()} style={{ border: '1px dashed #d9d9d9', padding: '20px', textAlign: 'center' }}>
                        <input {...getInputProps()} />
                        <p>Thả hình ảnh vào đây hoặc click để chọn hình</p>
                    </div>
                    <img src={form.getFieldValue("courseIMG")} alt="Preview" style={{ marginTop: '10px', width: 100, height: 100 }} />
                </Form.Item>
                <Form.Item
                    name="intro"
                    label="Video giới thiệu"
                >
                    <Input/>
                </Form.Item>
                {/* <Form.Item<FieldType>
                    label="thời lượng"
                    name="duration"
                    rules={[{ required: true, message: "Phải nhập thời lượng" }]}
                >
                    <Input />
                </Form.Item> */}
                <Form.Item name="categoryID" label="Danh mục" rules={[{ required: true }]}>
                    <Select
                        placeholder="pick a category"
                        allowClear
                        >
                        {
                            dataSource?.map((item: any) => {
                                return (
                                    <Option value={item.key}>{item.categoryName}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                
                <Form.Item label="Mô tả khóa học"
                name="description"
                >
                    <TextArea  rows={4} />
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
        </>
    );
};

export default AdminProductEdit;
