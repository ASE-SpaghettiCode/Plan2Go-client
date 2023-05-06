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
            variant={props.variant ? props.variant : "standard"}
            className={props.className}
            label={props.label}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            multiline={props.multiline}
            minRows={props.minRows}
            onChange={e => {
                if (props.type === 'number'){
                    console.log("yes")
                    return props.onChange(Number(e.target.value))
                }
                console.log(props.type)
                return props.onChange(e.target.value)
            }}
        />
    );
};

export default EditFormField;