import DisplayTweet from "../DisplayTweet/DisplayTweet";
import CreateTweet from "./CreateTweet";

export default function RetweetPopUp(props) {

    const { tweet, showRetweet } = props;

    return (
        <div className='retweet-pop-up' aria-label='retweet pop up'>
            <CreateTweet retweet={tweet} showRetweet={showRetweet} 
            retweetAriaLabel='retweet-input'
            tweetButtonAriaLabel='submit-retweet' />
            <DisplayTweet tweet={tweet} showRetweet={showRetweet} />
        </div>
    )
}