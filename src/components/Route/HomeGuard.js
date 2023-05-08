import React from "react";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

const HomeGuard=(props)=>{
    if(!localStorage.getItem("token")){
        return props.children;
    }
    return(
        <Navigate to="/home"/>
    )
}
HomeGuard.propTypes = {
    children: PropTypes.node
}

export default HomeGuard;