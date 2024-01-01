import React from "react";

const StyleImages = ({ src, text }) => {
    return (
        <div className="flex flex-col items-center mt-14 gap-5">
            <img src={src} className="w-[28rem]" />
            <button className=" w-full bg-black h-max px-7 py-3 cursor-pointer hover:bg-themeblue transition-all hover:-translate-y-1 hover:shadow-lg text-white font-robotocon">
                {text}
            </button>
        </div>
    );
};

export default StyleImages;
