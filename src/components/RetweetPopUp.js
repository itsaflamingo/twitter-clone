import { useState, useEffect } from "react";
import CreateTweetOptions from "./CreateTweetOptions";
import DisplayTweet from "./DisplayTweet";
import TweetInput from "./TweetInput";
import getDate from "./getDate";
import { useDispatch } from "react-redux";
import { addTweet } from "./CreateTweetSlice";
import uniqid from 'uniqid';

export default function RetweetPopUp(props) {

    const { tweet, setShowRetweet } = props;
    const dispatch = useDispatch();

    const [input, setInput] = useState('');
    const [newTweet, setNewTweet] = useState({
        name: tweet.name,
        date: '',
        text: '',
        image: '',
        likes: 0,
        retweets: 0,
        words: 0,
        comments: [],
        retweet: []
    });

    useEffect(() => {
        if(newTweet.text === '') return;
        setInput('');
        // When new tweet added, it is added to state tweets array
        dispatch(addTweet(newTweet));
    }, [newTweet])

    const handleRetweetSubmit = (e) => {
        e.preventDefault();

        setNewTweet({
            ...newTweet,
            text: input,
            date: getDate(),
            retweet: newTweet.retweet.concat(tweet),
            id: uniqid()
            })

        console.log(newTweet);
        setShowRetweet('');
    }

    return (
        <div className='retweet-pop-up'>
            <TweetInput input={input} setInput={setInput} />
            <DisplayTweet tweet={tweet} />
            <CreateTweetOptions handleSubmit={handleRetweetSubmit} />
        </div>
    )
}