import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import logo from '../../images/icon.png'
import { selectUser } from '../redux/SignInPgSlice';
import userIcon from '../../images/user.png'
import home from '../../images/home-black.png'
import SignOut from './SignOut';
import DeleteAccount from './DeleteAccount';
import { useState } from 'react';
import SignInPopup from '../Dashboard/SignInPopup';
import GoogleSignIn from './GoogleSignIn';

export default function Menu() {

    const user = useSelector(selectUser);
    const isUserObj = typeof user === 'object';
    const userLength = user.length;

    const [showSignInPopUp, setShowSignInPopUp] = useState(false);

    const nav = useNavigate();
    const goHome = () => nav('/dashboard');
    const visitProfile = () => nav('/profile', { state: user.personalInfo.name });

    return (
        <div id='menu'>
            <div className='logo-wrapper'>
                <img id='logo' 
                    src={logo} 
                    alt='logo' 
                    onClick={() => goHome()}/>
                </div>
            <div id='menu-options'>
                {userLength === 0 && <GoogleSignIn />}
                <button className='menu-btn'
                onClick={() => goHome()}>
                    <img className='user-icon' src={home} alt='home' />
                    <p className='menu-title'>Home</p>
                    </button>
                <button className='menu-btn' 
                onClick={userLength === 0 ? () => setShowSignInPopUp(true) : () => visitProfile()}>
                    <img className='user-icon' src={userIcon} alt='user' />
                    <p className='menu-title'>Profile</p>
                    </button>
                <SignOut setShowSignInPopUp={setShowSignInPopUp} />
                <DeleteAccount setShowSignInPopUp={setShowSignInPopUp} />
                {userLength === 0 && <SignInPopup showPopUp={showSignInPopUp} setShowPopUp={setShowSignInPopUp} />}
            </div>
        </div>
    )
}