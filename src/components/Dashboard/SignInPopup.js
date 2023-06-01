import { useContext } from "react";
import { ShowSignInPopupContext } from "../contexts/signInPopupContext";

export default function SignInPopup() {

    const { setShowPopup } = useContext(ShowSignInPopupContext);

    return (
    <div>
        <h4>Sorry, log in to gain full access</h4>
        <button>Sign In</button>
        <button onClick={() => setShowPopup(false)}>No, thanks</button>
    </div>
    )
}