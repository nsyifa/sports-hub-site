import { Head } from "@inertiajs/react";
import { useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useMemo, useCallback } from "react";
import Dropdown from "@/Components/Dropdown";
import ProductDashboardCard from "@/Components/ProductDashboardCard";
import DataTable from "react-data-table-component";
import PrimaryButton from "@/Components/PrimaryButton";
import { TbSearch } from "react-icons/tb";

export default function AdminUsers({ auth, users }) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [tableData, setTableData] = useState(users.original);
    const [showOnlyNullRegistration, setShowOnlyNullRegistration] =
        useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        userIds: [],
        registration_approve: null,
    });

    const handleRowSelected = useCallback((state) => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handleCheckboxChange = () => {
        setShowOnlyNullRegistration(!showOnlyNullRegistration);
    };

    const filteredTableData = showOnlyNullRegistration
        ? tableData.filter((row) => row.registration_approve === null)
        : tableData;

    const filteredUsers = useMemo(() => {
        if (!searchQuery) {
            return filteredTableData;
        }

        return filteredTableData.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, tableData, filteredTableData]);

    const handleApprove = async (e) => {
        e.preventDefault();

        const userIds = selectedRows.map((user) => user.id);

        try {
            const response = await patch(route("users.update"));

            console.log("Users updated successfully:", userIds);

            // Update tableData state with the updated users
            setTableData((prevTableData) => {
                const updatedTableData = prevTableData.map((item) => {
                    if (userIds.includes(item.id)) {
                        // Update only the users that were included in the request
                        return {
                            ...item,
                            registration_approve: data.registration_approve,
                        };
                    }
                    return item;
                });

                return updatedTableData;
            });

            // Set toggleCleared
            setToggleCleared(!toggleCleared);
            setSelectedRows([]);
        } catch (error) {
            console.error("Error updating users:", error);
        }
    };

    const columns = [
        {
            name: "Id",
            selector: (row) => row.id,
            sortable: true,
            width: "5%",
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            width: "15%",
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
            width: "20%",
        },
        {
            name: "Phone Number",
            selector: (row) => row.phone_number,
            sortable: true,
            width: "10%",
        },
        {
            name: "Registration",
            selector: (row) => row.registration_approve,
            format: (row) =>
                row.registration_approve
                    ? new Date(row.registration_approve).toLocaleString()
                    : "Not Approved",
            sortable: true,
        },
        {
            name: "Created",
            selector: (row) =>
                row.created_at
                    ? new Date(row.created_at).toLocaleString()
                    : null,
            sortable: true,
        },
        {
            name: "Updated",
            selector: (row) =>
                row.updated_at
                    ? new Date(row.updated_at).toLocaleString()
                    : null,
            sortable: true,
        },
    ];

    const rowDisabledCriteria = (row) => row.registration_approve;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            {selectedRows.length > 0 ? (
                <div>
                    <form
                        onSubmit={handleApprove}
                        className="w-full flex flex-row justify-between px-10 py-5 mb-2"
                    >
                        <div className="relative w-max">
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
                        <PrimaryButton
                            key="approve"
                            className="!bg-gray-700 "
                            onClick={() => {
                                setData({
                                    registration_approve:
                                        new Date().toISOString(),
                                    userIds: selectedRows.map(
                                        (user) => user.id
                                    ),
                                });
                            }}
                            icon
                        >
                            Approve Registration
                        </PrimaryButton>
                    </form>
                    <div className="flex items-center mb-4 pl-10">
                        <input
                            type="checkbox"
                            id="showOnlyNullRegistration"
                            checked={showOnlyNullRegistration}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        <label htmlFor="showOnlyNullRegistration">
                            Show only unapproved users
                        </label>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="w-full flex flex-row justify-between items-stretch px-10 py-5 mb-2">
                        <div className="relative w-max">
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
                        <PrimaryButton className="!bg-gray-400 cursor-default !hover:bg-gray-400">
                            Approve Registration
                        </PrimaryButton>
                    </div>{" "}
                    <div className="flex items-center mb-4 pl-10">
                        <input
                            type="checkbox"
                            id="showOnlyNullRegistration"
                            checked={showOnlyNullRegistration}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        <label htmlFor="showOnlyNullRegistration">
                            Show only unapproved users
                        </label>
                    </div>
                </div>
            )}
            <div className="px-10 pb-10 rounded-xl">
                <DataTable
                    pagination
                    selectableRows
                    fixedHeader
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={toggleCleared}
                    selectableRowDisabled={rowDisabledCriteria}
                    columns={columns}
                    data={filteredUsers}
                />
            </div>
        </AuthenticatedLayout>
    );
}
