const contracts = require('../utils').getContracts;

const getSale = async(collectionAddress: string, id: number) => {
    return await contracts.marketplace.getSale(collectionAddress, id);
}

const getCollections = async() => {

    const collectionsLength = await contracts.marketplace.collectionsLength();

    const collections = [];

    for(let i = 0; i < collectionsLength; i++) {
        collections[i] = await contracts.marketplace.getCollectionById(i);
    }

    return collections;

}

export {
    getSale,
    getCollections
}