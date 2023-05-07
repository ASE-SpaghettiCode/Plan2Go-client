import React, {useEffect, useState} from 'react';
import '../../styles/Profile.css';
import {api_note, handleError} from "../../helpers/api";
import MyLikeList from "./LikeList";
import PostList from "./PostList";

const ProfileNotes=()=>{
    const [TravelNotes,setTravelNotes]=useState([]);
    const path = window.location.pathname;
    const userID = path.substring(path.lastIndexOf('/') + 1);
    const [showTravelNotes,setShowTravelNotes]=useState(true);
    const [showPosts,setShowPosts]=useState(false);
    const [showLikes,setShowLikes]=useState(false);

    function handleShowLikes(){
        setShowTravelNotes(false);
        setShowLikes(true);
        setShowPosts(false);
    }

    function handleShowTravelNotes(){
        setShowLikes(false);
        setShowTravelNotes(true);
        setShowPosts(false);
    }

    function handleShowPosts(){
        setShowPosts(true);
        setShowLikes(false);
        setShowTravelNotes(false);
    }


    useEffect(() => ({
        posts: handleShowPosts,
        notes: handleShowTravelNotes,
        likes: handleShowLikes
    }[new URLSearchParams(window.location.search).get('tab')]?.()), []);

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await api_note.get('/users/'+userID+'/notes');
                setTravelNotes(response.data);
            }catch (error) {
                console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData().then().catch((err) => console.log(err))
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
            <img src={travelnote.coverImage} alt="coverImage"/>
            <h1>{travelnote.noteTitle}</h1>
            <h4>{handleTimeFormat(travelnote.createdTime)}</h4>
        </div>
    );




    return(
        <div>
            {showTravelNotes &&
                <div>
                    <div className="postnav">
                        <a href="#" className="active" onClick={handleShowTravelNotes}>Travel Notes</a>
                        <a href="#" onClick={handleShowPosts}>Posts</a>
                        <a href="#" onClick={handleShowLikes}>Likes</a>
                    </div>
                    <div className="postcontainer">
                        {listItems}
                    </div>
                </div>
            }

            {showLikes &&
                <div>
                    <div className="postnav">
                        <a href="#" onClick={handleShowTravelNotes}>Travel Notes</a>
                        <a href="#" onClick={handleShowPosts}>Posts</a>
                        <a href="#" className="active" onClick={handleShowLikes}>Likes</a>
                    </div>
                    <MyLikeList/>
                </div>
            }
            {showPosts &&
                <div>
                    <div className="postnav">
                        <a href="#" onClick={handleShowTravelNotes}>Travel Notes</a>
                        <a href="#" className="active" onClick={handleShowPosts}>Posts</a>
                        <a href="#" onClick={handleShowLikes}>Likes</a>
                    </div>
                <PostList/>
                </div>
            }
        </div>
    )
}
export default ProfileNotes;