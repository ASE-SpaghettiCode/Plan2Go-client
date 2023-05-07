import React, {useState} from "react";
import {useEffect} from "react";
import {api,api_note, handleError} from "../../helpers/api";
import '../../styles/Profile.css';
import {useNavigate} from "react-router-dom";


export default function MyLikeList(){
    const navigate=useNavigate();
    const path = window.location.pathname;
    const userID=path.substring(path.lastIndexOf('/')+1);
    const [likedNotesId,setLikedNotesId]= useState([]);
    const [likedNotesList,setLikedNotesList]=useState([]);


    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await api.get(`/users/`+userID+`/likes`);
                //console.log(response.data);
                setLikedNotesId(response.data);
            }catch (error) {
                console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData().then().catch((err) => console.log(err))
    },[]);

    useEffect(()=>{
        async function fetchData(){
            const promises=likedNotesId.map((id)=>api_note.get('/notes/'+id));
            const responses=await Promise.all(promises);
            const likednotes=responses.map((response)=>response.data);

            setLikedNotesList(likednotes);
        }
        fetchData().then().catch((err) => console.log(err))
    },[likedNotesId]);

    const handleClickNotes=(props)=>{
        //window.location.href=`/travel-notes/`+props.noteId;
        navigate('/travel-notes/'+props.noteId);
    }

    const handleTimeFormat=(props)=>{
        const date = new Date(props);
        const createdDate=date.toLocaleString('en-GB',{year:"numeric",month:'long',day:'numeric'});
        return(
            createdDate
        );
    };

    const likedListItems = likedNotesList.map((likenoteitem) => {
            return (
                <div className="postcard" key={likenoteitem.date} onClick={()=>handleClickNotes(likenoteitem)}>
                    <img src={likenoteitem.coverImage} alt="coverImage"/>
                    <h1>{likenoteitem.noteTitle}</h1>
                    <h4>{handleTimeFormat(likenoteitem.createdTime)}</h4>
                </div>)
        }
    )
    return(
        <div className="postcontainer">
            {likedListItems}
        </div>
    )
}