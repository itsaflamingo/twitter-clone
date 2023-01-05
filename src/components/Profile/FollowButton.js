import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../Sign_In_Page/SignInPgSlice";
import { ProfileContext } from "./profileContext";
import { useDispatch } from "react-redux";
import { editUser } from "../Sign_In_Page/SignInPgSlice";
import useToggleFollowButton from "./useToggleFollowButton";

export default function FollowButton() {

    const userFollowing = useSelector(selectUser);
    const { user, updateUser } = useContext(ProfileContext);
    
    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0);

    const dispatch = useDispatch();

    const buttonName = useToggleFollowButton(following);

    useEffect(() => {
        dispatch(editUser({
            ...userFollowing, 
            personalInfo: {
                ...userFollowing.personalInfo,
                profileInfo: { 
                    ...userFollowing.personalInfo.profileInfo,
                    following,
                }
            }
        }))
    }, [following]) 

    useEffect(() => {
        updateUser({
            ...user,
            personalInfo: {
                ...user.personalInfo,
                profileInfo: {
                    ...user.personalInfo.profileInfo,
                    followers,
                }
            }
        })
    }, [followers])

    const follow = () => {
        editFollowing();
        editFollowed();
    }

    const editFollowing = () => setFollowing(userFollowing.personalInfo.profileInfo.following + 1);
    

    const editFollowed = () => setFollowers(user.personalInfo.profileInfo.followers + 1);
    

    return (
        <button className="follow-btn"
        onClick={() => follow()}>{buttonName}</button>
    )
}