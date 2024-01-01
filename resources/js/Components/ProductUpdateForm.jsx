// ProductUpdateForm.js

import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const ProductUpdateForm = ({ product, onClose }) => {
    const [formData, setFormData] = useState({
        name: product.name,
        price: product.price,
        status: product.status,
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataWithImage = new FormData();
            formDataWithImage.append("id", product.id);
            formDataWithImage.append("name", formData.name);
            formDataWithImage.append("price", formData.price);
            formDataWithImage.append("status", formData.status);
            if (image != null) {
                formDataWithImage.append("image", image);
            }

            console.log(formDataWithImage);

            await Inertia.post(`/products/update`, formDataWithImage, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Close the form after successful submission
            onClose();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="popup-container fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-[30%] h-max bg-gray-100 border-black border-2 rounded-lg p-6">
                <div className="flex flex-col gap-4">
                    <h2 className="font-bold">Update Product</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Add your form fields here */}
                        <div className="flex flex-col gap-1 mb-3">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="rounded-md"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label htmlFor="price">Price</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                className="rounded-md"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label>Status</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id="status-active"
                                    name="status"
                                    value="active"
                                    checked={formData.status === "active"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="status-active">Active</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id="status-inactive"
                                    name="status"
                                    value="inactive"
                                    checked={formData.status === "inactive"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="status-inactive">
                                    Inactive
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label htmlFor="image">Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <PrimaryButton type="submit">Update</PrimaryButton>
                    </form>
                    <SecondaryButton
                        onClick={onClose}
                        className="w-[30%] bg-gray-300 text-black self-center flex justify-center items-center"
                    >
                        Cancel
                    </SecondaryButton>
                </div>
            </div>
            <div
                className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
                onClick={onClose}
            ></div>
        </div>
    );
};

export default ProductUpdateForm;
