import LikeCounter from "./LikeCounter";
import RetweetCounter from "./RetweetCounter";
import TweetOptions from "./TweetOptions";

export default function DisplayTweet(props) {
    const { tweet, showRetweet } = props;
    
    return (
        <div className="tweet" key={tweet.id}>
                <div className="user-name">{tweet.name}</div>
                    {tweet.text}
                {/* DisplayTweet only renders if tweet is not an array */}
                {!Array.isArray(tweet.retweet) && (<DisplayTweet tweet={tweet.retweet} showRetweet={showRetweet} />)}
                <div className="tweet-btns">
                    <LikeCounter tweet={tweet} />
                    <RetweetCounter tweet={tweet} showRetweet={showRetweet} />
                    {tweet.date}
                </div>
                <TweetOptions />
            </div>
    )
}