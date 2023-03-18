import '../styles/HomeMap.css'
import React, {useState} from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, ZoomControl } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Icon } from "leaflet";
import myFakeData from '../fakeData/travelNotes.json';

const myMarker = new Icon({
    iconUrl: '/myMarker.svg',
    iconSize: [100,100]
})


export default function HomeMap() {
    const [activeNote, setActiveNote] = useState(null)
    const [style, setStyle] = useState("mapColumn")
    const centerPosition = [47.37, 8.55]; // UZH [47.37430028227907, 8.550981197860574]

    function handleClick(e){
        const { lat, lng } = e.latlng;
        console.log(lat, lng);
    }

    return (
        <div>
            <div className={style}>
                <MapContainer center={centerPosition} zoom={15} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MarkerClusterGroup chunkedLoading={true} maxClusterRadius={67}>
                        {myFakeData.travelNotes.map(note => (
                            <Marker key={note.note_id}
                                    position={note.coordinates}
                                    eventHandlers={{
                                        click: () => {
                                            console.log("marker clicked");
                                            setActiveNote(note);
                                            setStyle("mapColumnHalf");
                                        },
                                    }}
                                    icon={myMarker}
                            />
                        ))}
                    </MarkerClusterGroup>
                </MapContainer>
            </div>
            {activeNote &&
                <div className="sideBar">
                    <p onClick={() => {
                            setActiveNote(null);
                            setStyle("mapColumn");
                        }}
                    > close </p>
                    <h1> Nice {activeNote.note_title}</h1>
                </div>}
        </div>
    )
}