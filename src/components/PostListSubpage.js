import {Avatar, List} from 'antd';
import {useState, useEffect} from "react";
import React from "react";
import {api_posts, handleError} from "../helpers/api";
import logo from "../images/Logo.png";
import NaviBar from "./NaviBar";
import {Header} from "antd/es/layout/layout";
import '../styles/PostListSubpage.css'
import LikePostButton from "./LikePostButton";

const PostSubpage = () => {
        // const path = window.location.pathname;
        // const userID = path.substring(path.lastIndexOf('/') + 1);
        const userID = localStorage.getItem('id');
        const [posts, setPosts] = useState([]);

        useEffect(() => {
            async function fetchData() {
                try {
                    const response = await api_posts.get('/posts/following/' + userID);
                    console.log(response.data);
                    setPosts(response.data);
                } catch (error) {
                    console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                    console.error("Details:", error);
                    alert("Something went wrong while fetching the users! See the console for details.");
                }
            }

            fetchData();
        }, []);

        const goHome = () => {
            window.location.href = `/home`;
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
                <List
                    className="list"
                    itemLayout="vertical"
                    size="large"
                    dataSource={posts}
                    renderItem={(item) => (
                        <List.Item
                            // extra={
                            //     <img
                            //         width={272}
                            //         alt="logo"
                            //         src={logo}
                            //     />
                            // }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.imagePath}/>}
                                title={<a href={'/users/' + item.post.authorId}>{item.authorName}</a>}
                            />
                            {item.post.content}
                        </List.Item>
                    )}
                />
            </div>
        )
    }
;

export default PostSubpage;