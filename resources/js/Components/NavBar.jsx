import React, { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import { FaSearch } from "react-icons/fa";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import NavLogo from "@/Components/NavLogo";
import CustomNavLink from "@/Components/CustomNavLink";

const NavBar = ({ auth }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="py-3 px-4 sm:px-10 text-end relative z-10 bg-black w-full flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-row items-center w-full justify-between">
                <NavLogo />
                <button
                    onClick={toggleMenu}
                    className="lg:hidden text-white focus:outline-none"
                >
                    {/* Hamburger icon for mobile */}
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>

            <div
                className={`${
                    menuOpen ? "flex flex-col gap-9" : "hidden"
                } lg:flex lg:flex-row lg:items-center lg:gap-16 xl:gap-64 w-full lg:w-auto`}
            >
                <div className="flex flex-col items-start lg:flex-row mt-4 lg:mt-0 lg:items-center gap-10 text-white">
                    {auth.user ? (
                        <div className="lg:hidden flex self-end items-center relative z-50">
                            <div className=" relative z-50">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex w-max items-center px-3 py-2 text-sm leading-4 font-semibold rounded-md text-white hover:text-lightblue focus:outline-none transition-all ease-in-out duration-150"
                                            >
                                                {auth.user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            className="z-50 rounded-md"
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    ) : (
                        <div className="lg:hidden text-white flex flex-row items-center gap-5 mt-2">
                            {/* Render links for small screens */}
                            <CustomNavLink href={route("login")} text="Login" />
                            <CustomNavLink
                                href={route("register")}
                                text="Register"
                            />
                        </div>
                    )}
                    <CustomNavLink href="#" text="HOME" />
                    <CustomNavLink href="#" text="CATALOGS" />
                    <CustomNavLink href="#" text="BLOG" />
                    <CustomNavLink href="#" text="COLLECTIONS" />
                    <CustomNavLink href="#" text="CONTACT US" />
                </div>
                <div className="flex flex-row items-center gap-5 text-white mb-4 lg:mb-0">
                    <div className="cursor-pointer focus:outline focus:outline-2 focus:rounded-sm focus:outline-themeblue hover:border-b-4 hover:border-themeblue transition-all">
                        <PiShoppingCartSimpleBold size={24} />
                    </div>
                    <div className="cursor-pointer focus:outline focus:outline-2 focus:rounded-sm focus:outline-themeblue hover:border-b-4 hover:border-themeblue transition-all">
                        <FaSearch size={18} />
                    </div>
                </div>
            </div>

            {auth.user ? (
                <div className="hidden lg:flex lg:items-center relative lg:ms-6 z-50">
                    <div className="ms-3 relative z-50">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex w-max items-center px-3 py-2 text-sm leading-4 font-semibold rounded-md text-white hover:text-lightblue focus:outline-none transition-all ease-in-out duration-150"
                                    >
                                        {auth.user.name}

                                        <svg
                                            className="ms-2 -me-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link
                                    className="z-50 rounded-md"
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            ) : (
                <div className="text-white lg:flex lg:flex-row items-center ms-10 gap-5 hidden">
                    {/* Render links for small screens */}
                    <CustomNavLink href={route("login")} text="Login" />
                    <CustomNavLink href={route("register")} text="Register" />
                </div>
            )}
        </div>
    );
};

export default NavBar;
