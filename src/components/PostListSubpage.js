import {Avatar, Button, Divider, List, Space} from 'antd';
import {useState, useEffect} from "react";
import React from "react";
import {api_posts, handleError} from "../helpers/api";
import logo from "../images/Logo.png";
import NaviBar from "./NaviBar";
import {Header} from "antd/es/layout/layout";
import '../styles/PostListSubpage.css'
import {LikeFilled, LikeOutlined} from "@ant-design/icons";
import PostCommentForm from "./PostCommentForm";

const PostSubpage = () => {
    const userID = localStorage.getItem('id');
    const [posts, setPosts] = useState([]);
    const [buttonStates, setButtonStates] = useState({});
    const [ReplyBoxStates, setReplyBoxStates] =useState({});
    const [initialReplyBoxStates, setInitialReplyBoxStates]=useState({});


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api_posts.get('/posts/following/' + userID);
                // console.log(response.data);
                setPosts(response.data);
                response.data.forEach((item) => {
                    buttonStates[item.post.postId] = {liked: isLiked(item.post)};
                    setButtonStates(buttonStates);
                    initialReplyBoxStates[item.post.postId]={shown:false};
                    setInitialReplyBoxStates(initialReplyBoxStates);
                });
            } catch (error) {
                console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, [isLiked, buttonStates,userID]);

    const InitialReplyBox=()=>{
        setReplyBoxStates(initialReplyBoxStates);
    }


    const goHome = () => {
        window.location.href = `/home`;
    }

    const dateTransfer = (props) => {
        const date = new Date(props);
        const createdDate = date.toLocaleString('en-GB',
            {
                month: 'long',
                year: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            }
        );
        return (
            createdDate
        )
    }

    function isLiked(post) {
        const likeList = post.likedUsers;
        // console.log(result);
        return likeList.indexOf(userID) !== -1;
    }

    function handleReplyButtonClick(postId){
        setReplyBoxStates(initialReplyBoxStates);
        ReplyBoxStates[postId].shown=!ReplyBoxStates[postId].shown;
        setReplyBoxStates(ReplyBoxStates);
        console.log(ReplyBoxStates);
    }

    function handleButtonClick(postId) {
        if (buttonStates[postId].liked) {
            api_posts.delete(`/users/` + userID + `/likes/posts/` + postId)
                .catch((err) => console.log("unlike error: ", err))
        } else {
            api_posts.post(`/users/` + userID + `/likes/posts/` + postId)
                .catch((err) => console.log("like error: ", err))
        }
        buttonStates[postId].liked = !buttonStates[postId].liked;
        setButtonStates(buttonStates);
        console.log(buttonStates);
    }


    return (
        <div>
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
            <Divider style={{fontWeight: "bold", fontSize: "larger"}}>Posts By Your Following</Divider>
            <List
                className="list"
                itemLayout="vertical"
                size="large"
                dataSource={posts}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.imagePath}/>}
                            title={<a href={'/users/' + item.post.authorId}>{item.authorName}</a>}
                            description={dateTransfer(item.post.createdTime)}
                        />
                        {item.post.content}
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center",marginTop:'15px'}}>
                            <Button
                                icon={
                                    buttonStates[item.post.postId].liked ? (<LikeFilled style={{color: 'hotpink'}}/>) : (<LikeOutlined/>)
                                } onClick={() => handleButtonClick(item.post.postId)}/>
                            <span className="post-reply-button" onClick={()=>handleReplyButtonClick(item.post.postId)}>Reply</span>
                        </div>
                        {
                            ReplyBoxStates[item.post.postId]?.shown &&
                            <div>
                                <PostCommentForm postId={item.post.postId}/>
                            </div>
                        }
                    </List.Item>
                )}
            />
        </div>
    )
};

export default PostSubpage;