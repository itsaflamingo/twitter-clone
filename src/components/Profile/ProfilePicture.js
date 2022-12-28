import { useChangeProfilePicture } from '../Sign_In_Page/useChangeProfilePicture'

export default function ProfilePicture() {

    const picture = useChangeProfilePicture();

    return (
        <div id='user-photo'>
            <img className='profile-picture' src={picture} alt='profile'/>
        </div>
    )
}