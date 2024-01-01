import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Dropdown from "@/Components/Dropdown";
import ProductDashboardCard from "@/Components/ProductDashboardCard";

export default function AdminDashboard({ auth, products, users }) {
    const activeProducts = products.original.filter(
        (product) => product.status === "active"
    );
    const activeUsers = users.original.filter(
        (user) => user.registration_approve != null
    );
    const latestProducts = products.original
        .slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 10);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8 px-6 sm:px-12 lg:px-24 flex flex-row flex-wrap justify-evenly items-center gap-4">
                <div className="bg-white shadow-sm rounded-md sm:rounded-lg flex flex-col items-center p-6">
                    <div className="mb-4 text-xl text-gray-900">
                        Number of Products:
                    </div>
                    <div className="mb-4 text-2xl font-bold text-gray-900">
                        {products.original.length}
                    </div>
                    <div className="mb-4 text-xl text-gray-900">
                        Number of Active Products:
                    </div>
                    <div className="mb-4 text-2xl font-bold text-gray-900">
                        {activeProducts.length}
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm rounded-md sm:rounded-lg flex flex-col items-center p-6">
                    <div className="mb-4 text-xl text-gray-900">
                        Number of Users:
                    </div>
                    <div className="mb-4 text-2xl font-bold text-gray-900">
                        {users.original.length}
                    </div>
                    <div className="mb-4 text-xl text-gray-900">
                        Number of Active Users:
                    </div>
                    <div className="mb-4 text-2xl font-bold text-gray-900">
                        {activeUsers.length}
                    </div>
                </div>

                {console.log(latestProducts)}
            </div>
            <div className="px-6 mt-12 sm:px-12 lg:px-24">
                <p className="font-bold text-3xl">Top 10 Latest Products</p>
            </div>
            <div className="pb-8 pt-4 px-6 sm:px-12 lg:px-24 flex flex-row flex-wrap justify-evenly items-stretch gap-4">
                {latestProducts.map((product) => (
                    <ProductDashboardCard product={product} key={product.id} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
