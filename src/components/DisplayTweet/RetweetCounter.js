import TweetCounterWrapper from "./TweetCounterWrapper"
import retweet from '../../images/retweet.svg'

function RetweetCounter(props) {

    const { retweetCounter, tweet } = props;

    return (
        <div className="retweet-div">
            <img className='retweet' src={retweet} 
            alt='retweet-btn'
            onClick={() => retweetCounter(tweet)} />
            <div className="counter" aria-label="retweet counter">
                { tweet.retweets }
            </div>
        </div>
    )
}

export default TweetCounterWrapper(RetweetCounter);