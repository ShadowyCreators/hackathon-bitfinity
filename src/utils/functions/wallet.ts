const connectWallet = async (_ethereum: any = null) => {

    const ethereum = _ethereum || (window as any).ethereum;

    if (!ethereum) {
        alert("Web3 wallet provider not found, please install Metamask.");
        return;
    }
    console.log('chain',process.env.REACT_APP_CHAIN_ID)
    // if (await ethereum.request({ method: "eth_chainId" }) !== process.env.REACT_APP_CHAIN_ID) {
    //     console.log(await ethereum.request({ method: "eth_chainId" }))
    //     alert("Please connect to Mumbai network");
    //     return;
    // }
    
    try {
        const wallets = await ethereum.request({ method: "eth_requestAccounts" });
        console.log(wallets)
        return wallets[0];
    }
    catch (e) {
        return undefined;
    }
}

export { connectWallet };

