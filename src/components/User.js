import React, {useEffect, useState} from 'react';
import '../styles/Profile.css';
import {useNavigate} from "react-router-dom";
import {api, handleError} from "../helpers/api";

import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import cloudinary from 'cloudinary-core';
import {AdvancedImage} from "@cloudinary/react";
import {max} from "@cloudinary/url-gen/actions/roundCorners";
import FollowButton from "./FollowButton";

const myUserId = localStorage.getItem('id');


const User = ({match}) => {
    const navigate = useNavigate();
    const [user, setUsers] = useState({
        userId: "",
        username: "",
        imageLink: "",
        intro: "",
    });

    function handleEditClick() {
        navigate('/profile/editing');
    }

    const path = window.location.pathname;
    const userID = path.substring(path.lastIndexOf('/') + 1);

    /*const UserImage=()=>{
        const imageUrl=user.imageLink;
        if(imageUrl!=null){
            const rawimage=imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            const userImage = new CloudinaryImage(rawimage,{cloudName:"dgnzmridn"});
            userImage.resize(fill().height(200).width(200)).roundCorners(max())
            return(
                <div>
                    <AdvancedImage cldImg={userImage}/>
                </div>
            )
        }else{
            const fakeimageUrl="https://res.cloudinary.com/dgnzmridn/image/upload/v1653055086/n9miv50ifxgpwgshy09w.jpg"
            const rawimage=fakeimageUrl.substring(fakeimageUrl.lastIndexOf('/') + 1);
            const userImage = new CloudinaryImage(rawimage,{cloudName:"dgnzmridn"});
            userImage.resize(fill().height(200).width(200)).roundCorners(max())
            return(
                <div>
                    <AdvancedImage cldImg={userImage}/>
                </div>
            )
        }
    }*/

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
                console.log(response.data);
                setUsers(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);


    return (
        <div className="user">
            <div className="avatar">
                <UserImage/>
            </div>
            <h2><UserUsername user={user}/></h2>
            <FollowButton/>
            <p className="follow">Follower 20</p>
            <p className="follow">Following 35</p>
            <div className="information">
                <div>
                    <UserInfo user={user}/>
                </div>
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
    return (
        <div>{user.intro}</div>
    );
};


export default User;