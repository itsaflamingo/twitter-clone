import { useContext } from 'react';
import { useChangeProfilePicture } from '../Sign_In_Page/useChangeProfilePicture'
import { ProfileContext } from './profileContext';

export default function ProfilePicture() {

    const user = useContext(ProfileContext);
    console.log(user);
    const picture = useChangeProfilePicture();

    return (
        <div className='user-photo'>
            <img className='profile-picture' src={picture} alt='profile'/>
        </div>
    )
}