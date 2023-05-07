import '../../styles/TravelNoteCreation.css'
import React, {useState, useEffect} from "react";
import EditFormField from "../form-field/EditFormField";
import {api_note} from "../../helpers/api";
import convertJavaDateToStr from "../utils/convertJavaDateToStr";


const defaultCommentAuthorImage = "https://res.cloudinary.com/dgnzmridn/image/upload/v1653055086/n9miv50ifxgpwgshy09w.jpg"


export default function TravelNoteComments(props) {
    const {localUserId, noteId} = props
    const [addedComment, setAddedComment] = useState('')
    const [commentList, setCommentList] = useState([])
    const [refreshTrigger, setRefreshTrigger] = useState(true)


    function handleClickCommentAuthorImg(e){
        const commentAuthorId = e.currentTarget.id
        window.location.href = `/users/${commentAuthorId}`
    }
    function handleConfirmComment(){
        const requestBody = {
            commentAuthorId:localUserId,
            commentText:addedComment
        }
        api_note.post(`/notes/${noteId}/comments`, requestBody).then(() =>{
            setRefreshTrigger(!refreshTrigger)
        })
    }
    function handleDeleteComment(commentId){

        api_note.delete(`/users/${localUserId}/comments/${commentId}`).then(() =>{
            setRefreshTrigger(!refreshTrigger)
        })
    }

    useEffect(() => {
        async function fetchData() {
                api_note.get(`/notes/${noteId}/comments`).then((response) => {
                    setCommentList(response.data)
                })
        }
        fetchData().then()
    }, [refreshTrigger])

    return (
        <div className="comments-and-add-comment">
            <div className='comment-list'>
                <div className="comments-title">📝 Comments: </div>
                {commentList.map((comment) => {
                    return(
                        <div className="comment-instance" key={comment.commentId} >
                            <div className="comment-author-img-container" id={comment.commentAuthorId} onClick={handleClickCommentAuthorImg}>
                                <img alt="commentAuthorImage"
                                     src={comment.commentAuthorImage ? comment.commentAuthorImage : defaultCommentAuthorImage}
                                     className='commentAuthorImage'/>
                            </div>
                            <div className="text-and-meta-data">
                                <div className="meta-data">
                                    <div className="comment-author-name">
                                        {comment.commentAuthorName}
                                    </div>
                                    <div className="comment-time">
                                        {convertJavaDateToStr(comment.createdTime)} &ensp;
                                        { localUserId === comment.commentAuthorId &&
                                        <span className="comment-delete"
                                              onClick={() => handleDeleteComment(comment.commentId)}>delete</span>
                                        }
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
                    <div className="comment-publish-button" onClick={handleConfirmComment}> Confirm </div>
                </div>
            </div>

        </div>
    )
}