import React from 'react';
import '../styles/Profile.css';
import User from "./User";
import ProfileNotes from "./ProfileNotes";
import {Header} from "antd/es/layout/layout";
import logo from "../images/Logo.png";
import NaviBar from "./NaviBar";

export default function Profile() {

    const goHome = () => {
        window.location.href = `/home`;
    }

    return(
        <div className="main">
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'white', width: '100%' }}>
                <img src={logo} className={"naviLogo"} onClick={goHome}/>
                <NaviBar style={{ marginLeft: 'auto' }} />
            </Header>
            <div className="container">
                <div>
                    <User/>
                </div>
                <div>
                    <ProfileNotes/>
                </div>
            </div>
            <footer>
                © 2023 SpaghettiCode
            </footer>
        </div>
    )
}