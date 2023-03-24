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
            disable={props.disable}
            onChange={e => props.onChange(Number(e.target.value))}
        />
    );
};

export default RatingField;