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

    const TravelNoteItems=travelNotes.map((travelnote)=>
        <div className="notesContainer">
            <div className="notesCard">
                <div className="imageContainer">
                    <img className="noteImage" src={travelnote.coverImage}/>
                </div>
                <div className="notetitle">
                    <h2>{travelnote.noteTitle}</h2>
                    <h5>{travelnote.date}</h5>
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
                <div className="notesContainer">
                    {TravelNoteItems}
                </div>
            </div>
        </div>
    )
}