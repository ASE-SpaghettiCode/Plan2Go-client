import TextField from "@mui/material/TextField";
import React from "react";


const EditFormField = props => {
    return (
        <TextField
            InputProps={{
                disableUnderline: true,
                endAdornment: props.endAdornment,
                readOnly: props.readOnly
            }}
            id="my_edit_form"
            variant="standard"
            className={props.className}
            label={props.label}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
        />
    );
};

export default EditFormField;