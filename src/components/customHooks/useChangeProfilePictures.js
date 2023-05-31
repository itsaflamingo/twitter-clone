import { useState, useEffect } from 'react'
import defaultPicture from '../../images/twitter-user-default.png'
import defaultCoverPhoto from '../../images/default-cover-photo.png'

function useChangeProfilePicture(props) {
    const { profile, cover } = props;

    const [profilePicture, setProfilePicture] = useState(defaultPicture);
    const [coverPhoto, setCoverPhoto] = useState(defaultCoverPhoto);

    useEffect(() => {
        if (!profile) {
            setProfilePicture(defaultPicture);
        } else {
            setProfilePicture(profile);
        }
    }, [profile])

    useEffect(() => {
        if (!cover) {
            setCoverPhoto(defaultCoverPhoto);
        } else {
            setCoverPhoto(cover);
        }
    }, [cover])

    return { profilePicture, coverPhoto };
}

export { useChangeProfilePicture };