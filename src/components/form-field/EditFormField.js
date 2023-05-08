import TextField from "@mui/material/TextField";
import React from "react";


const EditFormField = props => {
    const isOutlined = props.variant === "outlined"
    return ( !isOutlined?
        <TextField
            InputProps={{
                disableUnderline: true, // outlined and disableUnderline can throw warning
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
                    return props.onChange(Number(e.target.value))
                }
                return props.onChange(e.target.value)
            }}
        />:<TextField
                InputProps={{
                    endAdornment: props.endAdornment,
                    readOnly: props.readOnly
                }}
                id="my_edit_form"
                variant={props.variant}
                className={props.className}
                label={props.label}
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                multiline={props.multiline}
                minRows={props.minRows}
                onChange={e => {
                    if (props.type === 'number'){
                        return props.onChange(Number(e.target.value))
                    }
                    return props.onChange(e.target.value)
                }}
            />
    )
}

export default EditFormField;