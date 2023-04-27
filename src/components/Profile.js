import React from 'react';
import '../styles/Profile.css';
import User from "./User";
import ProfileNotes from "./ProfileNotes";
import HeaderBar from "./HeaderBar";

export default function Profile() {

    return(
        <div className="main">
            <HeaderBar/>
            <div className="container">
                <div>
                    <User/>
                </div>
                <div>
                    <ProfileNotes/>
                </div>
            </div>
            <footer>
                © 2023 SpaghettiCode
            </footer>
        </div>
    )
}