import AddMenuAndAside from './AddMenuAndAside'
import ProfilePictures from './ProfilePictures';
import FollowersAndFollowing from './FollowersAndFollowing';


function Profile() {

    return(
        <div id='profile'>
            <ProfilePictures />
            <div id='user-info'>

            </div>
            <FollowersAndFollowing />
            <div id='user-tweets'>

            </div>
        </div>
    )
}

export default AddMenuAndAside(Profile);

