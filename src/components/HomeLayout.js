import logo from "../images/Logo.png";
import React from "react";
import NaviBar from "./NaviBar";

import {Layout} from 'antd';

const { Header, Content, Footer } = Layout;



const HomeLayout: React.FC = () => {
    const goHome = () => {
        window.location.href = `/home`;
    }

    return (
        <Layout className="layout">
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'white', width: '100%' }}>
                <img src={logo} className={"naviLogo"} onClick={goHome}/>
                <NaviBar style={{ marginLeft: 'auto' }} />
            </Header>
        </Layout>
    );
};

export default HomeLayout;