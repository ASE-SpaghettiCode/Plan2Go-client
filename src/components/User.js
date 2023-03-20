import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import '../Profile.css'
import {useNavigate} from "react-router-dom";
import {api, handleError} from "../helpers/api";

const User=({match})=>{
    const navigate=useNavigate();
    const [user, setUsers]=useState({
        userId:"",
        username:"",
    });

    const path = window.location.pathname;
    const userID = path.substring(path.lastIndexOf('/') + 1);


    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users/' + userID);
                console.log(response.data);
                setUsers(response.data);

            } catch (error) {
                console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);


    return(
        <div className="user">
            <div className="avatar">
                       <img src="https://images.pexels.com/photos/15652565/pexels-photo-15652565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            </div>
            <h2><UserUsername user={user}/></h2>
            <p className="follow">Follower 20</p>
            <p className="follow">Following 35</p>
            <div className="information">
                <div>
                    <UserInfo user={user}/>
                </div>
                <div>We were good, we were gold
                    Kinda dream that can't be sold
                    We were right 'til we weren't
                    Built a home and watched it burn</div>
            </div>
            <Button variant="contained" color='secondary'>Edit</Button>
        </div>
    )
}

const UserUsername = ({user}) => {
    return (
            <div>{user.username}</div>
    );
};

const UserInfo = ({user}) => {
    return (
        <div>{user.info}</div>
    );
};


export default User;