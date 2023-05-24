import { useState } from "react";
import DisplayTweet from "./DisplayTweet";
import RetweetPopUp from "../Dashboard/RetweetPopUp";
import orderTweets from "../Dashboard/orderTweets";
import uniqid from 'uniqid';

export default function DisplayTweets(props) {
    
    // Pass tweets in as props rather than with useSelector to allow component reusability
    const { tweets } = props;
    const [showRetweetDiv, setShowRetweetDiv] = useState(false);
    const copyTweets = [...tweets];
    // Order tweets based on when they were created
    const orderedTweets = orderTweets(copyTweets, tweets);

    return (
        <div id='tweet-display'>
            {orderedTweets.map((tweet, index) => {
                return (
                    <div className="tweet-wrapper" key={uniqid()}>
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