import { useContext } from "react";
import { ProfileContext } from "./profileContext";

export default function DisplayUserInfo() {

    // use context provided by Profile.js
    const { user } = useContext(ProfileContext);
    
    return (
        <div id='user-info'>
            <h2>{user.personalInfo.name}</h2>
            <p>{user.personalInfo.handle}</p>
            <p>{user.personalInfo.description}</p>
            <p>Joined {user.personalInfo.dateJoined}</p>
            </div>
    )
}