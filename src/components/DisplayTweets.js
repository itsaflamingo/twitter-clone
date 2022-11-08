import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addTweet, tweetsSelector } from "./CreateTweetSlice";
import uniqid from 'uniqid';
import LikeCounter from "./LikeCounter";
import RetweetCounter from "./RetweetCounter";

export default function DisplayTweets() {
    
    const tweets = useSelector(tweetsSelector);

    return (
        <div id='tweet-display'>
            {tweets.map((tweet) => {
                return (<div className="tweet" key={uniqid()}>
                    {tweet}
                    <div>
                        <LikeCounter />
                        <RetweetCounter />
                    </div>
                </div>)
            })}
        </div>
    )
}