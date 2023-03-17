import '../styles/LandingLayout.css'
import logo from "../images/Logo.png";
import React from "react";
import {useNavigate} from "react-router-dom";
export default function LandingLayout({children}) {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/landing');
    }
    return (
        <div>
            <div className={"backgroundImage"}>
                <div className={"backgroundColor"}></div>
                <img src={logo} className={"logo"} onClick={handleClick}/>
                {children}
            </div>
        </div>
    );
}