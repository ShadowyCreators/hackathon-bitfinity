import React from "react";
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { walletState } from '../atoms/globalStates';
import { Header } from "../components/Header";
import { CollectionPage } from "../pages/CollectionPage";
import { HomePage } from "../pages/HomePage";

const Routes = () => {
    const wallet = useRecoilValue<string>(walletState);

    return (
        <Router>
            <Header wallet={wallet} />
            <Switch>
                <Route path="/home">
                    <Redirect to="/" />
                </Route>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/collection/:id">
                    <CollectionPage />
                </Route>
            </Switch>
        </Router>
    )

}

export { Routes };

