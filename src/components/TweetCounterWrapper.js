import { useState } from "react";

export default function TweetCounterWrapper(WrappedComponent) {
    return function Counter(props) {

        const [counter, setCounter] = useState(0);
        const [tweet, setTweet] = useState();

        const likesCounter = (thisTweet) => {
            setTweet(thisTweet);
            console.log(tweet);
            tweet.likes = tweet.likes+1;
            setCounter(() => tweet.likes);
        }
        
        return (
            <WrappedComponent {...props} counter={counter} likesCounter={likesCounter} />
        )
    }
}