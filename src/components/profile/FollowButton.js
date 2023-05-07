import {Button} from 'antd';
import {CheckCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";

const FollowButton = () => {
    const userId1 = localStorage.getItem("id");
    const path = window.location.pathname;
    const userId2 = path.substring(path.lastIndexOf('/') + 1);
    const [following, setFollowing] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await api.get(`/users/` + userId1 + `/follows/` + userId2);
                setFollowing(res.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the liked recipes: \n${handleError(error)}`);
            }
        }

        fetchData().then()
    }, []);

    const doFollow = async () => {
        try {
            const response = await api.post(`/users/` + userId1 + `/follows/users/` + userId2);
            setFollowing(response.data);
            console.log('do follow' + response.data)
        } catch (error) {
            alert(`Something went wrong during do like: \n${handleError(error)}`);
        }
    };

    const doUnfollow = async () => {
        try {
            const response = await api.delete(`users/` + userId1 + `/follows/users/` + userId2);
            setFollowing(!response.data);
            console.log('unfollow' + response.data)
        } catch (error) {
            alert(`Something went wrong during do like: \n${handleError(error)}`);
        }
    };

    let followButton;
    if (following === true) {
        followButton = (<Button icon={<CheckCircleOutlined/>} onClick={doUnfollow}>Followed</Button>)
    } else {
        followButton = (<Button icon={<PlusCircleOutlined/>} onClick={doFollow}>Follow</Button>)
    }

    return (
        <div style={{display: userId1 !== userId2 ? 'block' : 'none'}}>
            {followButton}
        </div>
    )
}

export default FollowButton;