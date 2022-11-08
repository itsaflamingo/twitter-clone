import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addTweet, tweetsSelector } from "./CreateTweetSlice";

export default function DisplayTweets() {
    
    const tweets = useSelector(tweetsSelector);

    return (
        <div id='tweet-display'>
            {tweets.map((tweet) => {
                <div>
                    
                </div>
            })}
        </div>
    )
}