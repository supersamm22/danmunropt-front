import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../helpers/loginHelp"

const UserRoute = ({ component: Component, ...rest }) => (
    //props means all the components passed down to this private route component
    <Route
        {...rest}
        render={props =>
            isLoggedIn().user.isAdmin ?
                (<Component{...props} />)
                :
                (<Redirect to={{ pathname: "/user", state: { from: props.location } }} />)
        } />
)

export default UserRoute;