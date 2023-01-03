import { useContext } from "react"
import { ProfileContext } from "./Profile/profileContext";

export default function FollowersAndFollowing() {

    const { user } = useContext(ProfileContext);

    return (
        <div id='followers-following'>
                <button>{user.personalInfo.profileInfo.followers} Followers</button>
                <button>{user.personalInfo.profileInfo.following} Following</button>
            </div>
    )
}