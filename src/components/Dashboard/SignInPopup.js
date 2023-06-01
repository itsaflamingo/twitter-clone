import { useContext } from "react";
import { ShowSignInPopupContext } from "../contexts/signInPopupContext";
import GoogleSignIn from "../Menu_and_Aside/GoogleSignIn";

export default function SignInPopup() {

    const { setShowPopup } = useContext(ShowSignInPopupContext);

    return (
    <div className="sign-in-popup">
        <h4>Sorry, log in to gain full access</h4>
        <div className="popup-button-container">
            <GoogleSignIn />
            <button className="close-popup" onClick={() => setShowPopup(false)}>No, thanks</button>
        </div>
    </div>
    )
}