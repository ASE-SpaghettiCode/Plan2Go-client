import React, {useState} from "react";
import {Layout} from 'antd';
import '../styles/EditProfile.css'
// import {Link} from "@mui/material";
import { Link } from "react-router-dom";
import { Input } from 'antd';
const { TextArea } = Input;

const myUserId = localStorage.getItem('id');

const ProfileEdition: React.FC = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [intro, setIntro] = useState(null);

    return (
        <form className={"editProfileForm"} style={{ width: "400px", margin: "0 auto", height: "100vh" }}>
            <div className={"formColor"}/>
            <h2 className="titleEdit">Person info</h2>
            <label className="label" htmlFor={"username"}>Username</label>
            <input className="input" type="text" id="username" value={username}
                   onChange={(e) => setUsername(e.target.value)}/>
            <label className="label" htmlFor={"password"}>Password</label>
            <input className="input" type={"password"} id={"password"} value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            <label className="label" htmlFor={"intro"}>Introduction</label>
            <TextArea rows={3} className="inputIntro" type={"intro"} id={"intro"} value={intro}
                      onChange={(e) => setIntro(e.target.value)}/>
            {/*<input className="inputIntro" type={"intro"} id={"intro"} value={intro}*/}
            {/*       onChange={(e) => setIntro(e.target.value)}/>*/}
            <div className={"buttonContainer"}>
                <button className={"loginButtonLogin"} type={"submit"}>Summit</button>
            </div>
            <p className={"cancel"} style={{ textAlign: "center", cursor: "pointer" }}> <Link to={`/users/${myUserId}`}>cancel</Link></p>
            {/*<p className={"cancel"} style={{ textAlign: "center", cursor: "pointer" }}> <Link to={`/register`}>cancel</Link></p>*/}
        </form>
    )
};

export default ProfileEdition;