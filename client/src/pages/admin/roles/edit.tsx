import { useGetCategorysQuery } from "@/api/category";
import {
    useAddProductMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation,
} from "@/api/courses";
import { useGetRoleByIdQuery, useUpdateRoleMutation } from "@/api/role";
import { Icategory } from "@/interfaces/category";
import { Button, DatePicker, Form, Input, Select, Skeleton, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

type FieldType = {
    id:string,
    role:string
};

const AdminRoleEdit = () => {
    
    const { idRole } = useParams<{ idRole: string }>();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const { data: roleData, isLoading: isProductLoading } = useGetRoleByIdQuery(
        idRole || ""
    );
    const [updateRole, { isLoading: isUpdateLoading }] = useUpdateRoleMutation();

    // Đồng bộ sản phẩm từ API vào form
    useEffect(() => {
        form.setFieldsValue(roleData);
    }, [roleData]);
    const onFinish = (values: any) => {
        updateRole({ ...values, id: idRole})
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Bạn đã cập nhật role thành công. Chờ 3s để quay về quản trị",
                });
                setTimeout(() => {
                    navigate("/admin/roles");
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
                <h2 className="text-2xl">Cập nhật Role</h2>
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
                        label="Tên sản phẩm"
                        name="role"
                        rules={[
                            { required: true, message: "Tên sản phẩm không được để trống!" },
                            { min: 3, message: "Tên sản phẩm ít nhất phải 3 ký tự" },
                        ]}
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

export default AdminRoleEdit;
