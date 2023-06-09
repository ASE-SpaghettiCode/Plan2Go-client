import React, {useEffect, useState} from 'react';
import '../../styles/Profile.css';
import {useNavigate} from "react-router-dom";
import {api, handleError} from "../../helpers/api";
import FollowButton from "./FollowButton";
import {Button} from 'antd';

const myUserId = localStorage.getItem('id');

const User = () => {
    const navigate = useNavigate();
    const [user, setUsers] = useState({
        userId: "",
        username: "",
        imageLink: "",
        intro: "",
        followers: "",
        followings: ""
    });

    function handleEditClick() {
        navigate('/profile/editing/'+myUserId);
    }

    const path = window.location.pathname;
    const userID = path.substring(path.lastIndexOf('/') + 1);

    const UserImage = () => {
        const imageUrl = user.imageLink;
        return (
            <div>
                <img src={imageUrl} alt="Avatar" className="avatarimage"/>
            </div>
        )
    }

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users/' + userID);
                setUsers(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData().then().catch((err) => console.log(err))
    }, []);

    let followerNum = user.followers.length;
    let followingNum = user.followings.length;

    return (
        <div className="user">
            <div className="avatar">
                <UserImage/>
            </div>
            <h2><UserUsername user={user}/></h2>
            <FollowButton/>
            <Button type="text" href={`/follower/` + userID}>Follower: {followerNum}</Button>
            <Button type="text" href={`/following/` + userID}>Following: {followingNum}</Button>
            <div className="information">
                <h3>Introduction</h3>
                <UserInfo user={user}/>
            </div>
            <div style={{display: myUserId === userID ? 'block' : 'none'}}>
                <button className="userbutton" onClick={handleEditClick}>Edit Profile</button>
            </div>
        </div>
    )
}

const UserUsername = ({user}) => {
    return (
        <div>{user.username}</div>
    );
};

const UserInfo = ({user}) => {
    if(user.intro===null){
        return<div>Introduce yourself to the world.</div>
    }
    return (
        <div>{user.intro}</div>
    );
};


export default User;