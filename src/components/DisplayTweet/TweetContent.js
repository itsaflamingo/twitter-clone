import ProfilePicture from "../Profile/ProfilePicture"
import DisplayTweet from "./DisplayTweet";

export default function TweetContent(props) {

    const { tweet, showRetweet, navigateToProfile } = props;

    return (
        <div className="tweet-content">
            <ProfilePicture tweetImage={tweet.picture} />
            <div className="tweet-written">
                <div className="user-name-handle"
                onClick={(e) => navigateToProfile(e)}
                id={tweet.name}>
                <span className='name' id={tweet.name}>{tweet.name} </span> 
                <span className='font-grey'>{tweet.handle}</span>
                </div>
                    <p>{tweet.text}</p>
                    {/* DisplayTweet only renders if tweet is not an array, filtering out empty retweets */}
                    {!Array.isArray(tweet.retweet) && (<DisplayTweet tweet={tweet.retweet} showRetweet={showRetweet} />)}
                </div>
                </div>
    )
}