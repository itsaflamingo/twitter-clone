import { useContext } from "react"
import { ProfileContext } from "./Profile/profileContext";

export default function FollowersAndFollowing() {

    const { user } = useContext(ProfileContext);

    return (
        <div id='followers-following'>
                <button className='follow-display'>
                    <span class='follow-quantity'>{user.personalInfo.profileInfo.followers.length} </span>
                    <span class='follow-title'>Followers</span>
                </button>
                <button className='follow-display'>
                    <span class='follow-quantity'>{user.personalInfo.profileInfo.following.length} </span> 
                    <span class='follow-title'>Following</span>
                </button>
            </div>
    )
}