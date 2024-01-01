import { Link, Head } from "@inertiajs/react";
import { useState } from "react";
import ProductCard from "@/Components/ProductCard";
import PrimaryButton from "@/Components/PrimaryButton";
import ScrollToTopButton from "@/Components/ScrollToTopButton";
import Hero from "@/Components/Hero";
import NavBar from "@/Components/NavBar";
import StyleImages from "@/Components/StyleImages";
import Footer from "@/Components/Footer";

export default function Home({ auth, laravelVersion, phpVersion, products }) {
    const activeProducts = products.original.filter(
        (product) => product.status === "active"
    );

    const [displayedProducts, setDisplayedProducts] = useState(8);

    const loadMoreProducts = () => {
        setDisplayedProducts(displayedProducts + 8); // Increase the number of products to display
    };

    return (
        <>
            <Head title="Home" />
            <div className="relative z-0 sm:flex sm:flex-col sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white ">
                <NavBar auth={auth} />
                <Hero />
                <div className="w-full bg-black flex flex-row justify-center ">
                    <p className="text-white font-robotocon text-base sm:text-xl py-8 px-3 text-center">
                        SPORTSHUB PROVIDES A 50% DISCOUNT FOR YOUR FIRST
                        PURCHASE
                    </p>
                </div>
                <div className="w-full flex flex-col bg-gray-100 pb-8 relative overflow-hidden">
                    <img
                        src="/assets/dotsmiddle.png"
                        className="w-full absolute top-24"
                    />
                    <img
                        src="/assets/dotsmiddle.png"
                        className="w-full absolute top-24"
                    />
                    <img
                        src="/assets/dotsmiddle.png"
                        className="w-full absolute top-24"
                    />
                    <img
                        src="/assets/dotsmiddle.png"
                        className="w-full absolute top-24"
                    />
                    <img
                        src="/assets/dotsright.png"
                        className="w-96 absolute -top-16 transform scale-x-[-1]"
                    />
                    <img
                        src="/assets/dotsright.png"
                        className="w-96 absolute -top-16 right-0"
                    />
                    <img
                        src="/assets/coins.png"
                        className="w-[45rem] absolute -top-80 -right-80"
                    />
                    <h2 className="font-semibold font-robotocon relative mx-auto mt-16 text-2xl sm:text-4xl text-center">
                        SELECT YOUR STYLE NOW
                    </h2>
                    <div className="mx-auto bg-themeblue sm:w-64 w-32 h-2 sm:h-4 mt-3 relative" />
                    <div className="w-full flex flex-row flex-wrap justify-center px-8 sm:px-18 md:px-36 gap-2 sm:gap-7 md:gap-14 mt-6 relative">
                        <StyleImages
                            src="/assets/mensapparel.jpg"
                            text="MEN'S APPAREL"
                        />
                        <StyleImages
                            src="/assets/womensapparel3.jpg"
                            text="WOMEN'S APPAREL"
                        />
                        <StyleImages
                            src="/assets/sportsequipment.jpg"
                            text="SPORTS EQUIPMENT"
                        />
                        <StyleImages
                            src="/assets/shoesandaccessories.jpg"
                            text="SHOES AND ACCESSORIES"
                        />
                    </div>
                    <div className="bg-black w-full h-[43rem] mt-20 relative flex flex-col lg:flex-row justify-between items-center">
                        <img
                            src="/assets/dotsmiddle.png"
                            className="absolute"
                        />
                        <img
                            src="/assets/dotsmiddle.png"
                            className="absolute"
                        />
                        <div className="left-32 md:left-56 w-32 h-64 sm:h-80 bg-themeblue absolute"></div>
                        <img
                            src="/assets/shoes.png"
                            className="relative h-44 mt-8 lg:mt-0 md:h-56 lg:h-72 sm:ml-16 md:ml-32 xl:ml-56 lg:mr-20"
                        />
                        <div className="flex flex-col relative lg:mr-80">
                            <h1 className="text-white text-5xl md:text-6xl font-robotocon font-bold tracking-wide">
                                ESSENTIAL
                            </h1>
                            <h1 className="text-white text-5xl md:text-6xl font-robotocon font-bold tracking-wide  mt-3">
                                ITEMS FOR
                            </h1>
                            <div className="bg-themeblue w-max px-5 py-2 font-semibold font-robotocon text-5xl md:text-6xl mt-8">
                                $99
                            </div>
                            <p className="text-white text-lg font-robotocon mt-8">
                                Get the best offers for your daily essentials.
                                <br />
                                Train in comfort and quality.
                            </p>
                            <button className="border-2 px-6 py-2 w-max mt-6 border-themeblue text-white font-robotocon text-lg hover:bg-themeblue hover:text-black transition-all duration-200 ease-in-out mb-8 lg:mb-0">
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                    <div className="relative w-full overflow-hidden">
                        <img
                            src="/assets/dotsright.png"
                            className="w-96 absolute -top-16 transform scale-x-[-1]"
                        />
                        <img
                            src="/assets/dotsright.png"
                            className="w-96 absolute -top-16 right-0"
                        />
                        <img
                            src="/assets/coins.png"
                            className="w-[45rem] absolute -top-80 -left-80 transform rotate-180"
                        />
                        <h2 className="font-semibold font-robotocon relative mx-auto mt-16 text-2xl sm:text-4xl text-center">
                            BROWSE OUR PRODUCTS
                        </h2>
                        <div className="mx-auto bg-themeblue sm:w-64 w-32 h-2 sm:h-4 mt-3 relative" />
                        <div className="flex flex-row w-full px-20 pt-10 flex-wrap">
                            {activeProducts
                                .slice(0, displayedProducts)
                                .map((product) => (
                                    <ProductCard
                                        product={product}
                                        key={product.id}
                                    />
                                ))}
                        </div>
                        {displayedProducts < activeProducts.length && (
                            <div className="text-center mt-4">
                                <PrimaryButton
                                    onClick={loadMoreProducts}
                                    className="text-white px-6 !text-base font-robotocon py-2 rounded-none"
                                >
                                    Load More Products
                                </PrimaryButton>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
                <ScrollToTopButton />
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
