import React, {useEffect, useState} from "react";
import '../../styles/EditProfile.css'
import {Link} from "react-router-dom";
import {Input} from 'antd';
import Axios from "axios";
import {api, handleError} from "../../helpers/api";


const {TextArea} = Input;
const myUserId = localStorage.getItem('id');
const ProfileEdition: React.FC = () => {

    const [username, setUsername] = useState("");
    const [intro, setIntro] = useState("");
    const [imageLink, setImageLink] = useState("https://res.cloudinary.com/dgnzmridn/image/upload/v1650889351/xnqp6ymq1ro6rm82onbj.jpg")
    const [loading, setLoading] = useState(false);

    const userId = localStorage.getItem("id");

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users/' + myUserId);
                setUsername(response.data.username);
                setIntro(response.data.intro);
                setImageLink(response.data.imageLink);

            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData().then().catch((err) => console.log(err))
    }, []);

    function AvatarUpload() {
        const UploadImage = (event) => {
            let ImageSelected = event.target.files[0];
            const formData = new FormData();
            formData.append("file", ImageSelected);
            formData.append("upload_preset", "kkluslzq");
            setLoading(true);
            Axios.post("https://api.cloudinary.com/v1_1/dgnzmridn/image/upload", formData
            ).then((response) => {
                    let newImageLink = response.data['secure_url'].toString();
                    setImageLink(newImageLink);
                    setLoading(false);
                }
            )
        }
        return (
            <div className="avatarUploadContainer">
                <div>Select your avatar</div>
                <div>
                    <label className="avatarChange">
                        <input type="file"
                               onChange={(event) => {
                                   UploadImage(event)
                               }
                               }/>
                        Choose file
                    </label>
                </div>
                <div>
                    {loading ? (<b>Loading</b>) : <img src={imageLink} className="profileImage" alt="profileImage"/>}
                </div>
            </div>
        )

    }

    const doSubmit = (e) => {
        try {
            e.preventDefault();
            const requestBody = JSON.stringify({userId, username, intro, imageLink});
            api.put(`/users/${userId}`, requestBody).then().catch((err) => console.log(err))

            // submit successfully worked --> navigate to his/her own profile
            window.location.href = `/users/${userId}`;

        } catch (error) {
            alert(`Something went wrong during the edit: \n${handleError(error)}`);
        }
    };

    return (
        <div>
            <form className={"editProfileForm"}
                  style={{width: "400px", margin: "0 auto", height: "100vh"}}>
                <div className={"formColor"}/>
                <h2 className="titleEdit">Person info</h2>
                <div>
                    <AvatarUpload/>
                </div>
                <label className="label" htmlFor={"username"}>Username</label>
                <input className="input" type="text" id="username" value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
                <label className="label" htmlFor={"intro"}>Introduction</label>
                <TextArea rows={3} className="inputIntro" type={"intro"} id={"intro"} value={intro}
                          onChange={(e) => setIntro(e.target.value)}/>
                <div className={"buttonContainer"}>
                    <button className={"summitButton"} onClick={doSubmit}>Summit</button>
                </div>
                <p className={"cancel"} style={{textAlign: "center", cursor: "pointer"}}><Link
                    to={`/users/${myUserId}`}>cancel</Link></p>
            </form>
        </div>
    )
};

export default ProfileEdition;