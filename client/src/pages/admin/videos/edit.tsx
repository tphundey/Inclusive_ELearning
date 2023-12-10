import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from "@/api/category";
import {
    useAddProductMutation,
    useGetProductByIdQuery,
    useGetProductsQuery,
    useUpdateProductMutation,
} from "@/api/courses";
import { useGetVideoByIdQuery, useUpdateVideoMutation } from "@/api/video";
import { IProduct } from "@/interfaces/product";
import { Button, Form, Input, Select, Skeleton, message } from "antd";
import { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
type FieldType = {
    videoTitle: string,
    videoURL : string,
};

const AdminVideoEdit = () => {
    const { idVideo } = useParams<{ idVideo: string }>();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const { data: productData, isLoading: isProductLoading } = useGetVideoByIdQuery(
        idVideo || ""
    );
    const [updateVideo, { isLoading: isUpdateLoading }] = useUpdateVideoMutation();
    useEffect(() => {
        form.setFieldsValue(productData);
    }, [productData]);
    const onFinish = (values: any) => {
        updateVideo({ ...values, id: idVideo })
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Bạn đã cập nhật video thành công. Chờ 3s để quay về quản trị",
                });
                setTimeout(() => {
                    navigate("/admin/videos");
                }, 3000);
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const { data: dataCourse } = useGetProductsQuery();
    const dataSource = dataCourse?.map((item: IProduct) => ({
        key: item.id,
        courseName: item.courseName
    }));

    return (
        <>
            {contextHolder}
            <header className="mb-4">
                <h2 className="text-2xl">Cập nhật Video</h2>
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
                        label="Title video"
                        name="videoTitle"
                        rules={[
                            { required: true, message: "Mô tả không được để trống!" },
                            { min: 3, message: "Mô tả ít nhất phải 3 ký tự" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="URL video"
                        name="videoURL"
                        rules={[{ required: true, message: "Phải nhập URL video" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="courseId" label="Khóa học" rules={[{ required: true }]}>
                    <Select
                        placeholder="chọn khóa học"
                        allowClear
                        >
                        {
                            dataSource?.map((item: any) => {
                                return (
                                    <Option value={item.key}>{item.courseName}</Option>
                                )
                            })
                        }
                    </Select>
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

export default AdminVideoEdit;
