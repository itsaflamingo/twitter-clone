import DisplayTweet from "../DisplayTweet/DisplayTweet";
import CreateTweet from "./CreateTweet";

export default function RetweetPopUp(props) {

    const { tweet, showRetweet } = props;

    return (
        <div className='retweet-pop-up'>
            <CreateTweet retweet={tweet} showRetweet={showRetweet} />
            <DisplayTweet tweet={tweet} showRetweet={showRetweet} />
        </div>
    )
}