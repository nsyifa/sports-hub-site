import React from "react";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-8 w-full mt-20">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-evenly ms-20 md:items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-semibold">Sportshub</h3>
                        <p className="text-sm">
                            Modern sportswear for everyone.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2">
                            Quick Links
                        </h4>
                        <ul className="mb-4 md:mb-0">
                            <li className="mb-2">
                                <a href="#" className="hover:text-gray-300">
                                    Home
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-gray-300">
                                    Products
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-gray-300">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2">
                            Follow Us
                        </h4>
                        <div className="flex items-center">
                            {/* Add your social media icons or links here */}
                            {/* Example: */}
                            <a
                                href="#"
                                className="text-xl mr-4 hover:text-gray-300"
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-xl hover:text-gray-300">
                                <i className="fab fa-facebook"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
