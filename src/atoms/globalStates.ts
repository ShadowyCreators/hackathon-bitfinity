import { atom } from "recoil";

const walletState = atom<any>({
    key: 'walletState',
    default: undefined
});

const collectionsState = atom<any>({
    key: 'collectionsState',
    default: {}
})

export { walletState, collectionsState }
