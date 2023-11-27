import { useGetCategorysQuery } from "@/api/category";
import { useAddProductMutation } from "@/api/courses";
import { Icategory } from "@/interfaces/category";
import { Button, DatePicker, Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

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
    isHidden: false,
};

const AdminProductAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { data: categorysData } = useGetCategorysQuery();
    const [messageApi, contextHolder] = message.useMessage();
    const [addProduct, { isLoading: isAddProductLoading }] = useAddProductMutation();

    const cateSource = categorysData?.map((item: Icategory) => ({
        key: item.id,
        categoryName: item.categoryName,
        categoryDescription: item.categoryDescription
    }));

    const onFinish = (values: any) => {
        const dateValue = values.date.format('YYYY-MM-DD');
        values.date = dateValue;
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
                <Form.Item<any>
                    label="Tên khóa học"
                    name="courseName"
                    rules={[
                        { required: true, message: "Tên khóa học không được để trống!" },
                        { min: 3, message: "Tên khóa học ít nhất phải 3 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<any>
                    label="Giá khóa học"
                    name="price"
                    rules={[{ required: true, message: "Phải nhập giá tiền" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<any>
                    label="Hình ảnh"
                    name="courseIMG"
                >
                    <Input />
                </Form.Item>
                <Form.Item<any>
                    label="Thời lượng (m)"
                    name="duration"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Thời gian tạo">
                    <DatePicker />
                </Form.Item>
                <Form.Item name="intro" label="Video giới thiệu" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="categoryID" label="Danh mục" rules={[{ required: true }]}>
                    <Select
                        placeholder="pick a category"
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
                <Form.Item label="Mô tả"
                    name="description"
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
