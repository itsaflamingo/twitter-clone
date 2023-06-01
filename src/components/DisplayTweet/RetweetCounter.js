import TweetCounterWrapper from "./TweetCounterWrapper"
import retweet from '../../images/retweet.svg'
import { useContext, useState } from "react";
import useAuth from "../customHooks/useAuth";
import SignInPopup from "../Dashboard/SignInPopup";
import { ShowSignInPopupContext } from "../contexts/signInPopupContext";

function RetweetCounter(props) {

    const { retweetCounter, tweet } = props;
    const { isSignedIn } = useAuth();

    const { setShowPopup } = useContext(ShowSignInPopupContext);

    return (
        <div className="retweet-div">
            <img className='retweet' src={retweet} 
            alt='retweet-btn'
            onClick={isSignedIn ? () => retweetCounter(tweet) : () => setShowPopup(true)} />
            <div className="counter" aria-label="retweet counter">
                { tweet.retweets }
            </div>
        </div>
    )
}

export default TweetCounterWrapper(RetweetCounter);