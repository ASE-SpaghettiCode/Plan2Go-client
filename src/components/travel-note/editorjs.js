import '../../styles/TravelNoteCreation.css'
import React, {useEffect, useRef} from "react";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image'
import Axios from "axios";
import {api_note} from "../../helpers/api";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";



const EDITOR_HOLDER_ID = 'editorjs';

const EditorJs = (props) => {
    const {readOnly, editMode, noteId, editorData, setEditorData} = props
    const ejInstance = useRef();

    // This will run only once
    useEffect(() => {
        return () => {
            if(!ejInstance.current){
                initEditor();
            }
            ejInstance.current = null;
        }
    }, [])

    function handleEditorConfig(data){
        const editor = new EditorJS({
            holder: EDITOR_HOLDER_ID,
            logLevel: "ERROR",
            data: data,
            onReady: () => {
                ejInstance.current = editor;
            },
            onChange: async () => {
                let content = await ejInstance.current.save()
                // Put your logic here to save this data to your DB
                setEditorData(content);
            },
            readOnly: readOnly,
            autofocus: true,
            tools: {
                header:Header,
                marker: Marker,
                checklist: CheckList,
                image: {
                    class: ImageTool,
                    config: {
                        uploader: {
                            /**
                             * Upload file to the server and return an uploaded image data
                             * @param {File} file - file selected from the device or pasted by drag-n-drop
                             * @return {Promise.<{success, file: {url}}>}
                             */
                            uploadByFile(file){
                                // my own upload logic here
                                const formData = new FormData();
                                formData.append("file",file);
                                formData.append("upload_preset","ml_default");

                                return Axios.post("https://api.cloudinary.com/v1_1/drlkip0yc/image/upload",formData
                                ).then((response)=>{
                                        return response.data['secure_url'].toString(); // newPictureLocation
                                    }
                                ).then((newPictureLocation) => {
                                    return {
                                        success: 1,
                                        file: {
                                            url: newPictureLocation.toString(),
                                            // any other image data you want to store, such as width, height, color, extension, etc
                                        }
                                    };
                                })
                            },
                        }
                    }
                }
            }
        });
        return editor;
    }

    const initEditor = () => {
        if(readOnly || editMode){
            api_note.get(`/notes/${noteId}`)
                .then((response) => response.data.editorData)
                .then((fakeData) => {
                    handleEditorConfig(fakeData)
                }
            )
        }else{
            handleEditorConfig(editorData)
        }


    };

    return (
        <div className="MainPage">
            <div id={EDITOR_HOLDER_ID} className="EditorField"> </div>
        </div>
    );
}

export default EditorJs;
