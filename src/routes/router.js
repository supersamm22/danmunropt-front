import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../login/Login"
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage"
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
function router() {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <AdminRoute exacct path="/user" component={UserPage} />
            <UserRoute exact path="/admin" component={AdminPage} />
        </Switch>
    )
};
export default router;