import {Button, Space} from 'antd';
import {CheckCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {api, handleError} from "../helpers/api";

const FollowButton = () => {
    const userId = localStorage.getItem("id");
    const path = window.location.pathname;
    const user2Id = path.substring(path.lastIndexOf('/') + 1);
    const [following, setFollowing] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get(`/users/${userId}/following/${user2Id}`);
                setFollowing(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the liked recipes: \n${handleError(error)}`);
            }
        }

        fetchData();
    }, []);

    const doFollow = async () => {
        try {
            const response = await api.post(`users/{userId1}/follows/users/{userId2}`);
            setFollowing(response.data);
        } catch (error) {
            alert(`Something went wrong during do like: \n${handleError(error)}`);
        }
    };

    const doUnfollow = async () => {
        try {
            const response = await api.post(`users/{userId1}/follows/users/{userId2}`);
            setFollowing(!response.data);
        } catch (error) {
            alert(`Something went wrong during do like: \n${handleError(error)}`);
        }
    };

    let followButton;
    if (following) {
        followButton = (<Button icon={<CheckCircleOutlined/>} onClick={doUnfollow}>Followed</Button>)
    } else {
        followButton = (<Button type="primary" icon={<PlusCircleOutlined/>} onClick={doFollow}>Follow</Button>)
    }

    return (
        <div>
            {followButton}
        </div>
    )
}

export default FollowButton;