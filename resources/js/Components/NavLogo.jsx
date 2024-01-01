import React from "react";

const NavLogo = ({ className = "" }) => {
    return (
        <div className="flex flex-row items-center gap-3">
            <img src="/assets/logo.png" className="w-16" />
            <div className="flex flex-col items-start font-robotocon tracking-wide">
                <p className={"text-white font-semibold text-lg " + className}>
                    SPORTS
                </p>
                <div className="flex flex-row gap-2">
                    <p
                        className={
                            "text-white font-semibold text-lg " + className
                        }
                    >
                        HUB
                    </p>
                    <div className="bg-themeblue w-5 h-1 mt-2"></div>
                </div>
            </div>
        </div>
    );
};

export default NavLogo;
