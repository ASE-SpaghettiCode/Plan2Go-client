import React, {useEffect, useState} from 'react';
import {Button, Tab, Tabs} from "@mui/material";
import '../styles/Profile.css';
import {api, api_note, handleError} from "../helpers/api";
import MyLikeList from "./LikeList";


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
        console.log("my likes")
    };

    function handleShowTravelNotes(){
        setShowLikes(false);
        setShowTravelNotes(true);
        console.log("travel notes");
    };


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

    const listItems = TravelNotes.map((travelnote)=>
        <div className="postcard" key={travelnote.createdTime}>
            <img src={travelnote.coverImage}/>
            <h1>{travelnote.noteTitle}</h1>
            <h4>{travelnote.date}</h4>
        </div>
    );



    return(
        <div>
            <div className="postnav">
                <a onClick={handleShowTravelNotes}>My Travel Notes</a>
                <a>My Posts</a>
                <a onClick={handleShowLikes}>My Likes</a>
            </div>
            {showTravelNotes &&
                <div className="postcontainer">
                    {listItems}
                </div>
            }
            {showLikes &&
                <MyLikeList/>
            }

        </div>
    )
}
export default ProfileNotes;