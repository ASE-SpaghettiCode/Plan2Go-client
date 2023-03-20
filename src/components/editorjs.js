import '../styles/TravelNoteCreation.css'
import React, {useState, useEffect, useRef} from "react";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image'
import Axios from "axios";



const EDITOR_HOLDER_ID = 'editorjs';

const EditorJs = (props) => {
    const ejInstance = useRef();
    const {editorData, setEditorData} = props


    // This will run only once
    useEffect(() => {
        return () => {
            if(!ejInstance.current){
                initEditor();
            }
            ejInstance.current = null;
        }
    }, [])

    const initEditor = () => {
        const editor = new EditorJS({
            holder: EDITOR_HOLDER_ID,
            logLevel: "ERROR",
            data: editorData,
            onReady: () => {
                ejInstance.current = editor;
            },
            onChange: async () => {
                // let content = await this.editorjs.saver.save();
                let content = await ejInstance.current.save()
                // Put your logic here to save this data to your DB
                setEditorData(content);
            },
            readOnly: props.readOnly,
            autofocus: true,
            tools: {
                header:Header,
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
                                // console.log(file)
                                const formData = new FormData;
                                formData.append("file",file);
                                formData.append("upload_preset","ml_default");

                                return Axios.post("https://api.cloudinary.com/v1_1/drlkip0yc/image/upload",formData
                                ).then((response)=>{
                                        // console.log(response)
                                        // console.log(response.data['secure_url']);
                                        let newPictureLocation=response.data['secure_url'].toString();
                                        // console.log({newPictureLocation});
                                        return newPictureLocation
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
    };

    return (
        <div className="MainPage">
            <div id={EDITOR_HOLDER_ID} className="EditorField"> </div>
        </div>
    );
}

export default EditorJs;
