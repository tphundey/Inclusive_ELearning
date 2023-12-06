import { useAddRoleMutation } from "@/api/role";
import { Button, DatePicker, Form, Input, Select, message } from "antd";
import { AiOutlineLoading } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";

type FieldType = {
    id:string,
    role: string
};


const AdminRoleAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [addRole, { isLoading: isAddProductLoading }] = useAddRoleMutation();
    const onFinish = (values: any) => {
        addRole(values)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Bạn đã thêm role thành công. Chờ 3s để quay về quản trị",
                });
                form.resetFields();
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
                <h2 className="text-2xl">Thêm Role</h2>
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
                    label="Chức năng"
                    name="role"
                    rules={[
                        { required: true, message: "Tên Role không được để trống!" },
                        { min: 3, message: "Tên Role ít nhất phải 3 ký tự" },
                    ]}
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

export default AdminRoleAdd;
