import { useState, useEffect } from 'react'
import defaultPicture from '../../images/twitter-user-default.png'

function useChangeProfilePicture(props) {

    const { profile, cover } = props;
     
    const [profilePicture, setProfilePicture] = useState(defaultPicture);
    const [coverPhoto, setCoverPhoto] = useState('//:0');

    useEffect(() => {
        if(profile.length === 0) return;
        setProfilePicture(profile);
    }, [profile])

    useEffect(() => {
        if(cover.length === 0) return;
        setCoverPhoto(cover);
    }, [cover])

    return { profilePicture, coverPhoto };
}

export { useChangeProfilePicture };