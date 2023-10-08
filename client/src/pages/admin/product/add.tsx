import { useAddProductMutation } from "@/api/courses";
import { Button, DatePicker, Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { AiOutlineLoading } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
const { Option } = Select;

type FieldType = {
    courseName?: string;
    price?: number;
    description? : string;
    date : string;
    videoID : string;
    categoryID : string;
};

const AdminProductAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [addProduct, { isLoading: isAddProductLoading }] = useAddProductMutation();
    const onFinish = (values: any) => {
        addProduct(values)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Bạn đã thêm sản phẩm thành công. Chờ 3s để quay về quản trị",
                });
                form.resetFields();
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
                <h2 className="text-2xl">Thêm sản phẩm</h2>
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
                    label="Tên sản phẩm"
                    name="courseName"
                    rules={[
                        { required: true, message: "Tên sản phẩm không được để trống!" },
                        { min: 3, message: "Tên sản phẩm ít nhất phải 3 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Giá sản phẩm"
                    name="price"
                    rules={[{ required: true, message: "Phải nhập giá tiền" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="ID video"
                    name="videoID"
                    rules={[{ required: true, message: "Phải nhập url video" }]}
                >
                    <Select
                        placeholder="pick a category"
                        allowClear
                        >
                        <Option value="1"> 1</Option>
                        <Option value="2"> 2</Option>
                        <Option value="3"> 3</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                name="date"
                label="DatePicker">
                    <DatePicker  />
                </Form.Item>
                <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                    <Select
                        placeholder="pick a category"
                        allowClear
                        >
                        <Option value="1">cate 1</Option>
                        <Option value="2">cate 2</Option>
                        <Option value="3">cate 3</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Mô tả sản phẩm"
                name="description"
                >
                    <TextArea  rows={4} />
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
