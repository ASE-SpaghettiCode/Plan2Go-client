import '../styles/LandingLayout.css'
import logo from "../images/Logo.png";
import React from "react";
export default function LandingLayout({children}) {
    return (
        <div>
            <div className={"backgroundImage"}>
                <div className={"backgroundColor"}></div>
                <img src={logo} className={"logo"}/>
                {children}
            </div>
        </div>
    );
}