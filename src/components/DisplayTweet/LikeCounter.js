import { useEffect, useState } from 'react';
import TweetCounterWrapper from "../DisplayTweet/TweetCounterWrapper";
import useAuth from '../customHooks/useAuth';
import SignInPopup from '../Dashboard/SignInPopup';

function LikeCounter(props) {

    const { likesCounter, tweet, icon } = props;
    const { isSignedIn } = useAuth();

    const [showPopUp, setShowPopUp] = useState(false);

    return (
        <div className="like-div">
            <img className='like' onClick={isSignedIn 
                ? () => likesCounter(tweet) : () => setShowPopUp(true)} 
                src={icon} alt='like-btn' />
            <div className="counter" aria-label="like counter">
                {tweet.likes}
            </div>
            {showPopUp && <SignInPopup showPopUp={showPopUp} setShowPopUp={setShowPopUp} />}
        </div>
    )
}

export default TweetCounterWrapper(LikeCounter);