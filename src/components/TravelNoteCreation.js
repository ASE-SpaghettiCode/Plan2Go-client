import '../styles/TravelNoteCreation.css'
import React, {useState, useEffect, useRef} from "react";
import EditFormField from "./form_field/EditFormField";
import {InputAdornment} from "@mui/material";
import RatingField from "./form_field/RatingField";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import EditorJs from "./editorjs";
import Axios from "axios";
import {api, api_note} from "../helpers/api";
import logo from "../images/Logo.png";
import NaviBar from "./NaviBar";
import {Header} from "antd/es/layout/layout";

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import MyLocationOutlinedIcon from '@mui/icons-material/MyLocationOutlined';
import TravelNoteComments from "./TravelNoteComments";
import HeaderBar from "./HeaderBar";
import getDisplayName from "./utils/getDisplayName";
import autoCompleteDestinationOptions from "./utils/autoCompleteDestinationOptions";
import DestinationOptions from "./DestinationOptions";


let DEFAULT_INITIAL_DATA = {
    "time": new Date().getTime(),
    "blocks": [
        {
            "type": "header",
            "data": {
                "text": "Write what you'd like to share here!",
                "level": 1
            }
        },
    ]
}


export default function TravelNoteCreation(props) {
    const {readOnly, editMode} = props;
    const localUserId = localStorage.getItem('id')
    const localUserName = localStorage.getItem('username')

    const [authorId, setAuthorId] = useState(localUserId)
    const [authorName, setAuthorName] = useState(localUserName)

    const [authorProfileImage, setAuthorProfileImage] = useState('https://res.cloudinary.com/drlkip0yc/image/upload/v1679279539/fake-profile-photo_qess5v.jpg')
    // const [authorProfileImage, setAuthorProfileImage] = useState("")
    const [noteTitle, setNoteTitle] = useState("Give your travel note a name here.")
    const [coverImage, setCoverImage] = useState("https://res.cloudinary.com/drlkip0yc/image/upload/v1679311004/cover-landscape_w1fbtf.jpg")

    const [date, setDate] = useState("");
    const [duration, setDuration] = useState(1);
    const [rating, setRating] = useState(0);
    const [expense, setExpense] = useState(0);
    const [numTravelers, setNumTravelers] = useState(1);
    const [targetGroup, setTargetGroup] = useState("");
    const [destination, setDestination] = useState("");

    const [destinationOptions, setDestinationOptions] = useState([]);
    const [coordinates, setCoordinates] = useState([]);

    const [editorData, setEditorData] = useState(DEFAULT_INITIAL_DATA);
    const [liked, setLiked] = useState(false);

    const path = window.location.pathname
    const noteId = path.substring(path.lastIndexOf('/') + 1)


    useEffect(() => {
        async function fetchData() {
            if (readOnly || editMode) {
                api_note.get(`/notes/${noteId}`).then((response) => {
                    const responseData = response.data
                    setAuthorId(responseData.authorId)
                    setNoteTitle(responseData.noteTitle)
                    setCoverImage(responseData.coverImage)
                    setDate(responseData.date)
                    setDuration(responseData.duration)
                    setRating(responseData.rating)
                    setExpense(responseData.expense)
                    setNumTravelers(responseData.numTravelers)
                    setTargetGroup(responseData.targetGroup)
                    setDestination(responseData.destination)
                    setCoordinates(responseData.coordinates)
                    console.log("likedUsers:",responseData.likedUsers)
                    console.log("editorData:",responseData.editorData)

                    if (responseData.likedUsers.includes(localUserId)){
                        setLiked(true)
                    }
                    return responseData.authorId
                }).then((newAuthorId) =>
                    api.get(`/users/${newAuthorId}`).then((response) => {
                        setAuthorName(response.data.username)
                        const userImageURL = response.data.imageLink
                        console.log("userImageURL:", userImageURL)
                        if (userImageURL) {
                            setAuthorProfileImage(userImageURL)
                        }
                    })
                )

            } else { // creation mode
                api.get(`/users/${authorId}`).then((response) => {
                    setAuthorName(response.data.username)
                    const userImageURL = response.data.imageLink
                    console.log("userImageURL:", userImageURL)
                    if (userImageURL) {
                        setAuthorProfileImage(userImageURL)
                    }
                })

            }
        }

        fetchData()
    }, [])

    function doSubmit() {
        const requestBody = {
            authorId,
            noteTitle,
            coverImage,
            date,
            duration,
            rating,
            expense: expense,
            numTravelers,
            targetGroup,
            destination,
            coordinates,
            editorData,
        };
        api_note.post('/notes', requestBody)
            .then((response) => {
                const responseNoteId = response.data.noteId
                window.location.href = `/travel-notes/${responseNoteId}`
            }).catch((err) => console.log("submit error:", err))
    }
    function doDelete() {
        api_note.delete(`/users/${localUserId}/delete/notes/${noteId}`)
            .then(() => {
                window.location.href = `/users/${localUserId}`
            }).catch((err) => console.log("Delete error:", err))
    }

    function goToEdit() {
        window.location.href = `/travel-notes/edit/${noteId}`
    }
    function doSaveEdit() {
        const requestBody = {
            authorId,
            noteTitle,
            coverImage,
            date,
            duration,
            rating,
            expense: expense,
            numTravelers,
            targetGroup,
            destination,
            coordinates,
            editorData,
        };
        api_note.put(`/users/${localUserId}/editing/notes/${noteId}`,requestBody)
            .then(() => {
                window.location.href = `/travel-notes/${noteId}`
            }).catch((err) => console.log("Save edit error:", err))
    }
    function doCancelEdit() {
        window.location.href = `/travel-notes/${noteId}`
    }


    // const NOMINATIM_BASE_URI = 'https://nominatim.openstreetmap.org/search?'


    // search the coordinates when user typing (set time out 1s)
    useEffect(() => {
        if (!readOnly) {
            autoCompleteDestinationOptions(destination, setDestinationOptions)
        }
    }, [destination])

    function handleCoverImageChange(e) {
        let file = e.target.files[0];
        const formData = new FormData;
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");
        Axios.post("https://api.cloudinary.com/v1_1/drlkip0yc/image/upload", formData
        ).then((response) => {
            let newImageUrl = response.data['secure_url'].toString();
            setCoverImage(newImageUrl)
        }).catch((err) => console.log("Upload image err:", err))
    }

    function handleClickAuthorName() {
        window.location.href = `/users/${authorId}`;
    }

    const goHome = () => {
        window.location.href = `/home`;
    }

    function handleLikeClick() {
        console.log("localUserId:", localUserId)
        console.log("noteId:", noteId)
        if(liked){
            api_note.delete(`/users/${localUserId}/likes/notes/${noteId}`)
                .catch((err) => console.log("unlike error:", err))
        }else{
            api_note.post(`/users/${localUserId}/likes/notes/${noteId}`)
                .catch((err) => console.log("like error:", err))
        }
        setLiked(!liked);
    }
    function handleShareClick() {
        window.location.href = `/post-creation?sharing=${noteId}`;
    }
    function handleLocateClick() {
        window.location.href = `/home?lat=${coordinates[1]}&lng=${coordinates[0]}`
    }

    return (
        <div>
            <HeaderBar/>
            <div>
                {!readOnly && !editMode && <div onClick={doSubmit} className="noteButtonContainer"> SUBMIT </div>}

                {readOnly && !editMode && localUserId === authorId &&
                    <div onClick={goToEdit} className="noteButtonContainer noteEditButton">
                        EDIT
                    </div>
                }
                {readOnly && !editMode && localUserId === authorId &&
                    <div onClick={doDelete} className="noteButtonContainer noteDeleteButton">
                        DELETE
                    </div>
                }
                {localUserId === authorId && editMode &&
                    <div onClick={doSaveEdit} className="noteButtonContainer noteSaveEditButton">
                        SAVE
                    </div>
                }
                {localUserId === authorId && editMode &&
                    <div onClick={doCancelEdit} className="noteButtonContainer noteCancelButton">
                        CANCEL
                    </div>
                }
                {!readOnly &&
                    <label className="coverImageChange">
                        <input id="inputCoverImage" type="file" onChange={e => handleCoverImageChange(e)}/>
                        💡 Click here to change your cover image
                    </label>
                }
                <div className='CoverContainer'>
                    <img id='cover-landscape' src={coverImage}/>
                </div>
                <div className='CreationContainer'>
                    <div className='AuthorContainer'>
                        <img id='authorPhoto' src={authorProfileImage}/>
                        <p id='authorName'> By: <span onClick={handleClickAuthorName} id="authorNameSpan">{authorName} </span></p>
                    </div>
                    <div className='TitleContainer'>
                        {readOnly ?
                            <div className="noteTitle">{noteTitle}</div>
                            :
                            <input
                                type="text"
                                className="noteTitle"
                                value={noteTitle}
                                maxLength="55"
                                onChange={e => setNoteTitle(e.target.value)}
                            />
                        }
                    </div>

                    <div className='IndicatorContainer'>
                        <div id='indicator1' className="indicatorItem">
                            <div className="indicatorLabel"> 🗓 Travel Date:</div>
                            <EditFormField
                                readOnly={readOnly}
                                value={date}
                                placeholder="dd.MM.yyyy"
                                className="edit-field"
                                onChange={un => setDate(un)}
                            />
                        </div>
                        <div id='indicator2' className="indicatorItem">
                            <div className="indicatorLabel"> 🔢 Duration:</div>
                            <EditFormField
                                readOnly={readOnly}
                                value={duration}
                                placeholder=""
                                endAdornment={<InputAdornment position="end">(days)</InputAdornment>}
                                type='number'
                                className="edit-field"
                                onChange={un => setDuration(un)}
                            />
                        </div>
                        <div id='indicator3' className="indicatorItem">
                            <div className="ratingLabel indicatorLabel"> 💯 Rating:</div>
                            <RatingField
                                readOnly={readOnly}
                                disabled={readOnly}
                                value={rating}
                                className="rating-field"
                                onChange={un => setRating(un)}
                            />
                        </div>

                        <div id='indicator4' className="indicatorItem">
                            <div className="indicatorLabel"> 💰 Expense:</div>
                            <EditFormField
                                readOnly={readOnly}
                                value={expense}
                                placeholder="how much ..."
                                type='number'
                                endAdornment={<InputAdornment position="end">(CHF)</InputAdornment>}
                                className="edit-field"
                                onChange={un => setExpense(un)}
                            />
                        </div>
                        <div id='indicator5' className="indicatorItem">
                            <div className="indicatorLabel"> 👬 No. of Travelers:</div>
                            <EditFormField
                                readOnly={readOnly}
                                value={numTravelers}
                                placeholder="how many ..."
                                type='number'
                                className="edit-field"
                                onChange={un => setNumTravelers(un)}
                            />
                        </div>
                        <div id='indicator6' className="indicatorItem">
                            <div className="indicatorLabel"> 🎯 Target Group:</div>
                            <EditFormField
                                readOnly={readOnly}
                                value={targetGroup}
                                placeholder="suitable for ..."
                                className="edit-field"
                                onChange={un => setTargetGroup(un)}
                            />
                        </div>
                        <div id='indicator7' className="indicatorItem locationItem">
                            <div className="locationLabel"> 📍 Destination:</div>
                            <EditFormField
                                readOnly={readOnly}
                                value={destination}
                                placeholder="Search and select the exact address to be displayed on the map..."
                                className="location-edit-field"
                                onChange={un => setDestination(un)}
                            />
                            {!readOnly && <TravelExploreIcon className="search-icon"/>}
                        </div>
                        {destinationOptions.length>0 && !readOnly && destination &&
                                <DestinationOptions
                                    isInMap = {false}
                                    setDestination = {setDestination}
                                    setCoordinates = {setCoordinates}
                                    destinationOptions = {destinationOptions}
                                    setDestinationOptions = {setDestinationOptions}
                                    className="optionList"
                                />
                            }
                    </div>
                    <div className='DetailsContainer'>
                        <div className='editorContainer'>

                            <EditorJs readOnly={readOnly} editMode={editMode} noteId={noteId} editorData={editorData}
                                      setEditorData={setEditorData}/>

                        </div>
                    </div>
                    {readOnly &&
                        <div className="left-fixed-buttons-in-notes">
                            <div className="like-note-container left-fixed-button-container">
                                <div className="like-note-icon left-fixed-button-icon" onClick={handleLikeClick}>
                                    {liked?
                                        <ThumbUpAltIcon className="thumb-like-on left-fixed-button-svg"/>
                                        : <ThumbUpOffAltIcon className="thumb-like-off left-fixed-button-svg" />}
                                </div>
                            </div>

                            <div className="share-note-container left-fixed-button-container">
                                <div className="share-note-icon left-fixed-button-icon" onClick={handleShareClick}>
                                    <ReplyOutlinedIcon className="left-fixed-button-svg"/>
                                </div>
                            </div>
                            {coordinates.length !== 0 &&
                                <div className="locate-note-container left-fixed-button-container">
                                    <div className="locate-note-icon left-fixed-button-icon" onClick={handleLocateClick}>
                                        <MyLocationOutlinedIcon className="left-fixed-button-svg"/>
                                    </div>
                                </div>
                            }

                        </div>
                    }
                    {readOnly &&
                        <TravelNoteComments
                            localUserId={localUserId}
                            noteId={noteId}
                            // comments={comments}
                        />
                    }
                </div>
            </div>
        </div>)
}