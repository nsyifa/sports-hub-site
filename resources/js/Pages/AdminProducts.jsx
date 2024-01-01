import { Head } from "@inertiajs/react";
import { useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useMemo, useCallback } from "react";
import { TbPencil, TbTrash, TbSearch } from "react-icons/tb";
import Dropdown from "@/Components/Dropdown";
import ProductDashboardCard from "@/Components/ProductDashboardCard";
import DataTable from "react-data-table-component";
import PrimaryButton from "@/Components/PrimaryButton";
import { Inertia } from "@inertiajs/inertia";
import ProductUpdateForm from "@/Components/ProductUpdateForm";
import ProductCreateForm from "@/Components/ProductCreateForm";

export default function AdminProducts({ auth, products }) {
    const [tableData, setTableData] = useState(products.original);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = useMemo(() => {
        if (!searchQuery) {
            return tableData;
        }

        return tableData.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, tableData]);

    const handleDelete = async (id) => {
        const userConfirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );
        if (userConfirmed) {
            try {
                await Inertia.delete(`/products/${id}`);
                // setTableData((prevData) => prevData.filter((row) => row.id !== id));
            } catch (error) {
                console.error("Error while deleting product", error);
            }
        } else {
            console.log("Deletion canceled by the user");
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowUpdateForm(!showUpdateForm);
        console.log(product);
    };

    const handleCloseEdit = () => {
        setSelectedProduct(null);
        setShowUpdateForm(false);
    };

    const handleCreate = () => {
        setShowCreateForm(!showCreateForm);
    };

    const handleCloseCreate = () => {
        setShowCreateForm(false);
    };

    const columns = [
        {
            name: "Id",
            selector: (row) => row.id,
            sortable: true,
            width: "4%",
        },
        {
            name: "Image",
            cell: (row) => {
                const [imageError, setImageError] = useState(false);
                const image =
                    row.image.split("~").length > 0
                        ? row.image.split("~")[0]
                        : row.image;

                const used_image = !imageError
                    ? image
                    : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png";

                return (
                    <div className="h-36 w-36">
                        <img
                            className="object-cover h-full w-full"
                            src={used_image}
                            alt={row.name}
                            onError={() => {
                                setImageError(true);
                            }}
                        />
                    </div>
                );
            },
            width: "15%",
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            width: "25%",
        },
        {
            name: "Price",
            selector: (row) => row.price,
            sortable: true,
            format: (row) => "$" + row.price,
            width: "8%",
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            width: "6%",
        },
        {
            name: "Created",
            selector: (row) =>
                row.created_at
                    ? new Date(row.created_at).toLocaleString()
                    : null,
            sortable: true,
            width: "13%",
        },
        {
            name: "Updated",
            selector: (row) =>
                row.updated_at
                    ? new Date(row.updated_at).toLocaleString()
                    : null,
            sortable: true,
            width: "13%",
        },
        {
            name: "Actions",
            button: true,
            minWidth: "10%",
            maxWidth: "auto",
            cell: (row) => (
                <div className="flex flex-row items-center gap-5">
                    <TbPencil
                        size={20}
                        color="gray"
                        className="cursor-pointer"
                        role="button"
                        onClick={() => handleEdit(row)}
                        //   onClick={() => updateHandler(row)}
                    ></TbPencil>

                    <TbTrash
                        size={20}
                        color="black"
                        className="cursor-pointer"
                        role="button"
                        onClick={() => handleDelete(row.id)}
                        //   onClick={() => deleteHandler(row)}
                    ></TbTrash>
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Products
                </h2>
            }
            className="relative"
        >
            {selectedProduct && showUpdateForm && (
                <ProductUpdateForm
                    product={selectedProduct}
                    onClose={handleCloseEdit}
                />
            )}
            {showCreateForm && (
                <ProductCreateForm onClose={handleCloseCreate} />
            )}
            <div className="px-10 pb-10 rounded-xl pt-4">
                <div className="w-full flex flex-row justify-between pb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="rounded-md py-1 px-2 border border-gray-300"
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <TbSearch />
                        </span>
                    </div>{" "}
                    <PrimaryButton onClick={handleCreate}>
                        Add Product
                    </PrimaryButton>
                </div>

                <DataTable
                    pagination
                    fixedHeader
                    columns={columns}
                    data={filteredProducts}
                />
            </div>
        </AuthenticatedLayout>
    );
}
