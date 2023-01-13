import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import logo from '../images/twitter.webp'
import { selectUser } from './Sign_In_Page/SignInPgSlice';
import userIcon from '../images/user.png'
import home from '../images/home-black.png'
import SignOut from './SignOut';
import DeleteAccount from './DeleteAccount';

export default function Menu() {

    const user = useSelector(selectUser);

    const nav = useNavigate();
    const goHome = () => nav('/dashboard');
    const visitProfile = () => nav('/profile', { state: user.personalInfo.name });

    return (
        <div id='menu'>
            <img id='logo' 
                src={logo} 
                alt='logo' 
                onClick={() => goHome()}/>
            <div id='menu-options'>
                <div>
                    <img className='user-icon' src={home} alt='home' />
                    Home
                    </div>
                <div className='visit-profile' onClick={() => visitProfile()}>
                    <img className='user-icon' src={userIcon} alt='user' />
                    Profile
                    </div>
                <SignOut />
                <DeleteAccount />
            </div>
        </div>
    )
}