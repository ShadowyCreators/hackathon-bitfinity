import React from "react";
import { Link } from "react-router-dom";
import { connectWallet } from "../utils/functions/wallet";

const Header = (props: any) => {
    return (
        <div className="header">

            <div className="header-logo letter-spacing-2 text-white">
                <a href="/">Marketplace</a>
            </div>

            <ul className="header-links grid grid-cols-4">
                <li><Link to="/">Home</Link></li>
                <li><a href="/#about">About</a></li>
                <li><a href="/#collections">Collections</a></li>
                <li><a href="/#contact">Contact</a></li>
            </ul>

            <div className="header-right">
                {
                    <span className="btn" onClick={() => !props.wallet ? connectWallet() : null}>
                        {!props.wallet ?
                            <>Connect Wallet</> :
                            <>
                                {`${props.wallet.slice(0, 6)}...${props.wallet.slice(props.wallet.length - 3, props.wallet.length)}`}
                            </>
                        }
                    </span>
                }
            </div>

        </div>
    )

}

export { Header };

