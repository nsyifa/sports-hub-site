import React, { useState } from "react";

export default function ProductDashboardCard({ product }) {
    const [rating] = useState(5);
    const [imageError, setImageError] = useState(false);
    const [loading, setLoading] = useState(true);

    const image =
        product.image.split("~").length > 0
            ? product.image.split("~")[0]
            : product.image;

    const used_image = !imageError
        ? image
        : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png";

    return (
        <div className="flex w-72 max-w-xs flex-col overflow-hidden border border-gray-100 rounded-xl items-center justify-start bg-white">
            <a
                className="mx-3 mt-3 flex h-60 overflow-hidden rounded-xl relative"
                href="#"
            >
                {loading && (
                    <div className="absolute w-full h-full flex items-center justify-center bg-white">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-500 border-opacity-50"></div>
                    </div>
                )}
                <img
                    className="object-cover w-full p-1 rounded-3xl"
                    src={used_image}
                    alt={product.name}
                    onLoad={() => setLoading(false)}
                    onError={() => {
                        setLoading(false);
                        setImageError(true);
                    }}
                />
            </a>
            <div className="mt-4 px-5 pb-1">
                <a href="#">
                    <h5 className="text-lg tracking-tight text-slate-900">
                        {product.name}
                    </h5>
                </a>
                <div className="mt-2 mb-5 flex flex-col items-start justify-end gap-2">
                    <div className="flex items-end">
                        {[...Array(rating)].map((_, index) => (
                            <svg
                                key={index}
                                aria-hidden="true"
                                className="h-5 w-5 text-yellow-300"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                        ))}
                        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                            {rating}
                        </span>
                    </div>
                    <p>
                        <span className="text-lg font-bold text-slate-900">
                            {"$" + product.price}
                        </span>
                    </p>
                    <p>{`Added: ${new Date(
                        product.created_at
                    ).toLocaleString()}`}</p>
                    <p>{`Updated: ${new Date(
                        product.updated_at
                    ).toLocaleString()}`}</p>
                    <p>{`Status: ${product.status}`}</p>
                </div>
            </div>
        </div>
    );
}
