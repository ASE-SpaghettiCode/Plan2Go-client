import Rating from '@mui/material/Rating';
import React from "react";


const RatingField = props => {
    return (
        <Rating
            id="my_rating_field"
            variant="standard"
            precision={0.5}
            className={props.className}
            placeholder={props.placeholder}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
        />
    );
};

export default RatingField;