import '../styles/Register.css'
import React, {useState} from "react";
import LandingLayout from "./LandingLayout";
import {Link} from "react-router-dom";

export const Register = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Register button pressed");
    }
    return (
        <LandingLayout>
            <form className={"registerForm"} onSubmit={handleRegister}>
                <div className={"formColor"}></div>
                <h2 className="titleRegister">Welcome to Plan2Go!</h2>
                <label className="label" for={"username"}>Username</label>
                <input className="input" type="text" id="username" value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
                <label className="label" for={"password"}>Password</label>
                <input className="input" type={"password"} id={"password"} value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <div className={"buttonContainer"}>
                    <button className={"registerButtonReg"} type={"submit"}>Register</button>
                </div>
                <p className={"registerText"}>Already have an account? <Link to={`/login`}>Log in here</Link></p>
            </form>

        </LandingLayout>
    )
}

export default Register;