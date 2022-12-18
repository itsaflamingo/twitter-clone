import { useChangeProfilePicture } from './useChangeProfilePicture'

export default function ProfilePicture() {

    const picture = useChangeProfilePicture();

    return (
        <div id='user-photo'>
            <img class='profile-picture' src={picture} alt='default profile'/>
        </div>
    )
}