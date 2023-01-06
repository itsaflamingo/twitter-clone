import { useState, useEffect } from 'react'
import defaultPicture from '../../images/twitter-user-default.png'
import defaultCoverPhoto from '../../images/default-cover-photo.png'

function useChangeProfilePicture(props) {

    const { profile, cover } = props;
     
    const [profilePicture, setProfilePicture] = useState(defaultPicture);
    const [coverPhoto, setCoverPhoto] = useState(defaultCoverPhoto);

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