import AddMenuAndAside from './AddMenuAndAside'
import ProfilePictures from './ProfilePictures';
import FollowersAndFollowing from './FollowersAndFollowing';
import RenderPersonalOrOtherProfile from './RenderPersonalOrOtherProfile';
import { useEffect } from 'react';

function Profile() {

    return(
        <div id='profile'>
            <ProfilePictures />
            <RenderPersonalOrOtherProfile />
            <div id='user-info'>

            </div>
            <FollowersAndFollowing />
            <div id='user-tweets'>

            </div>
        </div>
    )
}

export default AddMenuAndAside(Profile);

