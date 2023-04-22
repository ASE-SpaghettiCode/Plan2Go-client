import logo from "../images/Logo.png";
import NaviBar from "./NaviBar";
import React from "react";
import {Header} from "antd/es/layout/layout";
import SearchBox from "./SearchBox";
import {Input} from "antd";

const { Search } = Input;

const HeaderBar = () => {
    const goHome = () => {
        window.location.href = `/home`;
    }

    return (<Header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        width: '100%'
    }}>
        <img src={logo} className={"naviLogo"} onClick={goHome}/>
        <SearchBox/>
        <NaviBar style={{marginLeft: 'auto'}}/>
    </Header>)
}

export default HeaderBar;