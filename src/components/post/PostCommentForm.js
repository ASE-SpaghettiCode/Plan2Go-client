import '../../styles/PostComment.css';
import React, {useEffect, useState} from "react";
import {api, api_posts, handleError} from "../../helpers/api";

export default function PostCommentForm(props){
    const postId=props.postId;
    const [commentCompleted,setCommentCompleted]=useState(false);
    const userId=localStorage.getItem('id');
    const [comment,setComment]=useState("");
    const [user, setUsers] = useState({
        userId: "",
        username: "",
        imageLink: "",
        intro: "",
        followers: "",
        followings: ""
    });

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users/' + userId);
                setUsers(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData().then().catch((err) => console.log(err))
    }, []);

    const handleComment=async(e)=>{
        e.preventDefault();
        const requestBody={
            commentAuthorId:userId,
            commentAuthorName:user.username,
            commentAuthorImage:user.imageLink,
            targetPostId:postId,
            commentText:comment
        }
        try{
            await api_posts.post('/posts/'+postId+'/comments',requestBody);
        }
        catch (error) {
            alert(`Something went wrong during the post comment: \n${handleError(error)}`);
        }
        setCommentCompleted(true);
        const url=window.location.pathname;
        if(url.includes('following')){
            window.location.reload();
        }else if(url.includes('?tab=posts#')){
            const post_url=window.location.href.replace('?tab=posts#','?tab=posts');
            window.location.href=post_url;
        }
    }

    return(
        <div>
            {commentCompleted === false &&
            <div className="post-comment">
                <textarea className="post-comment" value={comment} onChange={(e)=>setComment(e.target.value)}/>
                <div className="post-submit-container">
                    <button className="post-comment-reply-button" onClick={handleComment}>Reply</button>
                </div>
            </div>}
        </div>
    )
}