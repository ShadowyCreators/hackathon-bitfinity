import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { walletState } from "../atoms/globalStates";
import { Modal } from "../components/Modal";
import { approve, buy, isApproved } from "../functions/salesFunctions";
import { useCollection, useCollections } from "../hooks/useCollections"
import { useMarketplaceContract, useTokenContract } from "../hooks/useContracts";
import { createSale } from "../functions/salesFunctions";
import { Card } from "../components/Card"
import { BigNumber } from "ethers";

const CollectionPage = () => {

    const props: any = useParams();

    const [approved, setIsApproved] = useState(false);
    const wallet = useRecoilValue(walletState);
    const [buyParams, setBuyParams] = useState({
        collectionAddress: props.id || "",
        nftID: 0,
        qty: 0,
        price: 0
    });

    const mp = useMarketplaceContract();
    const tokenContract = useTokenContract();

    useEffect(() => {
        if (!wallet) return;
        const perform = async () => {
            const _approved = await isApproved(wallet, tokenContract);
            setIsApproved(_approved);
        }

        perform();

    }, [wallet])

    useCollections(mp);

    const collection = useCollection(mp, props.id);

    return (
        <>

            <div className="text-2xl font-bold text-center mt-10" id="collections">Items in this collection</div>

            <div className="text-center mt-5">
                {
                    !approved ?
                        <Modal
                            title="Approve for listing"
                            content="Click confirm to approve the collection"
                            callBack={async () => await approve(wallet)
                                .then(
                                    () => {
                                        setIsApproved(true)
                                    }
                                )
                            } /> :
                        <Modal title="List an NFT"
                            content={
                                <>
                                    <div>NFT ID<br />
                                        <input className="border border-gray-400" onChange={(e) => setBuyParams(
                                            (actual) => {
                                                return { ...actual, nftID: (e.target as any).value }
                                            })
                                        } />
                                    </div>
                                    <div>
                                        QTY<br />
                                        <input className="border border-gray-400" onChange={(e) => setBuyParams(
                                            (actual) => {
                                                return { ...actual, qty: (e.target as any).value }
                                            })
                                        } />
                                    </div>
                                    <div>
                                        Price<br />
                                        <input className="border border-gray-400" onChange={(e) => setBuyParams(
                                            (actual) => {
                                                return { ...actual, price: (e.target as any).value }
                                            })
                                        } />
                                    </div>
                                </>
                            }
                            callBack={
                                async () => {
                                    await createSale(buyParams)
                                }
                            } />

                }
            </div>
            <div className="mt-10 grid grid-cols-3 gap-x-10 gap-y-10 px-10">
                {collection && collection.length ? collection.map((item, index) => {
                    return <Card
                        key={index}
                        name={item.id}
                        content={<>
                            <b>NFT {parseInt(item.nftID._hex)}</b><br /><br />
                            Qty: {parseInt(item.qty._hex)}<br />
                            Price: {(item.price._hex)} MATIC<br />
                        </>}
                        footer={
                            <div 
                            onClick={async() => await buy({collectionAddress: (props.id as string), saleID: index})}
                            className="p-2 text-center bg-[blue] rounded-lg">
                                Buy
                            </div>
                        }
                    />
                }) : "Nessun nft in vendita per questa collezione"
                }
            </div>

            <div className="mb-32" />
        </>
    )

}

export { CollectionPage }
