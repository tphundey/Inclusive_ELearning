import { useGetCategorysQuery, useRemoveCategoryMutation } from "@/api/category";
import { useGetRolesQuery, useRemoveRoleMutation } from "@/api/role";
import { useGetUsersQuery } from "@/api/user";
import { Icategory } from "@/interfaces/category";
import { Irole } from "@/interfaces/role";
import { Iuser } from "@/interfaces/user";
import { Button, Table, Skeleton, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";

const AdminRole = (props: any) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data: rolesData, isLoading: isProductLoading } = useGetRolesQuery();
    const [removeRole, { isLoading: isRemoveLoading }] = useRemoveRoleMutation();
    const dataSource = rolesData?.map((item: Irole) => ({
        key: item.id,
        role : item.role
    }));
    console.log(dataSource);

    const confirm = (id: string) => {
        removeRole(id)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Deleted successfully!",
                });
            });
    };

    const columns = [
        {
            title: "id",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "role",
            dataIndex: "role",
            key: "role",
        },
       
        {
            title: "Hành động",
            render: ({ key: id }: { key:string }) => (
                <div className="flex space-x-2">
                    <Popconfirm
                        placement="top"
                        title={"Remove course"}
                        description={"Are you sure you want to remove this???"}
                        onConfirm={() => confirm(id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>
                            xóa
                        </Button>
                    </Popconfirm>
                    <Button>
                        <Link to={`/admin/role/${id}/edit`}>Sửa</Link>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Quản lý Role</h2>
                <Button type="primary" danger>
                    <Link to="/admin/role/add">Thêm Role</Link>
                </Button>
            </header>
            {contextHolder}
            {isProductLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default AdminRole;
