import AddMenuAndAside from "../AddMenuAndAside";
import CreateTweet from './CreateTweet'
import DisplayTweets from "../DisplayTweet/DisplayTweets";
import { useState, useEffect } from "react";
import { tweetsSelector } from "./createTweetSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../Sign_In_Page/SignInPgSlice"
import { userAddTweets } from "./userTweetsSlice";
import useGetTweetsFromDatabase from "./useGetTweetsFromDatabase";
import { userTweetsSelector } from "./userTweetsSlice";
import Search from "../Search";

const filterTweets = (input, allTweets) => allTweets.filter((tweet) => 
    tweet.text === input || 
    tweet.name.toLowerCase() === input.toLowerCase() || 
    tweet.handle.toLowerCase() === input.toLowerCase());

const filterUserTweets = (tweets, user) => tweets.filter(tweet => tweet.id === user.personalInfo.id);

function Dashboard() {

    const allTweets = useSelector(tweetsSelector);
    const user = useSelector(selectUser);
    const userTweets = useSelector(userTweetsSelector);

    const [showTweets, setShowTweets] = useState(true);
    const [tweets, setTweets] = useState([]);

    const dispatch = useDispatch();

    const addToUserTweets = (filteredTweets) => dispatch(userAddTweets(filteredTweets));
    
    useGetTweetsFromDatabase();

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
        if(tweets.length === 0 || userTweets.length > 0) return;
        addToUserTweets(filterUserTweets(tweets, user));
    }, [tweets])

    const onSubmit = (e, input) => {
        e.preventDefault();

        setTweets(filterTweets(input, allTweets))
    }

    return (
        <div id='dashboard'>
            <div id='header'>
                <h2>Home</h2>
            </div>
            <Search onSubmit={onSubmit} />
            <CreateTweet retweet={[]} showRetweet={null} retweetAriaLabel='create tweet input' tweetButtonAriaLabel='create tweet submit' />
            {showTweets && (<DisplayTweets tweets={tweets} />)}
        </div>
    )
}

export default AddMenuAndAside(Dashboard);

