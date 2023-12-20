import { useGetCategorysQuery } from "@/api/category";
import { useAddProductMutation } from "@/api/courses";
import { Icategory } from "@/interfaces/category";
import { Button, DatePicker, Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useDrivePicker from 'react-google-drive-picker'

const { Option } = Select;
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
const initialValues: any = {
    courseName: '',
    price: 0,
    description: '',
    date: undefined,
    intro: '',
    categoryID: undefined,
    courseIMG: '',
    enrollment: 0,
    duration: 0,
    docs: '',
    isHidden: false,
};

const AdminProductAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [uploadedFileUrl, setUploadedFileUrl] = useState('');
    const [openPicker, authResponse] = useDrivePicker();
    // const customViewsArray = [new google.picker.DocsView()]; // custom view
    const handleOpenPicker = () => {
        openPicker({
            clientId: "1010783738532-3s27nq10o6belplvsp6omrcvcsqfigjt.apps.googleusercontent.com",
            developerKey: "AIzaSyABKJezgqFMe3mkchPJejZuK005AbP2Cgc",
            viewId: "DOCS",
            token: "ya29.a0AfB_byBsCzMLb9kJ30pPyJFwqP_AgHv5jvQX79azdhqcA8hHnRQY7Nm1Wz4BRRZe-v-gVfVOLZWHhMXDESATaNo1B-VnCT3HVy6V8xNk7i2kaxEPGf8PWaptjY6tbMeqv4yRc5qpbizTNZeeBGCBQiGWRElCVenZVkoTaCgYKAQASARMSFQHGX2MigQaRh36QcWnWQ2KKOYID4g0171",
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            // customViews: customViewsArray, // custom view
            callbackFunction: (data) => {
                if (data.action === 'cancel') {
                    console.log('Người dùng đã nhấp vào nút hủy/bỏ');
                } else {
                    console.log(data);
                    const selectedFiles = data.docs; // Mảng các tệp đã chọn
                    // Lấy URL của tệp tin đầu tiên (nếu có)
                    const firstFileUrl = selectedFiles.length > 0 ? selectedFiles[0].url : '';
                    setUploadedFileUrl(firstFileUrl);
                    // Thực hiện các hành động khác nếu cần
                }
            },
        })
    }

    const { data: categorysData } = useGetCategorysQuery();
    const [messageApi, contextHolder] = message.useMessage();
    const [addProduct, { isLoading: isAddProductLoading }] = useAddProductMutation();


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
            form.setFieldsValue({ courseIMG: imageUrl });
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });


    const cateSource = categorysData?.map((item: Icategory) => ({
        key: item.id,
        categoryName: item.categoryName,
        categoryDescription: item.categoryDescription
    }));

    const onFinish = (values: any) => {
        const dateValue = values.date.format('YYYY-MM-DD');
        values.date = dateValue;
        values.duration = 0;
        values.docs = uploadedFileUrl;
        addProduct(values)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Bạn đã thêm khóa học mới thành công. Chờ 3s để quay về quản trị",
                });
                form.resetFields();
                setUploadedFileUrl('');
                setTimeout(() => {
                    navigate("/admin/product");
                }, 3000);
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };


    return (
        <>
            {contextHolder}
            <header className="mb-4">
                <h2 className="text-2xl">Thêm Khóa Học</h2>
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
                initialValues={initialValues}
            >
                <Form.Item
                    label="Tên khóa học"
                    name="courseName"
                    rules={[
                        { required: true, message: "Tên khóa học không được để trống!" },
                        { min: 3, message: "Tên khóa học ít nhất phải 3 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá khóa học (VND)"
                    name="price"
                    rules={[
                        { required: true, message: "Phải nhập giá tiền" },
                    ]}
                >
                    <Input type="number" />
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
                    {form.getFieldValue("courseIMG") && (
                        <img
                            src={form.getFieldValue("courseIMG")}
                            alt="Hình ảnh đã upload"
                            style={{ marginTop: '10px', width: 100, height: 100 }}
                        />
                    )}
                </Form.Item>


                <Form.Item
                    name="date"
                    label="Thời gian xuất bản"
                    rules={[{ required: true, message: 'Vui lòng chọn thời gian tạo' }]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    name="intro"
                    label="Video giới thiệu"
                >
                    <Input placeholder="Video giới thiệu" />
                </Form.Item>

                <Form.Item
                    name="categoryID"
                    label="Danh mục"
                    rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                >
                    <Select
                        placeholder="Vui lòng chọn danh mục"
                        allowClear
                    >
                        {
                            cateSource?.map((item: any) => {
                                return (
                                    <Option value={item.key}>{item.categoryName}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Tài liệu khóa học"
                >
                    <Button onClick={() => handleOpenPicker()}>Upload tài liệu</Button>
                    {uploadedFileUrl && (
                        <span className="text-blue-900  font-bold ml-52"><a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">Open PDF</a></span>
                    )}
                </Form.Item>

                <Form.Item
                    label="Mô tả khóa học"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" danger htmlType="submit">
                        {isAddProductLoading ? (
                            <AiOutlineLoading className="animate-spin" />
                        ) : (
                            "Thêm"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AdminProductAdd;

