import { useContext, useEffect, useState } from "react";
import { useChangeProfilePicture } from "../customHooks/useChangeProfilePictures";
import { ProfileContext } from "../contexts/profileContext";

export default function CoverPhoto() {

    const { user } = useContext(ProfileContext);
    const coverPhoto = user.personalInfo.profileInfo.coverPhoto;
    const profilePhoto = user.personalInfo.profileInfo.profilePicture;

    const [pictures, setPictures] = useState({
        profile: null,
        cover: null
    })

    useEffect(() => {
        if(user.length === 0 || !user) return;
        setPictures({ 
            profile: profilePhoto,
            cover: coverPhoto
        })
    }, [user])
    
    const picture = useChangeProfilePicture(pictures);

    return (
        <div className='cover-photo-container'>
            <img className='cover-photo' src={picture.coverPhoto} alt='profile'/>
        </div>
    )
}