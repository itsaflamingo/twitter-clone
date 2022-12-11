import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addTweet, tweetsSelector } from "./CreateTweetSlice";
import DisplayTweet from "./DisplayTweet";
import RetweetPopUp from "./RetweetPopUp";

export default function DisplayTweets() {
    
    const tweets = useSelector(tweetsSelector);
    const [showRetweetDiv, setShowRetweetDiv] = useState(false);    

    return (
        <div id='tweet-display'>
            {tweets.map((tweet, index) => {
                return (
                    <div className="tweet-wrapper" key={tweet.id}>
                        <DisplayTweet tweet={tweet} showRetweet={() => setShowRetweetDiv(index)} />                
                        {showRetweetDiv === index && <RetweetPopUp tweet={tweet} setShowRetweet={setShowRetweetDiv} />}
                    </div>
                )
            })}
        </div>
    )
}