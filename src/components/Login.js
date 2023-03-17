import '../styles/Login.css'
import React, {useState} from "react";
import LandingLayout from "./LandingLayout";
import {Link} from "react-router-dom";
import {api, handleError} from "../helpers/api";
import User from "../models/user";
export const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handleLogin = async () => {
        try {
            const requestBody = JSON.stringify({username,password});
            const response = await api.post('/users/checking', requestBody);
            console.log(response);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem('token', user.token);
            localStorage.setItem('id',user.id);
            localStorage.setItem('username',user.username);

            // Login successfully worked --> navigate to the route /home in the HomeRouter
            window.location.href = `/home`;
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    };
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

