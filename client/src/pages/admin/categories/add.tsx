import { useAddCategoryMutation } from "@/api/category";
import { Button, Form, Input, message } from "antd";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
type FieldType = {
    categoryName: string,
    categoryDescription: string,
};
const AdminCategoryAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [addProduct, { isLoading: isAddProductLoading }] = useAddCategoryMutation();
    const [existingCategories, setExistingCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/categories');
                const categories = response.data;
                const categoryNames = categories.map((category: any) => category.categoryName);
                setExistingCategories(categoryNames);

            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const onFinish = (values: FieldType) => {
        const { categoryName } = values;
        if (existingCategories.includes(categoryName)) {
            messageApi.error({
                content: 'Tên danh mục đã tồn tại. Vui lòng chọn một tên khác.',
            });
            return;
        }

        addProduct(values)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: 'success',
                    content: 'Bạn đã thêm danh mục thành công. Chờ 2s để quay về quản trị',
                });
                form.resetFields();
                setTimeout(() => {
                    navigate('/admin/categorys');
                }, 2000);
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            {contextHolder}
            <header className="mb-4">
                <h2 className="text-2xl">Thêm danh mục</h2>
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
                <Form.Item<FieldType>
                    label="Tên danh mục"
                    name="categoryName"
                    rules={[
                        { required: true, message: "Tên danh mục không được để trống!" },
                        { min: 5, message: "Tên danh mục ít nhất phải 5 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Mô tả danh mục"
                    name="categoryDescription"
                >
                    <Input />
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

export default AdminCategoryAdd;
