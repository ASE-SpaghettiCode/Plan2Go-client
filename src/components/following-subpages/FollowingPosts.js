import {Avatar, Button, Divider, List} from 'antd';
import {useState, useEffect} from "react";
import {api_posts, handleError} from "../../helpers/api";
import '../../styles/PostListSubpage.css'
import {LikeFilled, LikeOutlined} from "@ant-design/icons";
import PostCommentForm from "../post/PostCommentForm";
import HeaderBar from "../navigation-tools/HeaderBar";
import PostCommentList from "../post/PostCommentList";
import SharingThumbnail from "../travel-note/SharingThumbnail";

const FollowingPosts = () => {
    const userID = localStorage.getItem('id');
    const [posts, setPosts] = useState([]);
    const [buttonStates, setButtonStates] = useState({});
    const [ReplyBoxStates, setReplyBoxStates] = useState({});
    const [likeTrigger, setLikeTrigger] = useState(true);
    const [replyTrigger, setReplyTrigger] = useState(true);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api_posts.get('/posts/following/' + userID);
                setPosts(response.data);
                response.data.forEach((item) => {
                    setButtonStates(
                        (prevState =>
                            {
                                const newState={...prevState};
                                newState[item.post.postId]={
                                    ...prevState[item.post.postId],
                                    liked: isLiked(item.post)
                                };
                                return newState;
                            }
                        )
                    )
                });
            } catch (error) {
                console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData().then().catch((err) => console.log(err))
    }, [likeTrigger, replyTrigger]);



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
        return likeList.indexOf(userID) !== -1;
    }

    function handleReplyButtonClick(postId){
        setReplyBoxStates(
            (prevState =>
                {
                    const newState={...prevState};
                    newState[postId]={
                        ...prevState[postId],
                        shown: prevState[postId]?.shown ? !prevState[postId]?.shown: true
                    };
                    return newState;
                }
            )
        )
        setReplyTrigger(!replyTrigger)
    }

    function handleButtonClick(postId) {
        if (buttonStates[postId].liked) {
            api_posts.delete(`/users/` + userID + `/likes/posts/` + postId)
                .catch((err) => console.log("unlike error: ", err))
        } else {
            api_posts.post(`/users/` + userID + `/likes/posts/` + postId)
                .catch((err) => console.log("like error: ", err))
        }
        setLikeTrigger(!likeTrigger)
    }


    return (
        <div>
            <HeaderBar/>
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
                        {item.post.sharedNoteId &&
                            <SharingThumbnail
                                sharedNoteId={item.post.sharedNoteId}
                                noteCoverImage={item.post.sharedNoteCoverImage}
                                noteTitle={item.post.sharedNoteTitle}
                                usage="subpage"
                            />
                        }
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center",marginTop:'15px'}}>
                            <div>
                                <Button
                                    icon={
                                        buttonStates[item.post.postId]?.liked ? (<LikeFilled style={{color: 'hotpink'}}/>) : (<LikeOutlined/>)
                                    } onClick={() => handleButtonClick(item.post.postId)}/>
                                <a style={buttonStates[item.post.postId]?.liked?{color: 'hotpink'}:{color:'black'}}> {item.post.likedUsers.length}</a>
                            </div>
                            <span className="post-reply-button" onClick={()=>handleReplyButtonClick(item.post.postId)}>Reply</span>
                        </div>

                        {
                            ReplyBoxStates[item.post.postId]?.shown &&
                            <div>
                                <PostCommentForm postId={item.post.postId}/>
                            </div>
                        }
                        <div>
                            <PostCommentList postId={item.post.postId}/>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
};

export default FollowingPosts;