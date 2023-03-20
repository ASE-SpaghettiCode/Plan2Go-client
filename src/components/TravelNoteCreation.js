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


const fakeTitle_short = "10 Days in Italy - What A Trip!"
const DEFAULT_INITIAL_DATA = () => {
    return {
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
}


export default function TravelNoteCreation(){
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState(1);
    const [rating, setRating] = useState(0);
    const [expense, setExpense] = useState(0);
    const [numTravelers, setNumTravelers] = useState(1);
    const [targetGroup, setTargetGroup] = useState("");
    const [destination, setDestination] = useState("");

    const [destinationOptions, setDestinationOptions] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const [showOptions, setShowOptions] = useState(false);

    const [editorData, setEditorData] = useState(DEFAULT_INITIAL_DATA);
    // console.log(editorData)

    const [readOnly, setReadOnly] = useState(false);

    console.log(showOptions)
    // console.log(destination)
    // console.log(coordinates)

    // const NOMINATIM_BASE_URI = 'https://nominatim.openstreetmap.org/search?'
    const NOMINATIM_BASE_URI = 'https://photon.komoot.io/api/?' // must have "https:"

    function getDisplayName(item){
        let display_name = ''
        const proper_list = ['name', 'street', 'housenumber', 'locality', 'postcode', 'city', 'country']
        {proper_list.map((proper) => {
            if (item.properties[proper]){
                display_name += item.properties[proper] + ', '
            }

        })}
        return display_name.trim();
    }

    // search the coordinates when user typing (set time out 1s)
    useEffect(() => {
        if (!readOnly){
            const delayDebounceFn = setTimeout(() => {
                // Send Axios request here
                const params = {
                    q: destination,
                    limit: 5
                };
                const queryString = new URLSearchParams(params).toString();
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                }
                fetch(`${NOMINATIM_BASE_URI}${queryString}`, requestOptions)
                    .then((response) => {
                        return response.text()
                    })
                    .then((result) => {
                        const result_json = JSON.parse(result)
                        setDestinationOptions(result_json.features)
                        setShowOptions(true)
                    })
                    .catch((err) => console.log("getting coordinates err:", err))
            }, 1000)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [destination])


    return <div>
        <div className='CoverContainer'>
            {/*TODO: Should upload custom cover image*/}
            <img id='cover-landscape' src="./cover-landscape.jpg" />
        </div>
        <div className='CreationContainer'>
            <div className='AuthorContainer'>
                <img id='authorPhoto' src='./fake-profile-photo.jpg'/>
                <p id='authorName'> By: <span>Fake Duan Huiran </span> </p>
            </div>
            <div className='TitleContainer'>
                <p id='noteTitle'> {fakeTitle_short} </p>
            </div>

            <div className='IndicatorContainer'>
                <div id='indicator1' className="indicatorItem">
                    <div className="indicatorLabel"> 🗓 Travel Date: </div>
                    <EditFormField
                        value={date}
                        placeholder="dd.MM.yyyy"
                        className="edit-field"
                        onChange={un => setDate(un)}
                    />
                </div>
                <div id='indicator2' className="indicatorItem">
                    <div className="indicatorLabel"> 🔢 Duration: </div>
                    <EditFormField
                        value={duration}
                        placeholder=""
                        endAdornment={<InputAdornment position="end">(days)</InputAdornment>}
                        type='number'
                        className="edit-field"
                        onChange={un => setDuration(un)}
                    />
                </div>
                <div id='indicator3' className="indicatorItem">
                    <div className="indicatorLabel"> 💯 Rating: </div>
                    <RatingField
                        value={rating}
                        className="rating-field"
                        onChange={un => setRating(un)}
                    />
                </div>

                <div id='indicator4' className="indicatorItem">
                    <div className="indicatorLabel"> 💰 Expense: </div>
                    <EditFormField
                        value={expense}
                        placeholder="how much ..."
                        type='number'
                        endAdornment={<InputAdornment position="end">(CHF)</InputAdornment>}
                        className="edit-field"
                        onChange={un => setExpense(un)}
                    />
                </div>
                <div id='indicator5' className="indicatorItem">
                    <div className="indicatorLabel"> 👬 No. of Travelers: </div>
                    <EditFormField
                        value={numTravelers}
                        placeholder="how many ..."
                        type='number'
                        className="edit-field"
                        onChange={un => setNumTravelers(un)}
                    />
                </div>
                <div id='indicator6' className="indicatorItem">
                    <div className="indicatorLabel"> 🎯 Target Group: </div>
                    <EditFormField
                        value={targetGroup}
                        placeholder="suitable for ..."
                        className="edit-field"
                        onChange={un => setTargetGroup(un)}
                    />
                </div>
                <div id='indicator7' className="indicatorItem locationItem">
                    <div className="locationLabel"> 📍 Destination: </div>
                    <EditFormField
                        value={destination}
                        placeholder="Search and select the exact address to be displayed on the map..."
                        className="location-edit-field"
                        onChange={un => setDestination(un)}
                        readOnly={readOnly}
                    />
                    <TravelExploreIcon className="search-icon" />
                </div>

                {showOptions && <nav className='optionList'>
                    <List >
                        {destinationOptions.map((item) => {
                            const display_name = getDisplayName(item)
                            return (
                                <div key={item?.properties.osm_id}>
                                    <ListItem disablePadding
                                              onClick={() => {
                                                  setDestination(display_name)
                                                  setCoordinates(item?.geometry.coordinates)
                                                  setShowOptions(false)
                                              }}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                📍
                                            </ListItemIcon>
                                            <ListItemText primary={display_name} />
                                        </ListItemButton>
                                    </ListItem>
                                    < Divider/>
                                </div>
                        )})}
                    </List>
                </nav>}
            </div>
            <div className='DetailsContainer'>
                <div className='editorContainer'>
                    <EditorJs readOnly={readOnly} editorData={editorData} setEditorData={setEditorData}/>
                </div>
            </div>
        </div>
    </div>
}