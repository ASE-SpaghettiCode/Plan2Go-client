import '../styles/Login.css'
import React, {useState} from "react";
import LandingLayout from "./LandingLayout";
import {Link} from "react-router-dom";
export const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login button pressed");
    }
    return (
        <LandingLayout>
            <form className={"loginForm"} onSubmit={handleLogin}>
                <div className={"formColor"}></div>
                <h2 className="titleLogin">Welcome Back!</h2>
                <label className="label" for={"username"}>Username</label>
                <input className="input" type="text" id="username" value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
                <label className="label" for={"password"}>Password</label>
                <input className="input" type={"password"} id={"password"} value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <div className={"buttonContainer"}>
                    <button className={"loginButtonLogin"} type={"submit"}>Log In</button>
                </div>
                <p className={"registerText"}>New to Plan2Go? <Link to={`/register`}>Register now</Link></p>
            </form>

        </LandingLayout>
    )
}

export default Login;

