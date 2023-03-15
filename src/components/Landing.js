import React from 'react';
import '../styles/Landing.css';
import logo from '../images/Logo.png';
import LandingLayout from "./LandingLayout";

const Landing = () => {
    return (
        <LandingLayout>
            <p className={"title"}>Tell us about your last adventure</p>
            <p className={"title"}>and start your next today</p>
            <div className={"buttonContainer"}>
                <button className={"loginButtonLanding"}>Log In</button>
                <button className={"registerButtonLanding"}>Register</button>
            </div>
        </LandingLayout>
    );
}

export default Landing;