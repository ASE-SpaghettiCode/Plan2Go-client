import React from "react";
import '../styles/SharingThumbnail.css'

export default function SharingThumbnail(props) {
    const {sharedNoteId, noteCoverImage, noteTitle, usage} = props
    // usage can be { "creation", "profile", "subpage" }
    let classNamePostfix;
    if (usage === "profile" || usage === "subpage") {
        classNamePostfix = ""
    }else{
        classNamePostfix = "-creation"
    }

    function handleClickSharedNote(){
        window.location.href = `/travel-notes/${sharedNoteId}`;
    }

    return (
        <div className={`sharing-container-in-post${classNamePostfix}`} onClick={handleClickSharedNote}>
            <div className={`cover-image-container-in-post${classNamePostfix}`}>
                <img className={`cover-image-in-post${classNamePostfix}`} src={noteCoverImage}/>
            </div>
            <div className={`note-title-in-post${classNamePostfix}`}>{noteTitle}</div>
        </div>
    )

}