import React from 'react';
import {Button} from "@mui/material";
import '../Profile.css'

const User=()=>{
    return(
        <div className="user">
            <div className="avatar">
                       <img src="https://images.pexels.com/photos/15652565/pexels-photo-15652565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            </div>
            <h2>Username</h2>
            <p className="follow">Follower 20</p>
            <p className="follow">Following 35</p>
            <div className="information">
                <div>We were good, we were gold
                    Kinda dream that can't be sold
                    We were right 'til we weren't
                    Built a home and watched it burn</div>
            </div>
            <Button variant="contained" color='secondary'>Edit</Button>
        </div>
    )
}
export default User;