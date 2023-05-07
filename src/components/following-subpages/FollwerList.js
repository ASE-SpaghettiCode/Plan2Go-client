import {Avatar, Button, List} from 'antd';
import {useEffect, useState} from 'react';
import '../../styles/FollowList.css'
import {api, handleError} from "../../helpers/api";
import {CloseOutlined} from "@ant-design/icons";
import Divider from "@mui/material/Divider";

const FollowerList = () => {
    const [following, setFollowing] = useState([]);
    const path = window.location.pathname;
    const userId = path.substring(path.lastIndexOf('/') + 1);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('/users/' + userId + '/followers');
                // const response = await api.get('/users/followTest');
                setFollowing(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData().then()
    }, []);

    return (
        <div className={"followBackgroundImage"}>
            <Divider style={{marginTop: 50, fontWeight: "bold", fontSize: "larger"}}>Followers</Divider>
            <div className="wrapper">
                <Button className="exitButton" icon={<CloseOutlined/>} href={'/users/'+userId}/>
                <List className="list"
                      itemLayout="vertical"
                      dataSource={following}
                      renderItem={(item, userId) => (
                          <List.Item>
                              <List.Item.Meta
                                  avatar={<Avatar src={item.imageLink}/>}
                                  title={<a href={`/users/${item.userId}`}>{item.username}</a>}
                                  description={item.intro}
                              />
                          </List.Item>
                      )}
                />
            </div>
        </div>

    )
};
export default FollowerList;