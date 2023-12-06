import { useGetCategorysQuery } from "@/api/category";
import {
    useAddProductMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation,
} from "@/api/courses";
import { useGetRolesQuery } from "@/api/role";
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/api/user";
import { Icategory } from "@/interfaces/category";
import { Irole } from "@/interfaces/role";
import { Button, DatePicker, Form, Input, Select, Skeleton, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

type FieldType = {
    id: string,
    displayName: string,
    email: string,
    password: string,
    photoURL: string,
    img: string,
    address: string,
    phone: number,
    roleID: number
};

const AdminUserEdit = () => {
    
    const { idUser } = useParams<{ idUser: string }>();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const { data: UserData, isLoading: isProductLoading } = useGetUserByIdQuery(
        idUser || ""
    );
    const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
    const { data: RolesData } = useGetRolesQuery();
    const roleSource = RolesData?.map((item: Irole) => ({
        key: item.id,
        role: item.role
    }));
    // Đồng bộ sản phẩm từ API vào form
    useEffect(() => {
        form.setFieldsValue(UserData);
    }, [UserData]);
    const onFinish = (values: any) => {
        updateUser({ ...values, id: idUser})
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Bạn đã cập nhật thành công. Chờ 3s để quay về quản trị",
                });
                setTimeout(() => {
                    navigate("/admin/users");
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
                <h2 className="text-2xl">Cập nhật thông tin người dùng</h2>
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
                    label="Tên người dùng"
                    name="displayName"
                    rules={[
                        { required: true, message: "Tên user không được để trống!" },
                        { min: 3, message: "Tên user ít nhất phải 3 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, type : "email"}]}
                >
                    <Input />
                </Form.Item>
                {/* <Form.Item<FieldType>
                    label="Mật Khẩu"
                    name="password"
                    rules={[{ required: true, message: "Phải nhập mật khẩu" }]}
                >
                    <Input.Password />
                </Form.Item> */}

                <Form.Item<FieldType>
                    label="Hình ảnh"
                    name="photoURL"
                >
                    <Input />
                </Form.Item>
                
                {/* <Form.Item<FieldType>
                    label="avatarIMG"
                    name="avatarIMG"
                >
                    <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                </Form.Item> */}

                <Form.Item<FieldType>
                    label="Địa chỉ"
                    name="address"
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Số điện thoại"
                    name="phone"
                >
                    <Input />
                </Form.Item>
                {/* <Form.Item name="roleID" label="role" rules={[
                    { required: true }
                    ]}>
                    <Select
                        placeholder="pick a role"
                        allowClear
                        >
                        {
                            roleSource?.map((item: any) => {
                                return (
                                    <Option value={item.key}>{item.role}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item> */}
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

export default AdminUserEdit;
