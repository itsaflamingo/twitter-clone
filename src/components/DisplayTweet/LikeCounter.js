import TweetCounterWrapper from "../DisplayTweet/TweetCounterWrapper"
import heart from '../../images/heart.svg'

function LikeCounter(props) {

    const { likesCounter, tweet } = props;

    return (
        <div className="like-div">
            <img className='like' onClick={() => likesCounter(tweet)} src={heart} alt='like-btn' />
            <div className="counter" aria-label="like counter">
                {tweet.likes}
            </div>
        </div>
    )
}

export default TweetCounterWrapper(LikeCounter);