import AddMenuAndAside from '../AddMenuAndAside'
import ProfilePictures from './ProfilePictures';
import FollowersAndFollowing from '../FollowersAndFollowing';
import RenderPersonalOrOtherProfile from './RenderPersonalOrOtherProfile';
import { useEffect, useState } from 'react';
import DisplayUserInfo from './DisplayUserInfo';
import DisplayTweets from '../DisplayTweet/DisplayTweets';
import { useSelector } from 'react-redux';
import { userTweetsSelector } from '../Dashboard/userTweetsSlice';
import { selectUser } from "../Sign_In_Page/SignInPgSlice"
import { usersSelector } from '../Dashboard/allUsersSlice';
import { useLocation } from 'react-router-dom';
import { ProfileProvider } from './profileContext';
import { tweetsSelector } from '../Dashboard/CreateTweetSlice';


function Profile(props) {

    // Redux selectors
    const userTweets = useSelector(userTweetsSelector);
    const users = useSelector(usersSelector);
    const userSelector = useSelector(selectUser);
    const allTweets = useSelector(tweetsSelector);

    // User and tweets change based on profile click
    const [user, setUser] = useState(userSelector);
    const [tweets, setTweets] = useState(userTweets);
    
    // Getting value passed via useNavivate.
    const location = useLocation();

    useEffect(() => {
        if(location.state === user.personalInfo.name) return;

        const chosenUser = users.filter(_user => _user.user.personalInfo.name === location.state);
        setUser(chosenUser[0].user);
    }, [])

    useEffect(() => {
        changeUserTweets(allTweets, user);
    }, [user])

    const changeUserTweets = (tweets, user) => {
        const arr = tweets.filter(tweet => tweet.name === user.personalInfo.name);
        setTweets(arr);
    }

    return(
        <ProfileProvider value={user}>
            <div id='profile'>
                <ProfilePictures />
                <RenderPersonalOrOtherProfile />
                <DisplayUserInfo />
                <FollowersAndFollowing />
                <DisplayTweets tweets={tweets} />
            </div>
        </ProfileProvider>
    )
}

export default AddMenuAndAside(Profile);

