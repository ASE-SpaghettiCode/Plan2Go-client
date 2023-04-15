import logo from "../images/Logo.png";
import NaviBar from "./NaviBar";
import {Header} from "antd/es/layout/layout";
import React, {useEffect, useState} from "react";
import "../styles/Following.css";
import {api_note, handleError} from "../helpers/api";

export default function FollowingTravelNotes(){

    const path=window.location.pathname;
    const userId=path.substring(path.lastIndexOf('/')+1);
    const [travelNotes,setTravelNotes]=useState([]);

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

    const TravelNoteItems=travelNotes.map((travelnote)=>
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
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'white', width: '100%' }}>
                <img src={logo} className={"naviLogo"} onClick={goHome}/>
                <NaviBar style={{ marginLeft: 'auto' }} />
            </Header>
            <div className="body">
                {travelNotes.length !== 0 ?
                    <div className="notesContainer">
                        {TravelNoteItems}
                    </div>:
                    <h6>Explore and follow some users now</h6>
                }


            </div>
        </div>
    )
}