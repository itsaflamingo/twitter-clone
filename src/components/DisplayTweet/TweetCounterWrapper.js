import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tweetsSelector } from "../redux/createTweetSlice";
import { updateTweet } from "../redux/createTweetSlice";
import { storeTweets } from "../firebase/manageDbTweets";
import { selectUser } from "../redux/SignInPgSlice";

export default function TweetCounterWrapper(WrappedComponent) {
    return function Counter(props) {

        const { tweet, showRetweet } = props;

        const user = useSelector(selectUser);
        const tweets = useSelector(tweetsSelector);
        const dispatch = useDispatch();

        useEffect(() => {
            storeTweets(tweet);
        }, [tweet])

        const likesCounter = (tweet) => {

            const obj = {
                likedBy: tweet.likedBy,
                isLiked: tweet.likedBy.includes(tweet.email),
                updatedLikes: '',
                updatedLikedBy: [],
                tweet,
                user
            }
            
            obj.updatedLikes = obj.isLiked ? unlikeTweet(obj) : likeTweet(obj)
            
            //returns tweet that matches criteria
            const findTweet = (element) => element.id === tweet.id;
            // uses findIndex on tweets to find the index based on criteria set by callback
            const index = tweets.findIndex(findTweet);

            // dispatches updatedLikes to store, changing tweet.likes without directly mutating state.
            dispatch(updateTweet(index, { likes: obj.updatedLikes }));
            dispatch(updateTweet(index, { likedBy: obj.updatedLikedBy }));
        }

        const retweetCounter = (tweet) => {

            showRetweet(false);
            
            // same as like counter
            const updatedRetweets = tweet.retweets + 1;

            const findTweet = element => element.id === tweet.id;
            const index = tweets.findIndex(findTweet);
            
            dispatch(updateTweet(index, { retweets: updatedRetweets }));
            
        }

        return (
            <WrappedComponent tweet={tweet} likesCounter={likesCounter} retweetCounter={retweetCounter} showRetweet={showRetweet} />
        )
    }
}

function likeTweet({updatedLikes, tweet, updatedLikedBy, user}) {
    updatedLikes = tweet.likes + 1;
    updatedLikedBy.push(user.email);
    return updatedLikes;
};

function unlikeTweet({updatedLikes, tweet, updatedLikedBy, user, likedBy}) {
    updatedLikes = tweet.likes - 1;
    updatedLikedBy = likedBy.filter(email => email !== user.email);
    return updatedLikes;
};