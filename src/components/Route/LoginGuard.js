import React from "react";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

const LoginGuard=(props)=>{
    if(!localStorage.getItem("token")){
        return props.children;
    }
    return(
        <Navigate to="/landing"/>
    )
}
LoginGuard.propTypes = {
    children: PropTypes.node
}

export default LoginGuard;