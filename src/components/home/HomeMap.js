import '../../styles/HomeMap.css'
import React, {useState, useEffect, useRef} from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import L, { Icon } from "leaflet";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import myFakeData from '../../fake-data/travelNotes.json';
import EditFormField from "../form-field/EditFormField";
import {InputAdornment} from "@mui/material";
import RatingField from "../form-field/RatingField";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import {api_note} from "../../helpers/api";
import HeaderBar from "../navigation-tools/HeaderBar";

import "leaflet/dist/leaflet.css";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import autoCompleteDestinationOptions from "../utils/autoCompleteDestinationOptions";
import DestinationOptions from "../utils/DestinationOptions";


const noteMarker = new Icon({
    iconUrl: '/noteMarker.svg',
    iconSize: [100,100]
})


export default function HomeMap() {
    // e,g., http://localhost:3000/home?lat=47.37&lng=8.56

    const queryParameters = new URLSearchParams(window.location.search)
    const lat_str = queryParameters.get("lat")
    const lng_str = queryParameters.get("lng")
    const lat = Number(lat_str)
    const lng = Number(lng_str)

    const [notes, setNotes] = useState(myFakeData)
    const [activeNote, setActiveNote] = useState(null)
    const [style, setStyle] = useState("mapColumn")

    const [coordinates, setCoordinates] = useState([])
    const [destination, setDestination] = useState("")
    const [destinationOptions, setDestinationOptions] = useState([])

    const mapObject = useRef(null)

    let centerPosition = [47.37, 8.55]; // UZH [47.37430028227907, 8.550981197860574]
    if(lat_str && lng_str && !isNaN(lat) && !isNaN(lng)){ // need to check all str and number because of Number()
        centerPosition = [lat, lng]
    }else{
        // just change the url without refreshing page
        window.history.pushState({}, "", window.location.pathname);
    }

    useEffect(() => {
        async function fetchData(){
            api_note.get(`/notes`).then((notes) => {
                let notesWithCoordinates = notes.data.filter(note => note.coordinates !== null && note.coordinates.length !== 0)
                setNotes(notesWithCoordinates)
            })
        }
        fetchData().then().catch((err) => console.log(err))
    },[])



    function handleClickDetails(){
        window.location.href = `/travel-notes/${activeNote.noteId}`
    }


    useEffect(() => {
        if (!mapObject.current) return;

        L.easyButton("fa-location-arrow", () => {
            mapObject.current.locate().on("locationfound", function (e) {
                mapObject.current.flyTo(e.latlng, mapObject.current.getZoom());
            });
        }).addTo(mapObject.current);
    }, [mapObject.current]);

    useEffect(() => {
        autoCompleteDestinationOptions(destination, setDestinationOptions)
    }, [destination])

    return (
        <div>
            <HeaderBar/>
            <div className={style}>
                <div className="map-search-box" >
                    <EditFormField
                        readOnly={false}
                        placeholder="Search location..."
                        className="map-search-edit-field"
                        value={destination}
                        onChange={un => setDestination(un)}
                    />
                    <div className="map-search-icon-box">
                        <TravelExploreIcon className="map-search-icon"/>
                    </div>
                </div>

                <MapContainer center={centerPosition}
                              zoom={15}
                              scrollWheelZoom={true}
                              ref={mapObject}
                >

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MarkerClusterGroup chunkedLoading={true} maxClusterRadius={67}>
                        {notes.map(note => (
                            <Marker key={note.noteId}
                                    position={[note.coordinates[1], note.coordinates[0]]}
                                    eventHandlers={{
                                        click: () => {
                                            setActiveNote(note);
                                            setStyle("mapColumnHalf");
                                            // just change the url without refreshing page
                                            window.history.pushState({}, "",
                                                window.location.pathname + `?lat=${note.coordinates[1]}&lng=${note.coordinates[0]}`
                                            );
                                        },
                                    }}
                                    icon={noteMarker}
                            />
                        ))}
                    </MarkerClusterGroup>

                    {destinationOptions.length > 0 && destination && <DestinationOptions
                        isInMap = {true}
                        setDestination = {setDestination}
                        setCoordinates = {setCoordinates}
                        destinationOptions = {destinationOptions}
                        setDestinationOptions = {setDestinationOptions}
                        mapObject={mapObject}
                        className="map-search-options"
                    />}

                </MapContainer>
            </div>
            {activeNote &&
                <div className="sideBar">
                    <CancelPresentationIcon className="sideBarClose" onClick={() => {
                            setActiveNote(null);
                            setStyle("mapColumn");
                        }}
                    > close </CancelPresentationIcon>
                    <div className="noteTitleSideBar">{activeNote.noteTitle}</div>
                    <div className='IndicatorContainerSideBar'>
                        <div id='indicator1' className="indicatorItemSideBar">
                            <div className="indicatorLabel"> 🗓 Travel Date: </div>
                            <EditFormField
                                readOnly={true}
                                value={activeNote.date}
                                className="edit-field"
                            />
                        </div>
                        <div id='indicator2' className="indicatorItemSideBar">
                            <div className="indicatorLabel"> 🔢 Duration: </div>
                            <EditFormField
                                readOnly={true}
                                value={activeNote.duration}
                                endAdornment={<InputAdornment position="end">(days)</InputAdornment>}
                                className="edit-field"
                            />
                        </div>
                        <div id='indicator4' className="indicatorItemSideBar">
                            <div className="indicatorLabel"> 💰 Expense: </div>
                            <EditFormField
                                readOnly={true}
                                value={activeNote.expense}
                                endAdornment={<InputAdornment position="end">(CHF)</InputAdornment>}
                                className="edit-field"
                            />
                        </div>
                        <div id='indicator5' className="indicatorItemSideBar">
                            <div className="indicatorLabel"> 👬 No. of Travelers: </div>
                            <EditFormField
                                readOnly={true}
                                value={activeNote.numTravelers}
                                className="edit-field"
                            />
                        </div>
                        <div id='indicator6' className="indicatorItemSideBar">
                            <div className="indicatorLabel"> 🎯 Target Group: </div>
                            <EditFormField
                                readOnly={true}
                                value={activeNote.targetGroup}
                                className="edit-field"
                            />
                        </div>
                        <div id='indicator3' className="indicatorItemSideBar">
                            <div className="indicatorLabel"> 💯 Rating: </div>
                            <RatingField
                                readOnly={true}
                                value={activeNote.rating}
                                className="rating-field-sidebar"
                                disabled={true}
                            />
                        </div>
                        <div id='indicator7' className="indicatorItemSideBar">
                            <div className="locationLabelDestinationSideBar"> 📍 Destination: </div>
                            <EditFormField
                                readOnly={true}
                                value={activeNote.destination}
                                className="location-edit-field-side-bar"
                            />
                        </div>
                    </div>
                    <div onClick={handleClickDetails} className="sideBarDetailsButton"> DETAILS 🔍</div>
                </div>}
        </div>
    )
}