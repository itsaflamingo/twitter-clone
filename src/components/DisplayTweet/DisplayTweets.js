import { useState } from "react";
import DisplayTweet from "./DisplayTweet";
import RetweetPopUp from "../Dashboard/RetweetPopUp";

export default function DisplayTweets(props) {
    
    // Pass tweets in as props rather than with useSelector to allow component reusability
    const { tweets } = props;
    const [showRetweetDiv, setShowRetweetDiv] = useState(false);    

    return (
        <div id='tweet-display'>
            {tweets.map((tweet, index) => {
                return (
                    <div className="tweet-wrapper" key={tweet.id}>
                        <DisplayTweet 
                        tweet={tweet} 
                        showRetweet={() => setShowRetweetDiv(index)}
                        index={index} />                
                        {showRetweetDiv === index && 
                        <RetweetPopUp 
                        tweet={tweet} 
                        showRetweet={setShowRetweetDiv} />}
                    </div>
                )
            })}
        </div>
    )
}