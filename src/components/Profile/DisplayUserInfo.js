import { useContext, useEffect } from "react";
import { ProfileContext } from "./profileContext";
import calendar from '../../images/icons8-calendar-100.png'

export default function DisplayUserInfo() {

    // use context provided by Profile.js
    const { user } = useContext(ProfileContext);
        
    return (
        <div id='user-info'>
            <h2>{user.personalInfo.name}</h2>
            <p>
                <span className="font-grey">
                    @{user.personalInfo.handle}
                    </span>
            </p>
            <p>{user.personalInfo.description}</p>
            <div className="date-joined">
                <p>
                    <span className="font-grey">
                        <img className='calendar' src={calendar} alt='calendar' />
                        Joined {user.personalInfo.dateJoined}
                        </span>
                </p>
            </div>
            </div>
    )
}