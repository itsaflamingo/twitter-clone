import HigherOrderComponent from "./HigherOrderComponent";
import CreateTweet from './CreateTweet'
import DisplayTweets from "./DisplayTweets";
import { useState } from "react";
import { tweetsSelector } from "./CreateTweetSlice";
import { useSelector } from "react-redux";

function Dashboard() {

    const tweets = useSelector(tweetsSelector);
    const [showTweets, setShowTweets] = useState(true);

    useState(() => {
        if(tweets.length === 0) return;
        setShowTweets(true);
    }, [tweets])

    return(
        <div id='dashboard'>
            <CreateTweet />
            {showTweets && (<DisplayTweets />)}
        </div>
    )
}

export default HigherOrderComponent(Dashboard);

