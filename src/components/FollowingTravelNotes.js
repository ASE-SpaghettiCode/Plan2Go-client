import React, {useEffect, useState} from "react";
import "../styles/Following.css";
import {api_note, handleError} from "../helpers/api";
import HeaderBar from "./HeaderBar";

export default function FollowingTravelNotes(){

    const path=window.location.pathname;
    const userId=path.substring(path.lastIndexOf('/')+1);
    const [travelNotes,setTravelNotes]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const noteNumber=5;
    const lastIndex=currentPage*noteNumber;
    const displayTravelNotes=travelNotes.slice(0,lastIndex);

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await api_note.get(`/notes/following/`+userId);
                setTravelNotes(response.data);
                console.log(response.data);
            }catch(error){
                console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData();
    },[]);

    const goHome = () => {
        window.location.href = `/home`;
    }

    const handleTimeFormat=(props)=>{
        const date=new Date(props);
        const createdDate=date.toLocaleString('en-GB',{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
        return(
            createdDate
        )
    }

    const handleClickTravelNotes=(props)=>{
        window.location.href=`/travel-notes/`+props.note.noteId;
    }

    const TravelNoteItems=displayTravelNotes.map((travelnote)=>
        <div className="notesContainer">
            <div className="notesCard" onClick={()=>{handleClickTravelNotes(travelnote)}}>
                <div className="imageContainer">
                    <img className="noteImage" src={travelnote.note.coverImage}/>
                </div>
                <div className="noteInfo">
                    <div className="notetitle">
                        <h2>{travelnote.note.noteTitle}</h2>
                    </div>
                    <div className="author">
                        <h5>{travelnote.authorName}&ensp; • &ensp;</h5>
                        <h6>{handleTimeFormat(travelnote.note.createdTime)}</h6>
                    </div>
                </div>
            </div>
        </div>
    );

    return(
        <div>
            <HeaderBar/>
            <div className="body">
                {travelNotes.length !== 0 ?
                    <div className="notesContainer">
                        {TravelNoteItems}
                        {displayTravelNotes.length!==travelNotes.length?
                            <div className="note-load">
                                <button className="note-loadButton" onClick={()=>setCurrentPage(currentPage+1)}>Load More</button>
                            </div>:<div></div>
                        }
                    </div>:
                    <h6>Explore and follow some users now</h6>
                }
            </div>
        </div>
    )
}