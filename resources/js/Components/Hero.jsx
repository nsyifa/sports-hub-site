import React from "react";

const Hero = () => {
    return (
        <div className="w-full bg-white h-[42em] relative overflow-hidden z-[-10]">
            <div className="w-full h-full fixed z-[-9]">
                <img
                    src="/assets/dotsmiddle.png"
                    className="absolute -top-3 scale-150 sm:scale-100 lg:top-72 w-full h-[20%] lg:h-[80%]"
                />
                <img
                    src="/assets/dotsmiddle.png"
                    className="absolute -top-3 scale-150 sm:scale-100 lg:top-72  w-full h-[20%] lg:h-[80%]"
                />
                <img
                    src="/assets/dotsmiddle.png"
                    className="absolute -top-3 scale-150 sm:scale-100 lg:top-72  w-full h-[20%] lg:h-[80%]"
                />
                <img
                    src="/assets/dotsmiddle.png"
                    className="absolute bottom-24 scale-150 sm:scale-100 lg:bottom-96  w-full h-[20%] lg:h-[80%]"
                />
                <img
                    src="/assets/dotsmiddle.png"
                    className="absolute bottom-24 scale-150 sm:scale-100 lg:bottom-96  w-full h-[20%] lg:h-[80%]"
                />
                <img
                    src="/assets/dotsmiddle.png"
                    className="absolute bottom-24 scale-150 sm:scale-100 lg:bottom-96  w-full h-[20%] lg:h-[80%]"
                />
            </div>

            <img
                src="/assets/lines.png"
                className="right-0 mr-16 w-[40em] mt-5 opacity-60 absolute"
            />
            <img
                src="/assets/womanweight.png"
                className="w-[25em] -right-32 sm:right-0 mr-44 absolute"
            />
            <div className="absolute top-36 left-20 bg-white bg-opacity-30 lg:bg-transparent">
                <h1 className="relative text-black font-extrabold tracking-wide font-robotocon text-5xl sm:text-7xl">
                    YOUR CENTER
                </h1>
                <h1 className="relative text-black font-extrabold tracking-wide font-robotocon text-5xl sm:text-7xl">
                    FOR SPORTS
                </h1>
                <p className="text-2xl mt-3 pb-2 font-robotocon border-b-2 border-themeblue">
                    Modern gear, limitless performance.
                </p>
            </div>

            <div className="absolute w-max bg-black h-max bottom-56 sm:top-96 md:bottom-0 left-20 px-7 py-4 cursor-pointer hover:bg-themeblue transition-all hover:-translate-y-2 hover:shadow-lg">
                <p className="text-white font-robotocon">
                    EXPLORE OUR CATEGORIES
                </p>
            </div>
        </div>
    );
};

export default Hero;
