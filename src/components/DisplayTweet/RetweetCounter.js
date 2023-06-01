import TweetCounterWrapper from "./TweetCounterWrapper"
import retweet from '../../images/retweet.svg'
import { useState } from "react";
import useAuth from "../customHooks/useAuth";
import SignInPopup from "../Dashboard/SignInPopup";

function RetweetCounter(props) {

    const { retweetCounter, tweet } = props;
    const { isSignedIn } = useAuth();

    const [showPopUp, setShowPopUp] = useState(false);

    return (
        <div className="retweet-div">
            <img className='retweet' src={retweet} 
            alt='retweet-btn'
            onClick={isSignedIn ? () => retweetCounter(tweet) : () => setShowPopUp(true)} />
            <div className="counter" aria-label="retweet counter">
                { tweet.retweets }
            </div>
            {showPopUp && <SignInPopup showPopUp={showPopUp} setShowPopUp={setShowPopUp} />}
        </div>
    )
}

export default TweetCounterWrapper(RetweetCounter);