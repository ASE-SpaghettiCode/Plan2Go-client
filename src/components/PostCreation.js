import "../styles/PostCreation.css"
import React, {useState} from "react";
import {api, handleError} from "../helpers/api";
import User from "../models/user";
import user from "./User";
import {api_posts} from "../helpers/api";
import Post from "../models/post";
import postBackground from "../images/post-backgroud.jpg"
import NaviBar from "./NaviBar";
import logo from "../images/Logo.png";
import {Header} from "antd/es/layout/layout";
export default function PostCreation() {
    const [content, setContent] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = new Post();
        const userId = localStorage.getItem('id',user.userId);
        if (userId != null) {
            newPost.authorId = userId;
        }
        newPost.content = content;
        try {
            const response = await api_posts.post('/posts', newPost);
            console.log(response);
            // Login successfully worked --> navigate to the route /home in the HomeRouter
            window.location.href = `/home`;
        } catch (error) {
            alert(`Something went wrong during the post creation: \n${handleError(error)}`);
        }
    }

    const handleCancel = async(e) => {
        e.preventDefault();
        window.location.href = `/home`;
    }

    const goHome = () => {
        window.location.href = `/home`;
    }

    return <div>
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
        <div className={"page"}>

            <h1 className={"postCreationTitle"}>💡Share Your Moment: </h1>
            <textarea type={"text"} name={"post-content"} placeholder={"Write down the moment you want to share with your friends"} className={"creationBox"} onChange={(e) => setContent(e.target.value)}></textarea>
            <button type={"submit"} className={"postSubmit"} onClick={(e) => handleSubmit(e)}>Submit</button>
            <button type={"submit"} className={"postCancel"} onClick={(e) => handleCancel(e)}>Cancel</button>
        </div>
    </div>
}