import { useGetCategorysQuery } from "@/api/category";
import {
    useAddProductMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation,
} from "@/api/courses";
import { Icategory } from "@/interfaces/category";
import { Button, DatePicker, Form, Input, Select, Skeleton, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
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
                        label="Tên khóa học"
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
                    
                <Form.Item<FieldType>
                    label="Hình ảnh"
                    name="courseIMG"
                >
                    <Input />
                </Form.Item>
                {/* <Form.Item	
                name="date"	
                label="DatePicker">	
                    <DatePicker  />	
                </Form.Item> */}
                <Form.Item
                    name="intro"
                    label="Video giới thiệu"
                    rules={[{ required: true, message: 'Vui lòng nhập video giới thiệu' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="thời lượng"
                    name="duration"
                    rules={[{ required: true, message: "Phải nhập thời lượng" }]}
                >
                    <Input />
                </Form.Item>
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
