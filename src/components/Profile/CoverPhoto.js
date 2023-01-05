import { useContext, useEffect, useRef } from "react";
import { useChangeProfilePicture } from "../Sign_In_Page/useChangeProfilePicture";
import { ProfileContext } from "./profileContext";

export default function CoverPhoto() {

    const user = useContext(ProfileContext);
    let value = useRef({profile: '', cover: ''});
    const picture = useChangeProfilePicture(value.current);

    useEffect(() => {
        if (user === undefined) return;
        if('user' in user) {
            value.current = {
                profile: user.user.personalInfo.profileInfo.profilePicture,
                cover: user.user.personalInfo.profileInfo.coverPhoto
            };
        }
    }, [])

    return (
        <div className='cover-photo-container'>
            <img className='cover-photo' src={picture.coverPhoto} alt='profile'/>
        </div>
    )
}