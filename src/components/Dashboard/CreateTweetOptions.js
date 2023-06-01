import { useContext } from "react";
import { ShowSignInPopupContext } from "../contexts/signInPopupContext";
import useAuth from "../customHooks/useAuth";

export default function CreateTweetOptions(props) {

    const { handleSubmit, ariaLabel, chars } = props;
    const { isSignedIn } = useAuth();
    const { setShowPopup } = useContext(ShowSignInPopupContext);

    return (
        <div className="tweet-options">
            <div className='char-count'>{chars}</div>
            <button 
                type='submit'
                className='submit-tweet'
                aria-label={ariaLabel}
                onClick={isSignedIn ? (e) => handleSubmit(e) : () => setShowPopup(true)}>Hoot</button>
        </div>
    )
}