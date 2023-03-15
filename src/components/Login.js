import '../styles/Login.css'
import PropTypes from "prop-types";
import React, {useState} from "react";
import {api, handleError} from '../helpers/api';
import User from "../models/user";
import {LoginButton} from "../ui/loginButton";
import background from "../images/background.jpg";

export default function Login() {
    return <h1 className={"loginH1"}>Login Page</h1>
}

