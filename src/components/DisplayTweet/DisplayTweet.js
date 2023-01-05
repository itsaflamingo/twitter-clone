import { useNavigate } from "react-router-dom";
import ProfilePicture from "../Profile/ProfilePicture";
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
            <div className="tweet-content">
            <ProfilePicture />
            <div className="tweet-written">
                <div className="user-name"
                onClick={(e) => navigateToProfile(e)}
                id={tweet.name}>{tweet.name} {tweet.handle}
                </div>
                    {tweet.text}
                    {/* DisplayTweet only renders if tweet is not an array, filtering out empty retweets */}
                    {!Array.isArray(tweet.retweet) && (<DisplayTweet tweet={tweet.retweet} showRetweet={showRetweet} />)}
                </div>
                </div>
                <div className="tweet-btns">
                    <LikeCounter tweet={tweet} />
                    <RetweetCounter tweet={tweet} showRetweet={showRetweet} />
                    <div className="tweet-date">{tweet.date}</div>
                </div>
                <TweetOptions />
            </div>
    )
}