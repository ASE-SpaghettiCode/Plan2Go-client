import { Tabs,} from 'antd';
import ProfileEdition from "./ProfileEdition";
import PrivacyEdition from "./PrivacyEdition";
import HeaderBar from "../navigation-tools/HeaderBar";


const AccountEdition = () => {
    const items = [
        {
            key: "1",
            label: "Person Info",
            children: <ProfileEdition/>
        },
        {
            key: "2",
            label: "Privacy",
            children: <PrivacyEdition/>
        },
    ]

    return (
      <div>
          <HeaderBar/>
          <Tabs defaultActiveKey="1" items={items} centered />
      </div>
    );
}
export default AccountEdition;