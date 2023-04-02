import { Tabs,} from 'antd';
import ProfileEdition from "./ProfileEdition";
import {Header} from "antd/es/layout/layout";
import logo from "../images/Logo.png";
import NaviBar from "./NaviBar";
import Login from "./Login";
import PrivacyEdition from "./PrivacyEdition";

const {TabPane} = Tabs;

const AccountEdition = () => {
    const goHome = () => {
        window.location.href = `/home`;
    }

    return (
      <div>
          <Header style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              backgroundColor: 'white',
              width: '100%'
          }}>
              <img src={logo} className={"naviLogo"} onClick={goHome}/>
              <NaviBar style={{marginLeft: 'auto'}}/>
          </Header>
          <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Person Info" key="1">
                  <ProfileEdition/>
              </TabPane>
              <TabPane tab="Privacy" key="2">
                  <PrivacyEdition/>
              </TabPane>
          </Tabs>
      </div>
    );
}
export default AccountEdition;