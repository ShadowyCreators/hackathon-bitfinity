import { ethers } from "ethers";
import { useMemo } from "react";
import ERC1155ABI from "../abis/ERC1155.json";
import MarketplaceABI from "../abis/Marketplace.json";

const useMarketplaceContract = () => {

    const contract = useMemo(() => {
        const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_FALLBACK_RPC_URL);
        console.log(provider)
        return new ethers.Contract(
            process.env.REACT_APP_MARKETPLACE_ADDRESS || "",
            MarketplaceABI,
            provider
        )
    }, []);

    return contract;

}

const getMarketplaceContractPayable = () => {

    const ethereum = (window as any).ethereum;
    console.log('ethereum',ethereum)
    const provider = new ethers.providers.Web3Provider(ethereum);

    return new ethers.Contract(
        process.env.REACT_APP_MARKETPLACE_ADDRESS || "",
        MarketplaceABI,
        provider.getSigner()
    );

}

const useTokenContract = () => {

    const contract = useMemo(() => {
        const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_FALLBACK_RPC_URL);

        return new ethers.Contract(
            process.env.REACT_APP_TOKEN_ADDRESS || "",
            ERC1155ABI,
            provider
        );

    }, []);

    return contract;
}

const getTokenContractPayable = () => {

    const ethereum = (window as any).ethereum;
    const provider = new ethers.providers.Web3Provider(ethereum);

    return new ethers.Contract(
        process.env.REACT_APP_TOKEN_ADDRESS || "",
        ERC1155ABI,
        provider.getSigner()
    );

}

export { getMarketplaceContractPayable, getTokenContractPayable, useMarketplaceContract, useTokenContract };
