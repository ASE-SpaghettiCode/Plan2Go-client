import '../../styles/PostList.css'
import {api, api_posts, handleError} from "../../helpers/api";
import React, {useState,useEffect} from "react";
import PostCommentForm from "../post/PostCommentForm";
import PostCommentList from "../post/PostCommentList";
import SharingThumbnail from "../travel-note/SharingThumbnail";
import {Button, Badge} from "antd";
import {LikeFilled, LikeOutlined} from "@ant-design/icons";

export default function PostList(){
    const path = window.location.pathname;
    const userID = path.substring(path.lastIndexOf('/') + 1);
    const myUserId=localStorage.getItem('id');
    const [Posts,setPosts]=useState([]);
    const [username,setUsername]=useState();
    const [userImage,setUserImage]=useState();
    const [currentPage,setCurrentPage]=useState(1);
    const itemsNumber=5;
    const lastIndex=currentPage*itemsNumber;
    const displayPosts=Posts.slice(0,lastIndex);


    async function fetchData(){
        try{
            const response = await api_posts.get('/users/'+userID+'/posts');
            const response2 = await api.get('/users/'+userID);
            setUsername(response2.data.username);
            setUserImage(response2.data.imageLink);
            setPosts(response.data);
        }catch (error) {
            console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while fetching the users! See the console for details.");
        }
    }
    useEffect(()=>{
        fetchData().then().catch((err) => console.log(err))
    },[]);



    const handleClick = async(post) => {
        const userId = localStorage.getItem("id");
        const postId = post.postId;
        try {
            await api_posts.delete('/users/' + userId + '/posts/' + postId);
            fetchData().then().catch((err) => console.log(err))
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
        const [buttonStates, setButtonstates]=useState(false);
        const [likedNum,setLikedNum]=useState();

        function isLiked(post) {
            const likeList = post.likedUsers;
            return likeList.indexOf(myUserId) !== -1;
        }

        useEffect(()=>{
            setButtonstates(isLiked(post));
            setLikedNum(post.likedUsers.length);
        },[post]);

        const handleClickReply=()=>{
            setShowCommentInput(!showCommentInput);
        }

        const handleClickLike=(post)=>{
            if(buttonStates===false){
                api_posts.post(`/users/` + myUserId + `/likes/posts/` + post.postId)
                    .catch((err) => console.log("like error: ", err))
                setButtonstates(true);
                setLikedNum(likedNum+1);
            }else{
                api_posts.delete(`/users/` + myUserId + `/likes/posts/` + post.postId)
                    .catch((err) => console.log("like error: ", err))
                setButtonstates(false);
                setLikedNum(likedNum-1);
            }
        }

        return(
            <div className="postContainer">
                <div>
                    <div className="creationDate">
                        <img src={userImage} className="comment-avatar" alt={"comment-avatar"}/>
                        <div className="postdata">
                            <h4>{username}</h4>
                            <div className="posttime">{dateTransfer(post.createdTime)}</div>
                        </div>
                    </div>
                    <div className="postTextContainer">
                        <div className="text">
                            {post.content}
                        </div>
                        { post.sharedNoteId &&
                            <SharingThumbnail sharedNoteId={post.sharedNoteId}
                                              noteCoverImage={post.sharedNoteCoverImage}
                                              noteTitle={post.sharedNoteTitle}
                                              usage="profile"
                            />
                        }

                        <div className="postButton">
                            <div>
                                <Badge count={likedNum} color={"pink"} offset={[5,15]}>
                                <Button icon={buttonStates===false?<LikeOutlined/>:<LikeFilled style={{color: 'hotpink'}}/>} onClick={()=>handleClickLike(post)}/>
                                </Badge>
                            </div>
                            <div className="delete">
                            <span className="post-reply-button" onClick={handleClickReply}>Reply</span>
                            {myUserId===userID &&
                                <span className="post-delete" onClick={() => handleClick(post)}>Delete</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {showCommentInput === true &&
                    <div>
                        <PostCommentForm postId={post.postId}/>
                    </div>
                }
                <div>
                    <PostCommentList postId={post.postId}/>
                </div>
            </div>

        )
    }

    const displayPostsItems=displayPosts.map((post)=>{
        return(
            <ShowPostList post={post} key={post.postId}/>
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