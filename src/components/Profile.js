import AddMenuAndAside from './AddMenuAndAside'
import ProfilePictures from './ProfilePictures';
import FollowersAndFollowing from './FollowersAndFollowing';
import RenderPersonalOrOtherProfile from './RenderPersonalOrOtherProfile';
import { useEffect } from 'react';
import DisplayUserInfo from './DisplayUserInfo';

function Profile() {

    

    return(
        <div id='profile'>
            <ProfilePictures />
            <RenderPersonalOrOtherProfile />
            <DisplayUserInfo />
            <FollowersAndFollowing />
            <div id='user-tweets'>

            </div>
        </div>
    )
}

export default AddMenuAndAside(Profile);

