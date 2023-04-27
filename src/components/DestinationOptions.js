import List from "@mui/material/List";
import getDisplayName from "./utils/getDisplayName";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import React from "react";

export default function DestinationOptions(
    {isInMap, setDestination, setCoordinates, destinationOptions, setDestinationOptions, mapObject, className}
) {

    function handleClickOption(item){
        if(isInMap){
            setDestination(getDisplayName(item)) // display name
            setCoordinates(item?.geometry.coordinates)
            setDestinationOptions([])
            mapObject.current.flyTo([item?.geometry.coordinates[1], item?.geometry.coordinates[0]])
        }else{
            setDestination(getDisplayName(item)) // display name
            setCoordinates(item?.geometry.coordinates)
            setDestinationOptions([])
        }
    }


    return (
        <nav className={className}>
            <List>
                {destinationOptions.map((item) => {
                    return (
                        <div key={item?.properties.osm_id}>
                            <ListItem disablePadding
                                      onClick={() => handleClickOption(item)}>
                                <ListItemButton>
                                    {!isInMap && <ListItemIcon> 📍 </ListItemIcon>}
                                    <ListItemText primary={getDisplayName(item)}/>
                                </ListItemButton>
                            </ListItem>
                            < Divider/>
                        </div>
                    )
                })}
            </List>
        </nav>
    )
}