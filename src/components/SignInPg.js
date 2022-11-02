import { googleSignIn } from "./firebaseConfig"
import logo from '../images/twitter.webp'

export default function SignInPg(props) {

    return (
        <div id='sign-in-container'>
            <div id='sign-in-box'>
                <div id='sign-in-logo'
                style={{
                    backgroundImage: `url(${logo})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat'
                }}></div>
                <div id='heading-btn'>
                    <h1>Welcome to Twitter Clone!</h1>
                    <button id='sign-in'
                    onClick={() => googleSignIn}>Sign In</button>
                </div>
            </div>
        </div>
    )
}