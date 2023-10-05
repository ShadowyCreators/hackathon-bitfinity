import { ethers, getAbi } from './index';

const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_FALLBACK_RPC_URL );

const getContracts = {

    marketplace: new ethers.Contract(
        process.env.REACT_APP_MARKETPLACE_ADDRESS || "",
        getAbi('Marketplace'),
        provider
    ),

}

export default getContracts;