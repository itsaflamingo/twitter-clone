import CreateTweetOptions from "./CreateTweetOptions";
import DisplayTweet from "./DisplayTweet";
import TweetInput from "./TweetInput";

export default function RetweetPopUp(props) {

    const { tweet } = props;

    return (
        <div className='retweet-pop-up'>
            <TweetInput />
            <DisplayTweet tweet={tweet} />
            <CreateTweetOptions />
        </div>
    )
}