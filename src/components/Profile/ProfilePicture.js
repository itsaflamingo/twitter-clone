import { useContext, useEffect, useState } from 'react';
import { useChangeProfilePicture } from '../customHooks/useChangeProfilePictures'
import { ProfileContext } from '../contexts/profileContext';

export default function ProfilePicture(props) {

    const { tweetImage = '' } = props;
    const user = useContext(ProfileContext);
    const [value, setValue] = useState({profile: '', cover: ''});
    const picture = useChangeProfilePicture(value);

    useEffect(() => {
        if(tweetImage.length > 0) { 
            setValue({
                profile: tweetImage,
                cover: ''
            })
        }
    }, [])

    useEffect(() => {
        if (user === undefined) return;
        if('user' in user) {
            setValue({
                profile: user.user.personalInfo.profileInfo.profilePicture,
                cover: user.user.personalInfo.profileInfo.coverPhoto
            })
        }
    }, [user])

    return (
        <div className='user-photo'>
            <img className='profile-picture' src={picture.profilePicture} alt='profile'/>
        </div>
    )
}