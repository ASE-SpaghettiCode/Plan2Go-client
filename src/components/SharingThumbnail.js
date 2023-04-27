import React from "react";

export default function SharingThumbnail(props) {
    const {sharedNoteId, noteCoverImage, noteTitle} = props
    return (
        <div className="sharing-container-in-post-creation">
            <div className="cover-image-container-in-post-creation">
                <img className="cover-image-in-post-creation" src={noteCoverImage}/>
            </div>
            <div className="note-title-in-post-creation">{noteTitle}</div>
        </div>
    )

}