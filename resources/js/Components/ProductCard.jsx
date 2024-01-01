import React, { useState } from "react";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

export default function ProductCard({ product }) {
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
        <div className="mt-10 flex sm:mb-8 w-72 mx-auto max-w-xs flex-col justify-between overflow-hidden relative z-0">
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
                    className="object-cover w-full p-1"
                    src={used_image}
                    alt={product.name}
                    onLoad={() => setLoading(false)}
                    onError={() => {
                        setLoading(false);
                        setImageError(true);
                    }}
                />
            </a>
            <div className="mt-4 px-5">
                <a href="#">
                    <h5 className="text-lg font-semibold font-robotocon uppercase tracking-tight text-slate-900">
                        {product.name}
                    </h5>
                </a>
                <div className="w-full h-[2px] bg-black mt-2"></div>
                <div className="mt-2 mb-5 flex flex-col sm:flex-row sm:items-center justify-between">
                    <p>
                        <span className="text-xl font-bold text-slate-900">
                            {"$" + product.price}
                        </span>
                    </p>
                    <div className="flex mt-2 sm:mt-0 items-center">
                        {[...Array(rating)].map((_, index) => (
                            <svg
                                key={index}
                                aria-hidden="true"
                                className="h-5 w-5 text-slate-900"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                        ))}
                        <span className="mr-2 ml-3 rounded font-robotocon bg-slate-900 px-2.5 py-0.5 text-xs text-white font-semibold">
                            {rating}
                        </span>
                    </div>
                </div>
                <a
                    href="#"
                    className="flex items-center  gap-2 justify-center bg-slate-900 px-5 py-2.5 text-center text-base font-robotocon font-medium uppercase text-white hover:bg-gray-700 transition-all focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    <PiShoppingCartSimpleBold size={20} />
                    Add to cart
                </a>
            </div>
        </div>
    );
}
