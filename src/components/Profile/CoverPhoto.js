import { useContext, useEffect, useRef, useState } from "react";
import { useChangeProfilePicture } from "../Sign_In_Page/useChangeProfilePicture";
import { ProfileContext } from "./profileContext";

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