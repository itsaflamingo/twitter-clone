import { useEffect } from 'react';
import TweetCounterWrapper from "../DisplayTweet/TweetCounterWrapper"

function LikeCounter(props) {

    const { likesCounter, tweet, icon } = props;

    return (
        <div className="like-div">
            <img className='like' onClick={() => likesCounter(tweet)} src={icon} alt='like-btn' />
            <div className="counter" aria-label="like counter">
                {tweet.likes}
            </div>
        </div>
    )
}

export default TweetCounterWrapper(LikeCounter);