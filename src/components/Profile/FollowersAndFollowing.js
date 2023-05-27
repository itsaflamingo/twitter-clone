import { useContext } from "react"
import { ProfileContext } from "../Profile/profileContext";

export default function FollowersAndFollowing() {

    const { user } = useContext(ProfileContext);

    return (
        <div id='followers-following'>
                <button className='follow-display'>
                    <span className='follow-quantity'>{user.personalInfo.profileInfo.followers.length} </span>
                    <span className='follow-title'>Followers</span>
                </button>
                <button className='follow-display'>
                    <span className='follow-quantity'>{user.personalInfo.profileInfo.following.length} </span> 
                    <span className='follow-title'>Following</span>
                </button>
            </div>
    )
}