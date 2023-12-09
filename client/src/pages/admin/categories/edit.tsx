import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from "@/api/category";
import {
    useAddProductMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation,
} from "@/api/courses";
import { Button, Form, Input, Skeleton, message } from "antd";
import { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

type FieldType = {
    categoryName: string,
    categoryDescription : string,
};

const AdminCategoryEdit = () => {
    const { idCategory } = useParams<{ idCategory: string }>();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const { data: productData, isLoading: isProductLoading } = useGetCategoryByIdQuery(
        idCategory || ""
    );
    const [updateCategory, { isLoading: isUpdateLoading }] = useUpdateCategoryMutation();
    useEffect(() => {
        form.setFieldsValue(productData);
    }, [productData]);
    const onFinish = (values: any) => {
        updateCategory({ ...values, id: idCategory })
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Bạn đã cập nhật danh mục thành công. Chờ 3s để quay về quản trị",
                });
                setTimeout(() => {
                    navigate("/admin/categorys");
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
                <h2 className="text-2xl">Cập nhật danh mục</h2>
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
                        label="Tên danh mục"
                        name="categoryName"
                        rules={[
                            { required: true, message: "Tên sản phẩm không được để trống!" },
                            { min: 3, message: "Tên sản phẩm ít nhất phải 3 ký tự" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Mô tả danh mục"
                        name="categoryDescription"
                        rules={[{ required: true, message: "Phải nhập giá tiền" }]}
                    >
                        <Input />
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

export default AdminCategoryEdit;
