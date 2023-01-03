import AddMenuAndAside from '../AddMenuAndAside'
import ProfilePictures from './ProfilePictures';
import FollowersAndFollowing from '../FollowersAndFollowing';
import RenderPersonalOrOtherProfile from './RenderPersonalOrOtherProfile';
import { useEffect, useReducer, useState } from 'react';
import DisplayUserInfo from './DisplayUserInfo';
import DisplayTweets from '../DisplayTweet/DisplayTweets';
import { useDispatch, useSelector } from 'react-redux';
import { userTweetsSelector } from '../Dashboard/userTweetsSlice';
import { selectUser } from "../Sign_In_Page/SignInPgSlice"
import { editUsers, usersSelector } from '../Dashboard/allUsersSlice';
import { useLocation } from 'react-router-dom';
import { ProfileProvider } from './profileContext';
import { tweetsSelector } from '../Dashboard/CreateTweetSlice';

function Profile() {

    // Redux selectors
    const userTweets = useSelector(userTweetsSelector);
    const users = useSelector(usersSelector);
    const userSelector = useSelector(selectUser);
    const allTweets = useSelector(tweetsSelector);
    const dispatch = useDispatch();

    // User and tweets change based on profile click
    const [user, setUser] = useState(userSelector);
    const [tweets, setTweets] = useState(userTweets);
    
    // Getting value passed via useNavivate.
    const location = useLocation();

    useEffect(() => {
        if(location.state === user.personalInfo.name) return;
        setUser(changeUser(users, location)[0].user);
    }, [])

    useEffect(() => {
        setTweets(changeUserTweets(allTweets, user));
        editAllUsers();
    }, [user])

    const changeUser = (users, location) => users.filter(user => user.personalInfo.name === location.state);

    const changeUserTweets = (tweets, user) => tweets.filter(tweet => tweet.name === user.personalInfo.name);

    const updateUser = (obj) => setUser(obj);

    const editAllUsers = () => {
        // Find which object in users array corresponds to current user
        const findUser = (_user) => _user.personalInfo.name === user.personalInfo.name;

        const index = users.findIndex(findUser);

        dispatch(editUsers(index, {
            ...user,
            personalInfo: {
                ...user.personalInfo,
                profileInfo: {
                    ...user.personalInfo.profileInfo
                }
            }
        }))
    }

    return(
        <ProfileProvider value={{user, updateUser}}>
            <div id='profile'>
                <ProfilePictures />
                <RenderPersonalOrOtherProfile userName={location.state} />
                <DisplayUserInfo />
                <FollowersAndFollowing />
                <DisplayTweets tweets={tweets} />
            </div>
        </ProfileProvider>
    )
}

export default AddMenuAndAside(Profile);

