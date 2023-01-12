import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, editUser } from "../Sign_In_Page/SignInPgSlice";
import { ProfileContext } from "./profileContext";
import useToggleFollowButton from "./useToggleFollowButton";

export default function FollowButton() {

    const userFollowing = useSelector(selectUser);
    const { user, updateUser } = useContext(ProfileContext);

    const checkIfUser = (user) => {
        if(user === undefined) return [];
        return user.personalInfo.profileInfo.followers;
    }
    
    // Refers to userFollowing's following array
    const [following, setFollowing] = useState(userFollowing.personalInfo.profileInfo.following);
    // Refers to user's followers array
    const [followers, setFollowers] = useState(checkIfUser(user));

    const dispatch = useDispatch();
    const buttonName = useToggleFollowButton({followers, userFollowing});

    useEffect(() => {
        if(user === undefined || (followers.length === user.personalInfo.profileInfo.followers && following.length === userFollowing.personalInfo.profileInfo.following.length)) return;
        setFollowers(user.personalInfo.profileInfo.followers);
        setFollowing(userFollowing.personalInfo.profileInfo.following);
    }, [user])

    useEffect(() => {
        if(followers.length === user.personalInfo.profileInfo.followers.length) return;
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
        if(following.length === userFollowing.personalInfo.profileInfo.following.length) return;
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

    const filterArray = (array, array1) => array.filter(obj => obj.name !== array1.personalInfo.name);

    const returnModifiedObject = (user) => {
        // Copy parts of personalInfo into new object, add to following array
        return Object.assign({}, user.personalInfo, {
            handle: user.personalInfo.handle,
            name: user.personalInfo.name,
            profileInfo: {
                profilePicture: user.personalInfo.profileInfo.profilePicture
            }
        })
    }

    const editFollowers = () => {
        // If userFollowing is within followers array, filteredArray.length > 0
        const filteredArray = filterArray(followers, userFollowing);
        // If userFollowing is within followers array and button == following, this means they want to unfollow
        if(filteredArray.length < user.personalInfo.profileInfo.followers.length && buttonName === 'Following') {
            // unfollow
            return setFollowers(filteredArray);
        }
        const newObj = returnModifiedObject(userFollowing);

        // If user is not in followers array
        setFollowers(user.personalInfo.profileInfo.followers.concat({...newObj}))
    };

    const editFollowing = () => {
        // If user is within following array, will return index, else -1
        const filteredArray = filterArray(following, user);
        const followingArray = userFollowing.personalInfo.profileInfo.following;
        // If user is within followers array and button == following, this means they want to unfollow
        if(filteredArray.length < followingArray.length && buttonName === 'Following') {
            return setFollowing(filteredArray);
        }

        const newObj = returnModifiedObject(user);

        setFollowing(followingArray.concat({...newObj}));
    }
    

    return (
        <button className="follow-btn"
        onClick={() => follow()}>{buttonName}</button>
    )
}