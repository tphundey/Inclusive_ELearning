import { useGetCategorysQuery } from "@/api/category";
import { useAddProductMutation } from "@/api/courses";
import { useGetRolesQuery } from "@/api/role";
import { useAddUserMutation } from "@/api/user";
import { useGetVideosQuery } from "@/api/video";
import { Icategory } from "@/interfaces/category";
import { Irole } from "@/interfaces/role";
import { Ivideo } from "@/interfaces/video";
import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, Upload, UploadProps, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
const { Option } = Select;

type FieldType = {
    id: string,
    username: string,
    email: string,
    password: string,
    avatarIMG: string,
    address: string,
    phone: number,
    roleID: number
};
// const props: UploadProps = {
//     name: 'file',
//     action: 'http://localhost:3000/users',
//     headers: {
//       authorization: 'authorization-text',
//     },
// }

const AdminUserAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [addUser, { isLoading: isAddProductLoading }] = useAddUserMutation();
    const { data: RolesData } = useGetRolesQuery();
    const [images, setimages] = useState("");
console.log(images);

    const roleSource = RolesData?.map((item: Irole) => ({
        key: item.id,
        role: item.role
    }));
    const onFinish = (values: any) => {
        addUser(values)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Bạn đã thêm user thành công. Chờ 3s để quay về quản trị",
                });
                form.resetFields();
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
                <h2 className="text-2xl">Thêm User</h2>
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
                    label="Tên user"
                    name="username"
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
                <Form.Item<FieldType>
                    label="Mật Khẩu"
                    name="password"
                    rules={[{ required: true, message: "Phải nhập mật khẩu" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Upload
      action="http://localhost:8080/api/images/upload"
      name='images'
      listType="picture"
      maxCount={1}
      onChange={(info) => {
        console.log(info,"inffo");
        
        // setimages(info?.file.response?.urls[0].url)        
      }}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
                
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
                    label="Phone number"
                    name="phone"
                >
                    <Input />
                </Form.Item>
                <Form.Item name="roleID" label="role" rules={[
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

export default AdminUserAdd;
