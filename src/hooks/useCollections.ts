import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { collectionsState } from "../atoms/globalStates";

const useCollections = (_marketplaceContract: any) => {

    const [collections, setCollections] = useRecoilState(collectionsState);

    useEffect(() => {

        const ab = new AbortController();

        async function process() {

            // collections already set
            if (collections.length) {
                return;
            }

            // get collections length from blockchain
            const collectionsLength = await _marketplaceContract.collectionsLength();

            const newCollections: any = {};

            for (let i = 0; i < collectionsLength; i++) {
                const address = await _marketplaceContract.getCollectionById(i);
                newCollections[address] = [];
            }

            setCollections(newCollections);

        }

        process();

        return () => ab.abort();

    }, []);

    return collections;

}

const useCollection = (_marketplaceContract: any, collectionAddress: any) => {

    const [collections, setCollections] = useRecoilState(collectionsState);

    useEffect(() => {

        const ab = new AbortController();

        async function process() {

            if (!Object.keys(collections).length || collections[collectionAddress]?.length) return;

            const salesLength = await _marketplaceContract.salesLength(collectionAddress);

            const newCollections: any = JSON.parse(JSON.stringify(collections));

            for (let i = 0; i < salesLength; i++) {
                newCollections[collectionAddress][i] = await _marketplaceContract.getSale(collectionAddress, i);
            }

            setCollections(newCollections);

        }

        process();

        return () => ab.abort();

    }, [collections, collectionAddress, _marketplaceContract, setCollections]);

    return collections[collectionAddress];

}

export { useCollections, useCollection }
