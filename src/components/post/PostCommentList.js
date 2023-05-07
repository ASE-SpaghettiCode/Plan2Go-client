import {useEffect, useState} from "react";
import {api_posts, handleError} from "../../helpers/api";
import React from "react";

export default function PostCommentList(props){
    const postId=props.postId;
    const [comments, setComments]=useState([]);
    const userId = localStorage.getItem("id");

    async function fetchData() {
        try {
            const response = await api_posts.get('/posts/' + postId + '/comments');
            setComments(response.data);
        } catch (error) {
            console.error(`Something went wrong while fetching the comments: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while fetching the comments! See the console for details.");
        }
    }
    useEffect(() => {
        fetchData().then()
        const interval = setInterval(fetchData, 1000);
        return ()=>clearInterval(interval);
    }, []);

    const handleClickDelete = async(comment)=>{
        const commentId = comment.commentId;
        try {
            await api_posts.delete('/users/' + userId + '/comments/' + commentId);
            fetchData().then()
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

    const PostComments=comments.map((comment)=>{
        const authorId = comment.commentAuthorId;
        return(
            <div key={comment.commentId}>
                <div className="comment-info">
                    <div className="creationDate">
                        <img src={comment.commentAuthorImage} className="comment-avatar" alt="comment-avatar"/>
                        <h5>{comment.commentAuthorName}</h5>&ensp; • &ensp;{dateTransfer(comment.createdTime)}
                    </div>
                    {authorId===userId &&
                        <span className="post-delete" onClick={() => handleClickDelete(comment)}>Delete</span>
                    }
                </div>
                <div className="comment-content">
                    {comment.commentText}
                </div>
            </div>
        )
    });

    return(
        <div className="post-comment-list">
            {PostComments}
        </div>
    )
}