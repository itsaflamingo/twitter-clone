import TweetInput from "./TweetInput";
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { storeTweets } from "../../firebase/manageDbTweets";
import uniqid from 'uniqid'
import CreateTweetOptions from "./CreateTweetOptions";
import getDateTime from "../../functions/getDateTime";
import { userAddTweets } from "../../redux/userTweetsSlice";
import { selectUser } from '../../redux/SignInPgSlice'
import { addTweet, tweetsSelector } from "../../redux/createTweetSlice";
import ProfilePicture from "../Profile/ProfilePicture";
import determineTweetOrderNumber from "../../functions/determineTweetOrderNumber";

const initialTweetState = (user) => {
    if(user.length === 0) return {};

    return {
        name: user.personalInfo.name,
        handle: `@${user.personalInfo.handle}`,
        picture: user.personalInfo.profileInfo.profilePicture,
        email: user.email,
        date: '',
        text: '',
        image: '',
        likes: 0,
        retweets: 0,
        words: 0,
        comments: [],
        retweet: [],
        spot: 0,
        likedBy: []
    }
}

export default function CreateTweet(props) {

    const { retweet, showRetweet, retweetAriaLabel, tweetButtonAriaLabel } = props;

    const tweets = useSelector(tweetsSelector);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    // Input hold the onChange handler for tweet. 
    const [input, setInput] = useState('');
    // When submit button clicked, input gets placed in tweet.
    const [tweet, setTweet] = useState(initialTweetState(user));
    const [charCount, setCharCount] = useState(280);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(input.length > charCount) return;
        setTweet({
            ...tweet, 
            text: input,
            date: getDateTime().getOnlyDate(),
            id: uniqid(),
            spot: determineTweetOrderNumber(tweets),
            retweet,
        })
        setInput('');
        setCharCount(280);
    }

    useEffect(() => {
        if(tweet.text === '' || user.length === 0) return;
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
                {user.length > 0 && (<ProfilePicture tweetImage={user.personalInfo.profileInfo.profilePicture} />)}
                <TweetInput setInput={setInput} input={input} ariaLabel={retweetAriaLabel} setChars={setCharCount} chars={charCount} />
            </div>
            <div id='tweet-add-ons'>
                <CreateTweetOptions handleSubmit={handleSubmit} ariaLabel={tweetButtonAriaLabel} chars={charCount} />
            </div>
        </div>
    )
}