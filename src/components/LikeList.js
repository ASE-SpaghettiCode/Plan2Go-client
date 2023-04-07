import {React, useState} from "react";
import {useEffect} from "react";
import {api,api_note, handleError} from "../helpers/api";
import '../styles/Profile.css';


export default function MyLikeList(){
    const path = window.location.pathname;
    const userID=path.substring(path.lastIndexOf('/')+1);
    const [likedNotesId,setLikedNotesId]= useState([]);
    const [likedNotes, setLikedNotes]=useState({
        noteId:"",
        noteTitle:"",
        date:"",
        coverImage:"",
        }
    );
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
        fetchData();
    },[]);

    //console.log(likedNotesId);

    useEffect(()=>{
        async function fetchData(){
            const promises=likedNotesId.map((id)=>api_note.get('/notes/'+id));
            const responses=await Promise.all(promises);
            const likednotes=responses.map((response)=>response.data);

            setLikedNotesList(likednotes);
        }
        fetchData();
    },[likedNotesId]);

    console.log(likedNotesList);
    const likedListItems = likedNotesList.map((likenoteitem) => {
            return (
                <div className="postcard" key={likenoteitem.date}>
                    <img src={likenoteitem.coverImage}/>
                    <h1>{likenoteitem.noteTitle}</h1>
                    <h4>{likenoteitem.date}</h4>
                </div>)
        }
    )
    return(
        <div className="postcontainer">
            {likedListItems}
        </div>
    )
}