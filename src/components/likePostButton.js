import {LikeFilled, LikeOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {Button} from "antd";
import {api_posts, handleError} from "../helpers/api";

const LikePostButton = ({match}) => {
    const userId = localStorage.getItem("id");
    const path = window.location.pathname;
    const postId = path.substring(path.lastIndexOf('/') + 1);
    const [like, setLike] = useState({
        postLikeNum:"",
        whetherLikePost:""
    });

    //check user whether liked post already
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await api_posts.get(`/users/` + userId + `/whetherLikes/posts/` + postId);
                setLike(res.data);
                console.log(like)
            } catch (error) {
                console.error(`Something went wrong while fetching the liked recipes: \n${handleError(error)}`);
            }
        }

        fetchData();
    }, []);

    const doLike = async () => {
        try {
            //post mapping users/{userId}/likes/posts/{postId}
            const response = await api_posts.post(`/users/` + userId + `/likes/posts/` + postId);
            setLike(response.data);
            console.log('do like'+response.data)
        } catch (error) {
            alert(`Something went wrong during do like: \n${handleError(error)}`);
        }
    };

    const doUnlike = async () => {
        try {
            //delete mapping users/{userId}/likes/posts/{postId}
            const response = await api_posts.delete(`/users/` + userId + `/likes/posts/` + postId);
            setLike(response.data);
            console.log('unlike' + response.data)
        } catch (error) {
            alert(`Something went wrong during do like: \n${handleError(error)}`);
        }
    };

    let likeButton;
    if (like.whetherLikePost === true) {
        likeButton = (<Button icon={<LikeFilled style={{ color: 'hotpink' }}/>} onClick={doUnlike}>{like.postLikeNum}</Button>)
    } else {
        likeButton = (<Button icon={<LikeOutlined/>} onClick={doLike}>{ like.postLikeNum}</Button>)
    }

    return (
        <div>
            {likeButton}
        </div>
    )
}

export default LikePostButton;