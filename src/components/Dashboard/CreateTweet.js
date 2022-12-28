import TweetInput from "../TweetInput";
import { selectUser } from '../Sign_In_Page/SignInPgSlice'
import { addTweet } from "./CreateTweetSlice";
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { storeTweets } from "../storeInCloud";
import uniqid from 'uniqid'
import CreateTweetOptions from "./CreateTweetOptions";
import getDateTime from "../getDateTime";
import { userAddTweets } from "./userTweetsSlice";


export default function CreateTweet(props) {

    const { retweet, showRetweet } = props;

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    // Input hold the onChange handler for tweet. 
    const [input, setInput] = useState('');
    // When submit button clicked, input gets placed in tweet.
    const [tweet, setTweet] = useState({
        name: user.displayName,
        date: '',
        text: '',
        image: '',
        likes: 0,
        retweets: 0,
        words: 0,
        comments: [],
        retweet: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setTweet({
            ...tweet, 
            text: input,
            date: getDateTime().getDateAndTime(),
            id: uniqid(),
            retweet
        })
        setInput('');
    }

    useEffect(() => {
        if(tweet.text === '') return;
        if(showRetweet !== null) showRetweet(() => false);
        // When new tweet added, it is added to state tweets array
        dispatch(addTweet(tweet));
        dispatch(userAddTweets(tweet));
        storeTweets(tweet);
        setTweet({
            ...tweet,
            text: '',
            date: '',
            retweet: []
        })
    }, [tweet])

    return(
        <div id='create-tweet'>
            <TweetInput setInput={setInput} input={input} />
            <div id='tweet-add-ons'>
                <CreateTweetOptions handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}