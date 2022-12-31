import { useNavigate } from "react-router-dom";
import LikeCounter from "./LikeCounter";
import RetweetCounter from "./RetweetCounter";
import TweetOptions from "./TweetOptions";

export default function DisplayTweet(props) {
    const { tweet, showRetweet } = props;
    const navigate = useNavigate();

    const navigateToProfile = (e) => {
        const target = e.target.id;

        navigate('/profile', { state: target });
    }
    
    return (
        <div className="tweet" key={tweet.id}>
                <div className="user-name"
                onClick={(e) => navigateToProfile(e)}
                id={tweet.name}>{tweet.name}</div>
                    {tweet.text}
                {/* DisplayTweet only renders if tweet is not an array, filtering out empty retweets */}
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