import '../styles/PostList.css'
import {api, api_posts, handleError} from "../helpers/api";
import {useState,useEffect} from "react";
import React from "react";
import PostCommentForm from "./PostCommentForm";

export default function PostList(){
    const path = window.location.pathname;
    const userID = path.substring(path.lastIndexOf('/') + 1);
    const myUserId=localStorage.getItem('id');
    const [Posts,setPosts]=useState([]);
    const [username,setUsername]=useState();
    const [currentPage,setCurrentPage]=useState(1);
    const itemsNumber=5;
    const lastIndex=currentPage*itemsNumber;
    const displayPosts=Posts.slice(0,lastIndex);


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

    function ShowPostList({post}){
        const [showCommentInput, setShowCommentInput]=useState(false);
        const handleClickReply=()=>{
            setShowCommentInput(!showCommentInput);
            console.log(showCommentInput);
        }

        return(
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
                            <span className="post-reply-button" onClick={handleClickReply}>Reply</span>
                            {myUserId===userID &&
                                <span className="post-delete" onClick={() => handleClick(post)}>Delete</span>}
                        </div>
                    </div>
                </div>
                {showCommentInput === true &&
                    <div>
                        <PostCommentForm postId={post.postId}/>
                    </div>
                }
            </div>

        )
    }

    const displayPostsItems=displayPosts.map((post)=>{
        return(
            <ShowPostList post={post}/>
            )
        }
    );

    return(
        <div className="postbody">
            {displayPostsItems}
            {displayPosts.length!==Posts.length?
                <div className="load">
                <button className="loadButton" onClick={()=>setCurrentPage(currentPage+1)}>Load More</button>
                </div>:<div></div>
            }

        </div>
    )
}