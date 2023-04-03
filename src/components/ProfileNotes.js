import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import '../styles/Profile.css';
import {api_note, handleError} from "../helpers/api";


const ProfileNotes=()=>{
    const [TravelNotes,setTravelNotes]=useState([]);
    const path = window.location.pathname;
    const userID = path.substring(path.lastIndexOf('/') + 1);

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
        <div className="postcard">
            <img src={travelnote.coverImage}/>
            <h1>{travelnote.noteTitle}</h1>
            <h4>{travelnote.date}</h4>
        </div>
    );

    return(
        <div>
            <div className="postnav">
                <a>My Travel Notes</a>
                <a>My Posts</a>
            </div>
            <div className="postcontainer">
                {listItems}
            </div>
        </div>
    )
}
export default ProfileNotes;