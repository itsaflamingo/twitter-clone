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
    
    // Refers to userFollowing's following array
    const [following, setFollowing] = useState([]);
    // Refers to user's followers array
    const [followers, setFollowers] = useState([]);

    const dispatch = useDispatch();

    const buttonName = useToggleFollowButton(followers, userFollowing);

    useEffect(() => {
        if(user === undefined) return;
        setFollowers(user.personalInfo.profileInfo.followers);
        setFollowing(userFollowing.personalInfo.profileInfo.following);
    }, [user])

    useEffect(() => {
        if(('followers' in followers && followers === user.personalInfo.followers) || followers.length === 0) return;
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

    useEffect(() => {
        if(('following' in following && following === userFollowing.personalInfo.following) || following.length === 0) return;
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

    const follow = () => {
        editFollowers();
        editFollowing();
    }

    const editFollowers = () => setFollowers(user.personalInfo.profileInfo.followers.concat({...userFollowing.personalInfo}));

    const editFollowing = () => setFollowing(userFollowing.personalInfo.profileInfo.following.concat({...user.personalInfo}));
    

    return (
        <button className="follow-btn"
        onClick={() => follow()}>{buttonName}</button>
    )
}