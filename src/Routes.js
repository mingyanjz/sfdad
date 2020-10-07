import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Home from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import History from "./components/History";
import Order from "./components/OrderComponents/Order";
export default function Routes(props) {
    let history = useHistory();
    let location = useLocation();

   
    let updatePage = (url) => {
        history.replace(url);
    };
    return (
        <Switch>
            <Route exact path="/">
                <Home 
                    user={props.user}
                    logout={props.logout}
                    onClickUser={props.onClickUser}
                />
            </Route>
            <Route exact path="/login">
                <LoginPage 
                    updatePage ={updatePage}
                    updateLogin={props.updateLogin}
                    updateUser={props.updateUser}
                />
            </Route>
            <Route exact path="/register">
                <RegisterPage 
                    updatePage ={updatePage}
                />
            </Route>
            <Route exact path="/history">
                <History 
                    updatePage ={updatePage}
                    user={props.user}
                    userHistory={props.userHistory}
                />
            </Route>
        </Switch>
    );
}