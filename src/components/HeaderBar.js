import logo from "../images/Logo.png";
import NaviBar from "./NaviBar";
import React from "react";
import {Header} from "antd/es/layout/layout";

const HeaderBar = () =>{
    const goHome = () => {
        window.location.href = `/home`;
    }

    return (<Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'white', width: '100%' }}>
        <img src={logo} className={"naviLogo"} onClick={goHome}/>
        <NaviBar style={{ marginLeft: 'auto' }} />
    </Header>)
}

export default HeaderBar;