import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/Card"
import { useCollections } from "../hooks/useCollections"
import { useMarketplaceContract } from "../hooks/useContracts";

const HomePage = () => {

    const marketplaceContract = useMarketplaceContract();

    useEffect(() => {
        console.log("a rendering");
    }, [])

    const collections = useCollections(marketplaceContract);

    return (
        <>
            <section className="my-10">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <h1 id="about" className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">ERC1155 NFT Marketplace</h1>
                    <p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                        Simple ERC1155 NFT Marketplace by Domenico for Blocki demo<br />
                        <span className="text-sm text-gray-500">Hero design by flowbite</span>
                    </p>
                </div>
            </section>

            <div className="text-2xl font-bold text-center" id="collections">NFT Collections</div>

            <div className="mt-10 grid grid-cols-3 gap-x-20 gap-y-10 px-10">
                {Object.keys(collections).length ? Object.keys(collections).map((collectionAddress: any, key: number) =>
                    <Card key={key} name={<div><b>NFT Collection</b><br/>{collectionAddress}</div>} footer={
                        <Link 
                        to={`/collection/${collectionAddress}`}
                        className="block text-center p-1 mx-5 bg-[blue] rounded-md"
                        >Go to collection</Link>
                    } />
                ) :
                    <div className="col-span-3 text-center">Nessuna collezione aggiunta</div>}
            </div>

            <div className="mb-32" />
        </>
    )

}

export { HomePage }
