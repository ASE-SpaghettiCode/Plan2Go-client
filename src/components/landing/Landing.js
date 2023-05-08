import React from 'react';
import '../../styles/Landing.css';
import LandingLayout from "./LandingLayout";
import { useNavigate } from 'react-router-dom';


const Landing = () => {
    const navigate = useNavigate();
    function handleLoginClick() {
        navigate('/login');
    }
    function handleRegisterClick() {
        navigate('/register');
    }
    return (
        <LandingLayout>
            <p className={"title"}>Tell us about your last adventure</p>
            <p className={"title"}>and start your next today</p>
            <div className={"buttonContainer"}>
                <button className={"loginButtonLanding"} onClick={handleLoginClick}>Log In</button>
                <button className={"registerButtonLanding"} onClick={handleRegisterClick}>Register</button>
            </div>
        </LandingLayout>
    );
}

export default Landing;