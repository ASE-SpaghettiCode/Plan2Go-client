import React, {useState} from "react";
import '../../styles/EditProfile.css'
import {Link} from "react-router-dom";
import {api, handleError} from "../../helpers/api";


const userId = localStorage.getItem('id');

const PrivacyEdition: React.FC = () => {
    const [password, setPassword] = useState("");

    const doSubmit = async (e) => {
        try {
            e.preventDefault();
            const requestBody = JSON.stringify({userId, password});
            await api.put(`/users/password/${userId}`, requestBody);

            // submit successfully worked --> navigate to his/her own profile
            window.location.href = `/users/${userId}`;

        } catch (error) {
            alert(`Something went wrong during the edit: \n${handleError(error)}`);
        }
    };

    return (
        <div>
            <form className={"editPrivacyForm"} onSubmit={doSubmit}
                  style={{width: "400px", margin: "0 auto", height: "100vh"}}>
                <div className={"formColor"}/>
                <h2 className="titleEdit">Privacy</h2>
                <label className="label" htmlFor={"password"}>New Password</label>
                <input className="input" type={"password"} id={"password"} value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <div className={"buttonContainer"}>
                    <button className={"summitButton"} type={"submit"}>Confirm</button>
                </div>
                <p className={"cancel"} style={{textAlign: "center", cursor: "pointer"}}><Link
                    to={`/users/${userId}`}>cancel</Link></p>
            </form>
        </div>
    )
}
export default PrivacyEdition;