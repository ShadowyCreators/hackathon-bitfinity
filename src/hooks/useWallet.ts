import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { walletState } from "../atoms/globalStates";

const ethereum = (window as any).ethereum;
console.log(ethereum)

const useWallet = () => {

    const setWallet = useSetRecoilState<any>(walletState);

    ethereum.on('accountsChanged', function (accounts) {
        if (!accounts.length) {
            setWallet(undefined);
        }
        else {
            setWallet(accounts[0]);
        }
    });

    useEffect(() => {

        const ab = new AbortController();

        async function process() {

            await ethereum.request({ method: 'eth_accounts' })
                .then(async (accounts: Array<any>) => {
                    if (accounts.length) {
                        setWallet(accounts[0]);
                    }
                })
                .catch(() => {
                    console.log("Failed to get accounts");
                });

        }

        process();

        return () => ab.abort();

    }, []);

}

export { useWallet };

