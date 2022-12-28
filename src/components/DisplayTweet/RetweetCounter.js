import TweetCounterWrapper from "./TweetCounterWrapper"
import retweet from '../../images/retweet.svg'

function RetweetCounter(props) {

    const { retweetCounter, tweet } = props;

    return (
        <div className="retweet-div">
            <img className='retweet' src={retweet} 
            alt='retweet-btn'
            onClick={() => retweetCounter(tweet)} />
            { tweet.retweets }
        </div>
    )
}

export default TweetCounterWrapper(RetweetCounter);