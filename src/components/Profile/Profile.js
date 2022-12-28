import AddMenuAndAside from '../AddMenuAndAside'
import ProfilePictures from './ProfilePictures';
import FollowersAndFollowing from '../FollowersAndFollowing';
import RenderPersonalOrOtherProfile from './RenderPersonalOrOtherProfile';
import { useEffect } from 'react';
import DisplayUserInfo from '../DisplayUserInfo';
import DisplayTweets from '../DisplayTweet/DisplayTweets';
import { useSelector } from 'react-redux';
import { userTweetsSelector } from '../Dashboard/userTweetsSlice';

function Profile() {

    const userTweets = useSelector(userTweetsSelector);

    return(
        <div id='profile'>
            <ProfilePictures />
            <RenderPersonalOrOtherProfile />
            <DisplayUserInfo />
            <FollowersAndFollowing />
            <DisplayTweets tweets={userTweets} />
        </div>
    )
}

export default AddMenuAndAside(Profile);

