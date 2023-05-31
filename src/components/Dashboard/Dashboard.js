import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser, selectUser } from "../../redux/SignInPgSlice"
import { userAddTweets } from "../../redux/userTweetsSlice";
import { userTweetsSelector } from "../../redux/userTweetsSlice";
import { tweetsSelector } from "../../redux/createTweetSlice";
import { usersSelector } from "../../redux/allUsersSlice";
import useGetTweetsFromDatabase from "../customHooks/useGetTweetsFromDatabase";
import Search from "./Search";
import Header from "./Header";
import AddMenuAndAside from "../Menu_and_Aside/AddMenuAndAside";
import CreateTweet from './CreateTweet'
import DisplayTweets from "../DisplayTweet/DisplayTweets";
import useAuth from "../customHooks/useAuth";
import checkIsUserInDatabase from "../../functions/checkIsUserInDatabase";

const filterTweets = (input, allTweets) => allTweets.filter((tweet) => 
    tweet.text === input || 
    tweet.name.toLowerCase() === input.toLowerCase() || 
    tweet.handle.toLowerCase() === input.toLowerCase());

const filterUserTweets = (tweets, user) => tweets.filter(tweet => tweet.id === user.personalInfo.id);

function Dashboard() {

    // Import redux variables
    const allTweets = useSelector(tweetsSelector);
    const user = useSelector(selectUser);
    const users = useSelector(usersSelector);
    const userTweets = useSelector(userTweetsSelector);
    const { signedInUser, isSignedIn } = useAuth();

    // Create showTweets and tweets states
    const [showTweets, setShowTweets] = useState(true);
    const [tweets, setTweets] = useState([]);

    const dispatch = useDispatch();

    // Update user tweets
    const addToUserTweets = (filteredTweets) => dispatch(userAddTweets(filteredTweets));
    
    useGetTweetsFromDatabase();

    useEffect(() => {
        if(users.length === 0) return;
        if(isSignedIn === true && user.length === 0) {
            const existingUser = checkIsUserInDatabase(signedInUser, users);
            dispatch(editUser({
                ...existingUser, 
                personalInfo: {
                    ...existingUser.personalInfo,
                }}))
        }
    }, [isSignedIn, users])

    useEffect(() => {
        if(allTweets.length === 0) return;
        setTweets(allTweets);
    }, [allTweets])

    useEffect(() => {
        if(tweets.length === 0) return;
        // Executes when returning after navigating to different page.
        setShowTweets(true);
    }, [tweets])

    useEffect(() => {
        if(tweets.length === 0 || userTweets.length > 0 || user.length === 0) return;
        addToUserTweets(filterUserTweets(tweets, user));
    }, [tweets])

    const onSubmit = (e, input) => {
        e.preventDefault();
        setTweets(filterTweets(input, allTweets))
    }

    return (
        <div id='dashboard'>
            <Header />
            <Search onSubmit={onSubmit} />
            <CreateTweet retweet={[]} showRetweet={null} retweetAriaLabel='create tweet input' tweetButtonAriaLabel='create tweet submit' />
            {showTweets && (<DisplayTweets tweets={tweets} />)}
        </div>
    )
}

export default AddMenuAndAside(Dashboard);

