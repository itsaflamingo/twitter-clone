import { useNavigate } from "react-router-dom";
import TweetContent from "./TweetContent";
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
        <div className="tweet" key={tweet.id} id={tweet.id}>
            <TweetContent tweet={tweet} showRetweet={showRetweet} navigateToProfile={navigateToProfile}/>
                <div className="tweet-btns">
                    <LikeCounter tweet={tweet} />
                    <RetweetCounter tweet={tweet} showRetweet={showRetweet} />
                    <div className="tweet-date">{tweet.date}</div>
                </div>
                <TweetOptions />
            </div>
    )
}