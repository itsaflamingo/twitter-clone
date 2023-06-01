import { useContext } from 'react';
import TweetCounterWrapper from "../DisplayTweet/TweetCounterWrapper";
import useAuth from '../customHooks/useAuth';
import { ShowSignInPopupContext } from '../contexts/signInPopupContext';

function LikeCounter(props) {

    const { likesCounter, tweet, icon } = props;
    const { isSignedIn } = useAuth();

    const { setShowPopup } = useContext(ShowSignInPopupContext);

    return (
        <div className="like-div">
            <img className='like' onClick={isSignedIn 
                ? () => likesCounter(tweet) : () => setShowPopup(true)} 
                src={icon} alt='like-btn' />
            <div className="counter" aria-label="like counter">
                {tweet.likes}
            </div>
        </div>
    )
}

export default TweetCounterWrapper(LikeCounter);