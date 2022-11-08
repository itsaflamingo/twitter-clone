import TweetCounterWrapper from "./TweetCounterWrapper"
import heart from '../images/heart.svg'

function LikeCounter() {
    return (
        <div className="like-div">
            <img src={heart} alt='like-btn' />
        </div>
    )
}

export default TweetCounterWrapper(LikeCounter);