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
    const [displayPosts,setDisplayPosts]=useState([]);
    const [username,setUsername]=useState();

    async function fetchData(){
        try{
            const response = await api_posts.get('/users/'+userID+'/posts');
            const response2 = await api.get('/users/'+userID);
            console.log(response.data);
            setUsername(response2.data.username);
            setPosts(response.data);
        }catch (error) {
            console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while fetching the users! See the console for details.");
        }
    }
    useEffect(()=>{
        fetchData();
    },[]);


    const handleClick = async(post) => {
        const userId = localStorage.getItem("id");
        const postId = post.postId;
        try {
            const requestBody = JSON.stringify({userId,postId});
            console.log(requestBody)
            const response = await api_posts.delete('/users/' + userId + '/posts/' + postId);
            fetchData();


        } catch (error) {
            alert(`Something went wrong during deleting the post: \n${handleError(error)}`);
        }
    }
    const dateTransfer=(props)=>{
        const date=new Date(props);
        const createdDate=date.toLocaleString('en-GB',
            {month:'long',
                year:'numeric',
                day:'numeric',
                hour:'numeric',
                minute:'numeric',
                second:'numeric'}
        );
        return(
            createdDate
        )
    }

    useEffect(()=>{
        setDisplayPosts(Posts.slice(0,5));
    },[Posts])


    function handleScroll(event){
        const {scrollTop, clientHeight, scrollHeight} = event.target;
        if(scrollTop + clientHeight >= scrollHeight){
            const startIndex=displayPosts.length;
            const endIndex = Math.min(Posts.length,startIndex+5);
            setDisplayPosts((prevDisplayPosts)=>
            prevDisplayPosts.concat(Posts.slice(startIndex,endIndex)));
            console.log('handleScroll');
        }
    }

    const displayPostsItems=displayPosts.map((post)=>
        <div className="postContainer">
            <div>
                <div className="creationDate">
                    <h5>{username}</h5>&ensp; • &ensp;{dateTransfer(post.createdTime)}
                </div>
                <div className="postTextContainer">
                    <div className="text">
                        {post.content}
                    </div>
                    <div className="delete">
                        <span className="post-delete" onClick={() => handleClick(post)}>delete</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const postItems = displayPostsItems.map((post)=>
            <div className="postContainer">
                <div className="postTextContainer">
                    <div className="creationDate">
                        <h2>
                            {dateTransfer(post.createdTime)}
                        </h2>
                    </div>
                    <div className="text">
                        {post.content}
                    </div>
                </div>
                <div className="delete">
                    <span className="post-delete" onClick={() => handleClick(post)}>delete</span>
                </div>
            </div>
    );


    return(
        <div className="postbody" onScroll={handleScroll}>
            {displayPostsItems}
        </div>
    )
}