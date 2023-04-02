import '../styles/TravelNoteCreation.css'
import React, {useState, useEffect, useRef} from "react";
import fakeDate from '../fakeData/travelNoteComments.json'
import EditFormField from "./form_field/EditFormField";

function convertDateNumToStr(num){
    const date = new Date(num)
    const yyyy = date.getFullYear();  // 获取完整的年份(4位，1970)
    const MM =date.getMonth() + 1;    // 0-11，remember +1
    const dd =date.getDate();
    const hh =date.getHours();
    const mm =date.getMinutes();
    const ss =date.getSeconds();
    const dateStr = "On " + dd + "." + MM + "." + yyyy + " at "  + hh + ":" + mm + ':' +ss
    return dateStr
}





export default function TravelNoteComments(props) {
    const {localUserId, noteId} = props
    const [addedComment, setAddedComment] = useState('')

    console.log(fakeDate)
    const instanceFakeComment = fakeDate[0]
    const dateNum = instanceFakeComment.time
    const dateStr = convertDateNumToStr(dateNum)
    console.log(dateStr)

    function handleClickCommentAuthorImg(e){
        const commentAuthorId = e.currentTarget.id
        console.log("commentAuthorId:", commentAuthorId)
    }

    return (
        <div className="comments-and-add-comment">
            <div className='comment-list'>
                <div className="comments-title">📝 Comments: </div>
                {fakeDate.map((comment) => {
                    return(
                        <div className="comment-instance" key={comment.commentId} >
                            <div className="comment-author-img-container" id={comment.commentAuthorId} onClick={handleClickCommentAuthorImg}>
                                <img src={comment.commentAuthorImage} className='commentAuthorImage'/>
                            </div>
                            <div className="text-and-meta-data">
                                <div className="meta-data">
                                    <div className="comment-author-name">
                                        {comment.commentAuthorName}
                                    </div>
                                    <div className="comment-time">
                                        {convertDateNumToStr(comment.time)}
                                    </div>
                                </div>
                                <div className="comment-text">
                                    {comment.commentText}
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className='add-comment-box'>
                    <EditFormField
                        variant="outlined"
                        className="comment-input"
                        label="Add a public comment..."
                        minRows={3}
                        multiline={true}
                        value={addedComment}
                        onChange={un => setAddedComment(un)}
                    />
                    <div className="comment-publish-button" > Confirm </div>
                </div>
            </div>

        </div>
    )
}