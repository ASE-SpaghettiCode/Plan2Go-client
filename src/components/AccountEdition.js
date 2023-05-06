import { Tabs,} from 'antd';
import ProfileEdition from "./ProfileEdition";
import PrivacyEdition from "./PrivacyEdition";
import HeaderBar from "./HeaderBar";

const {TabPane} = Tabs;

const AccountEdition = () => {
    return (
      <div>
          <HeaderBar/>
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