import React, {useEffect, useState} from 'react';
import '../styles/Profile.css';
import {api, api_note, handleError} from "../helpers/api";
import MyLikeList from "./LikeList";
import PostList from "./PostList";

const ProfileNotes=()=>{
    const [TravelNotes,setTravelNotes]=useState([]);
    const [LikedNotes,setLikedNotes]=useState([]);
    const path = window.location.pathname;
    const userID = path.substring(path.lastIndexOf('/') + 1);
    const [showTravelNotes,setShowTravelNotes]=useState(true);
    const [showPosts,setShowPosts]=useState(false);
    const [showLikes,setShowLikes]=useState(false);

    function handleShowLikes(){
        setShowTravelNotes(false);
        setShowLikes(true);
        setShowPosts(false);
        console.log("my likes");
    };

    function handleShowTravelNotes(){
        setShowLikes(false);
        setShowTravelNotes(true);
        setShowPosts(false);
        console.log("travel notes");
    };

    function handleShowPosts(){
        setShowPosts(true);
        setShowLikes(false);
        setShowTravelNotes(false);
        console.log("post");
    };


    useEffect(() => ({
        posts: handleShowPosts,
        notes: handleShowTravelNotes,
        likes: handleShowLikes
    }[new URLSearchParams(window.location.search).get('tab')]?.()), []);

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await api_note.get('/users/'+userID+'/notes');
                console.log(response.data);
                setTravelNotes(response.data);
            }catch (error) {
                console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData();
    },[]);

    const handleClickNotes=(props)=>{
        window.location.href=`/travel-notes/`+props.noteId;
    }

    const handleTimeFormat=(props)=>{
        const date=new Date(props);
        const createdDate=date.toLocaleString('en-GB',{year: 'numeric', month: 'long', day: 'numeric'});
        return(
            createdDate
        )
    }

    const listItems = TravelNotes.map((travelnote)=>
        <div className="postcard" key={travelnote.createdTime} onClick={()=>handleClickNotes(travelnote)}>
            <img src={travelnote.coverImage}/>
            <h1>{travelnote.noteTitle}</h1>
            <h4>{handleTimeFormat(travelnote.createdTime)}</h4>
        </div>
    );




    return(
        <div>
            {showTravelNotes &&
                <div>
                    <div className="postnav">
                        <a className="active" onClick={handleShowTravelNotes}>My Travel Notes</a>
                        <a onClick={handleShowPosts}>My Posts</a>
                        <a onClick={handleShowLikes}>My Likes</a>
                    </div>
                    <div className="postcontainer">
                        {listItems}
                    </div>
                </div>
            }

            {showLikes &&
                <div>
                    <div className="postnav">
                        <a onClick={handleShowTravelNotes}>My Travel Notes</a>
                        <a onClick={handleShowPosts}>My Posts</a>
                        <a className="active" onClick={handleShowLikes}>My Likes</a>
                    </div>
                    <MyLikeList/>
                </div>
            }
            {showPosts &&
                <div>
                    <div className="postnav">
                        <a onClick={handleShowTravelNotes}>My Travel Notes</a>
                        <a className="active" onClick={handleShowPosts}>My Posts</a>
                        <a onClick={handleShowLikes}>My Likes</a>
                    </div>
                <PostList/>
                </div>
            }

        </div>
    )
}
export default ProfileNotes;