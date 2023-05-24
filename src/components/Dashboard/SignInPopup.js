export default function SignInPopup({ showPopUp, setShowPopUp }) {
    return (
    <div>
        <h4>Sorry, log in to gain full access</h4>
        <button>Sign In</button>
        <button onClick={() => setShowPopUp(false)}>No, thanks</button>
    </div>
    )
}