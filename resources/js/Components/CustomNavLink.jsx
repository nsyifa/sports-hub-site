import React from "react";
import { Link } from "@inertiajs/react";

const CustomNavLink = ({ href, text }) => {
    return (
        <Link
            href={href}
            className="font-semibold font-robotocon text-lg w-max dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-themeblue hover:border-b-4 hover:border-themeblue transition-all"
        >
            {text}
        </Link>
    );
};

export default CustomNavLink;
