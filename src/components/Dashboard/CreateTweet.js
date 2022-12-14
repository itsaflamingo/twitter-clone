import TweetInput from "../TweetInput";
import { selectUser } from '../Sign_In_Page/SignInPgSlice'
import { addTweet, tweetsSelector } from "./CreateTweetSlice";
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { storeTweets } from "../storeInCloud";
import uniqid from 'uniqid'
import CreateTweetOptions from "./CreateTweetOptions";
import getDateTime from "../getDateTime";
import { userAddTweets } from "./userTweetsSlice";
import ProfilePicture from "../Profile/ProfilePicture";
import determineTweetOrderNumber from "./determineTweetOrderNumber";

const initialTweetState = (user) => {
    return {
        name: user.personalInfo.name,
        handle: `@${user.personalInfo.handle}`,
        picture: user.personalInfo.profileInfo.profilePicture,
        date: '',
        text: '',
        image: '',
        likes: 0,
        retweets: 0,
        words: 0,
        comments: [],
        retweet: [],
        spot: 0
    }
}

export default function CreateTweet(props) {

    const { retweet, showRetweet } = props;

    const tweets = useSelector(tweetsSelector);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    // Input hold the onChange handler for tweet. 
    const [input, setInput] = useState('');
    // When submit button clicked, input gets placed in tweet.
    const [tweet, setTweet] = useState(initialTweetState(user));

    const handleSubmit = (e) => {
        e.preventDefault();
        setTweet({
            ...tweet, 
            text: input,
            date: getDateTime().getOnlyDate(),
            id: uniqid(),
            spot: determineTweetOrderNumber(tweets),
            retweet
        })
        setInput('');
    }

    useEffect(() => {
        if(tweet.text === '') return;
        if(showRetweet !== null) showRetweet(() => false);
        // When new tweet added, it is added to state tweets array
        dispatch(addTweet(tweet));
        // It is also added to userTweets array
        dispatch(userAddTweets(tweet));
        // Tweet is stored in database
        storeTweets(tweet);
        // Reset tweet
        setTweet(initialTweetState(user));
    }, [tweet])

    return(
        <div id='create-tweet'>
            <div className="picture-create-tweet">
                <ProfilePicture tweetImage={user.personalInfo.profileInfo.profilePicture} />
                <TweetInput setInput={setInput} input={input} />
            </div>
            <div id='tweet-add-ons'>
                <CreateTweetOptions handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}