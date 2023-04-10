import logo from "../images/Logo.png";
import NaviBar from "./NaviBar";
import {Header} from "antd/es/layout/layout";
import React from "react";
import "../styles/Following.css";

export default function FollowingTravelNotes(){
    const goHome = () => {
        window.location.href = `/home`;
    }
    return(
        <div>
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'white', width: '100%' }}>
                <img src={logo} className={"naviLogo"} onClick={goHome}/>
                <NaviBar style={{ marginLeft: 'auto' }} />
            </Header>
            <div className="body">
                <div className="notesContainer">
                    <div className="notesCard">
                        <div className="noteImage">
                            noteImage
                        </div>
                        <div>
                            NoteTitle
                        </div>
                        <div>
                            NoteAuthor
                        </div>
                        <div>
                            Date
                        </div>
                    </div>
                    <div className="notesCard">
                        <div className="noteImage">
                            noteImage
                        </div>
                        <div>
                            NoteTitle
                        </div>
                        <div>
                            NoteAuthor
                        </div>
                        <div>
                            Date
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}