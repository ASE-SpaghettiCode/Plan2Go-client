import "../styles/PostCreation.css"
import React, {useState, useEffect} from "react";
import {api, api_note, handleError} from "../helpers/api";
import user from "./User";
import {api_posts} from "../helpers/api";
import Post from "../models/post";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import HeaderBar from "./HeaderBar";
import SharingThumbnail from "./SharingThumbnail";


export default function PostCreation() {
    const userId = localStorage.getItem('id',user.userId);
    const queryParameters = new URLSearchParams(window.location.search)
    const sharingNoteId = queryParameters.get("sharing")
    const [noteId, setNoteId] = useState(null)
    const [noteCoverImage, setNoteCoverImage] = useState('')
    const [noteTitle, setNoteTitle] = useState('')

    useEffect(() => {
        async function fetchData() {
            if (sharingNoteId){
                api_note.get(`/notes/${sharingNoteId}`).then((response) => {
                    const responseData = response.data
                    setNoteId(responseData.noteId)
                    setNoteCoverImage(responseData.coverImage)
                    setNoteTitle(responseData.noteTitle)
                }).catch((err) => {
                    // change the url: without params
                    window.history.pushState({}, "", window.location.pathname);
                    console.log("Wrong sharing note id:", err)
                })
            }
        }
        fetchData()
    }, [])


    const [content, setContent] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = new Post();
        newPost.authorId = userId;
        newPost.content = content;
        newPost.sharedNoteId = noteId;
        console.log(newPost)
        try {
            const response = await api_posts.post('/posts', newPost);
            // Login successfully worked --> navigate to the route /home in the HomeRouter
            window.location.href = `/users/${userId}?tab=posts`;

        } catch (error) {
            alert(`Something went wrong during the post creation: \n${handleError(error)}`);
        }
    }

    const handleCancel = async(e) => {
        e.preventDefault();
        window.location.href = `/home`;
    }

    return <div>
        <HeaderBar/>
        <div className={"page-of-post-creation"}>

            <h1 className={"postCreationTitle"}>💡Share Your Moment: </h1>
            <div className="post-creation-body-container">
                <TextareaAutosize
                    type={"text"}
                    name={"post-content"}
                    minRows={4}
                    placeholder={"Write down the moment you want to share with your friends ..."}
                    className={"creationTextBox"}
                    onChange={(e) => setContent(e.target.value)}
                />
                {noteId &&
                    <SharingThumbnail noteCoverImage={noteCoverImage} noteTitle={noteTitle} />
                }
            </div>
            <button type={"submit"} className={"postSubmit"} onClick={(e) => handleSubmit(e)}>Submit</button>
            <button type={"submit"} className={"postCancel"} onClick={(e) => handleCancel(e)}>Cancel</button>
        </div>
    </div>
}