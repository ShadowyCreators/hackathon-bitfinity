import { BigNumber } from "ethers";
import { getMarketplaceContractPayable, getTokenContractPayable } from "../hooks/useContracts";

const createSale = async (
    data: {
        collectionAddress: string,
        nftID: string | number,
        qty: string | number,
        price: string | number
    }
) => {

    const contract_ = getMarketplaceContractPayable();
    return await contract_.createSale(
        data.collectionAddress,
        data.nftID,
        data.qty,
        data.price
    );

}

const buy = async (
    data: {
        collectionAddress: string,
        saleID: string | number,
    }
) => {
    const contract_ = getMarketplaceContractPayable();
    const price = (await contract_.getSale(data.collectionAddress, data.saleID)).price;
    return await contract_.buy(data.collectionAddress, data.saleID, {value: price});
}

const approve = async (
    wallet: any
) => {
    const contract_ = getTokenContractPayable();
    return await contract_.setApprovalForAll(process.env.REACT_APP_MARKETPLACE_ADDRESS, true);
}

const isApproved = async (
    wallet: string,
    _nftContract: any
) => {
    const account = (window as any).ethereum;
    if (account) {
        return await _nftContract.isApprovedForAll(wallet, process.env.REACT_APP_MARKETPLACE_ADDRESS);
    }
    else return false;
}

export { createSale, buy, approve, isApproved }
