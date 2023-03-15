import React from 'react';
import '../styles/Landing.css';
import logo from '../images/Logo.png';

const Landing = () => {
    return (
        <div>
                <div className={"backgroundImage"}>
                    <div className={"backgroundColor"}></div>
                    <img src={logo} className={"logo"}/>
                    <hr className={"line"}/>
                    <p className={"title"}>Where will you go next?</p>
                    <p className={"subtitle"}>Find your next adventure, let's go!</p>
                    <button className={"button"}>👤 Log In</button>
                    <button className={"button"}>📝 Register</button>
                </div>
        </div>
    );
}

export default Landing;