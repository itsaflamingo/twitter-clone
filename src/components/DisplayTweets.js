import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addTweet, tweetsSelector } from "./CreateTweetSlice";
import uniqid from 'uniqid';
import LikeCounter from "./LikeCounter";
import RetweetCounter from "./RetweetCounter";

export default function DisplayTweets() {
    
    const [tweets, setTweets] = useState([]);
    const unmodifiableTweets = useSelector(tweetsSelector);
    
    console.log(unmodifiableTweets);

    return (
        <div id='tweet-display'>
            {tweets.map((tweet) => {
                return (<div className="tweet" key={uniqid()}>
                    <div className="user-name">{tweet.name}</div>
                    {tweet.text}
                    <div className="tweet-btns">
                        <LikeCounter tweet={tweet} />
                        <RetweetCounter />
                        {tweet.date}
                    </div>
                </div>)
            })}
        </div>
    )
}