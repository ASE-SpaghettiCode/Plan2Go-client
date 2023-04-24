import {useEffect, useState} from "react";
import {api_posts, handleError} from "../helpers/api";

export default function PostCommentList(props){
    const postId=props.postId;
    console.log(postId);
    const [comments, setComments]=useState([]);

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api_posts.get('/posts/' + postId + '/comments');
                console.log(response.data);
                setComments(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData();
    }, []);

    const PostComments=comments.map((comment)=>{
        return(
            <div>
                <div className="creationDate">
                    <img src={comment.commentAuthorImage} className="comment-avatar"/>
                    <h5>{comment.commentAuthorName}</h5>&ensp; • &ensp;{comment.createdTime}
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