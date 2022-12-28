import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tweetsSelector } from "../Dashboard/CreateTweetSlice";
import { updateTweet } from "../Dashboard/CreateTweetSlice";
import { storeTweets } from "../storeInCloud";

export default function TweetCounterWrapper(WrappedComponent) {
    return function Counter(props) {

        const { tweet, showRetweet } = props;

        useEffect(() => {
            storeTweets(tweet);
        }, [tweet])

        const tweets = useSelector(tweetsSelector);
        const dispatch = useDispatch();

        const likesCounter = (tweet) => {
            // Result of tweet.likes+1 is added to updatedLikes without modifying tweet.likes. tweet.likes is then updated after dispatch
            const updatedLikes = tweet.likes + 1;
            //returns tweet that matches criteria
            const findTweet = (element) => element.id === tweet.id;
            // uses findIndex on tweets to find the index based on criteria set by callback
            const index = tweets.findIndex(findTweet);

            // dispatches to store.
            dispatch(updateTweet(index, { likes: updatedLikes }));
        }

        const retweetCounter = (tweet) => {
            showRetweet(false);
            
            // same as like counter
            const updatedRetweets = tweet.retweets + 1;

            const findTweet = element => element.id === tweet.id;
            const index = tweets.findIndex(findTweet);
            
            dispatch(updateTweet(index, { retweets: updatedRetweets }))
        }

        return (
            <WrappedComponent tweet={tweet} likesCounter={likesCounter} retweetCounter={retweetCounter} showRetweet={showRetweet} />
        )
    }
}