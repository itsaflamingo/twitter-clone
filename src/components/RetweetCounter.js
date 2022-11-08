import TweetCounterWrapper from "./TweetCounterWrapper"
import retweet from '../images/retweet.svg'

function RetweetCounter() {
    return (
        <div className="retweet-div">
            <img src={retweet} alt='retweet-btn' />
        </div>
    )
}

export default TweetCounterWrapper(RetweetCounter);