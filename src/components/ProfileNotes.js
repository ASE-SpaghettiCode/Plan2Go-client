import React from 'react';
import {Button} from "@mui/material";
import '../Profile.css'

const ProfileNotes=()=>{
    return(
        <div>
            <div className="postnav">
                <a>My Travel Notes</a>
                <a>My Posts</a>
            </div>
            <div className="postcontainer">
                <div className="postcard">
                    <img src="https://cdn.mos.cms.futurecdn.net/pD3bsKPrjsqNiFDGRL5oq6-1920-80.jpg.webp"/>
                    <h1>One night in Paris</h1>
                    <h4>28.12.2022</h4>
                </div>
                <div className="postcard">
                    <img src="https://www.history.com/.image/ar_215:100%2Cc_fill%2Ccs_srgb%2Cg_faces:center%2Cq_auto:good%2Cw_2560/MTkyNDQ5NzY0ODY2OTI1OTgw/gettyimages-1395722285.webp"/>
                    <h1>New York Story</h1>
                    <h4>12.07.2022</h4>
                </div>
                <div className="postcard">
                    <img src="https://static.scientificamerican.com/sciam/cache/file/874F5357-9EEC-496B-AFC68A6ED21476EE_source.jpg?w=590&h=800&B07AB5BC-FD4C-4B00-9C9B2608422E5559"/>
                    <h1>summer hiking</h1>
                    <h4>13.04.2021</h4>
                </div>
                <div className="postcard">
                    <img src="https://www.history.com/.image/ar_215:100%2Cc_fill%2Ccs_srgb%2Cg_faces:center%2Cq_auto:good%2Cw_2560/MTkyNDQ5NzY0ODY2OTI1OTgw/gettyimages-1395722285.webp"/>
                    <h1>New York Story again</h1>
                    <h4>08.03.2019</h4>
                </div>
            </div>
        </div>
    )
}
export default ProfileNotes;