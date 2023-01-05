import { useContext, useEffect, useRef } from 'react';
import { useChangeProfilePicture } from '../Sign_In_Page/useChangeProfilePicture'
import { ProfileContext } from './profileContext';

export default function ProfilePicture(props) {

    const { tweetImage = '' } = props;
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

    useEffect(() => {
        if(tweetImage.length > 0) {
            value.current = {
                profile: tweetImage,
                cover: ''
            }
            return;
        }
    }, [tweetImage])

    return (
        <div className='user-photo'>
            <img className='profile-picture' src={picture.profilePicture} alt='profile'/>
        </div>
    )
}