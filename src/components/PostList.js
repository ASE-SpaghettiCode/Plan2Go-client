import '../styles/PostList.css'
import {api, api_posts, handleError} from "../helpers/api";
import {useState,useEffect} from "react";
import React from "react";
import User from "../models/user";
import user from "./User";

export default function PostList(){
    const path = window.location.pathname;
    const userID = path.substring(path.lastIndexOf('/') + 1);
    const [Posts,setPosts]=useState([]);

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await api_posts.get('/users/'+userID+'/posts');
                console.log(response.data);
                setPosts(response.data);
            }catch (error) {
                console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData();
    },[]);


    const handleClick = async(post) => {
        const userId = localStorage.getItem("id");
        const postId = post.postId;
        try {
            const requestBody = JSON.stringify({userId,postId});
            console.log(requestBody)
            const response = await api_posts.delete('/users/' + userId + '/posts/' + postId);
            window.location.href = `/users/:id`;

        } catch (error) {
            alert(`Something went wrong during deleting the post: \n${handleError(error)}`);
        }
    }


    const postItems = Posts.map((post)=>
        <div className="postContainer">
            <div className="text">
                {post.content}
            </div>
            <div className="delete">
                <span className="post-delete" onClick={() => handleClick(post)}>delete</span>
            </div>
        </div>
    );


    return(
        <div className="postbody">
            {postItems}
        </div>
    )
}