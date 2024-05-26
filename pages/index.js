import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";


export default function Home({ products }) {
    const router = useRouter()
    const [search, setSearch] = useState('');
    const [data, setData] = useState(null);
    // const [showButton1, setShowButton1] = useState(true); // State for Button 1
    // const [showButton2, setShowButton2] = useState(true); // State for Button 2

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        const { data } = await fetchDataFromApi('/api/Products');
        setData(data);
    }
    // const handleButtonClick1 = () => {
    //     setShowButton2(false); // Hide Button 2
    // }

    // const handleButtonClick2 = () => {
    //     setShowButton1(false); // Hide Button 1
    // }
    console.log(products);
    return <main >
        <HeroBanner />
        <Wrapper>
            <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
                <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">Cushioning For Your Miles</div>
                <div className="text-md md:text-xl">A lightweight Nike ZoomX midsole is combined with increased
                    stack heights to help provide cushioning during extended streches of running</div>
            </div>
            <div className='border border-gray-950 rounded-lg flex'>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder='Search Items'
                        className='outline-none px-2 py-3 rounded-lg w-full'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {/* <div className="border my-auto py-3 px-6 text-white bg-gray-900 cursor-pointer rounded-r">
                    {search === "anirudh" ? (<Link href="/cart">Search</Link>) : ("Search")}
                </div> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                {products?.data?.filter((product) => {
                    return search.toLowerCase() === '' ? product : product?.attributes?.name?.toLowerCase().includes(search)
                }).map((product) => (
                    <ProductCard key={product?.id} data={product} />
                ))}

                { /* <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard /> */ }

            </div>
            {/* <div className="text-center">
                <button className="border px-6 py-3 mb-4 rounded text-white bg-gray-950">hello</button>
            </div> */}
            {/*<div className="text-center">
                    {showButton1 && <button className="border px-6 py-3 mb-4 rounded text-white bg-gray-950" onClick={handleButtonClick1}>Button 1</button>}
                    {showButton2 && <button className="border px-6 py-3 mb-4 rounded text-white bg-gray-950" onClick={handleButtonClick2}>Button 2</button>}
        </div> */}
        </Wrapper>
    </main>;
}

export async function getStaticProps() {
    const products = await fetchDataFromApi("/api/products?populate=*");

    return {
        props: { products },
    };
}