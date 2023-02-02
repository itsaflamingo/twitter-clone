import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import logo from '../../images/icon.png'
import { selectUser } from '../redux/SignInPgSlice';
import userIcon from '../../images/user.png'
import home from '../../images/home-black.png'
import SignOut from './SignOut';
import DeleteAccount from './DeleteAccount';

export default function Menu() {

    const user = useSelector(selectUser);

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
                <button className='menu-btn'
                onClick={() => goHome()}>
                    <img className='user-icon' src={home} alt='home' />
                    <p className='menu-title'>Home</p>
                    </button>
                <button className='menu-btn' 
                onClick={() => visitProfile()}>
                    <img className='user-icon' src={userIcon} alt='user' />
                    <p className='menu-title'>Profile</p>
                    </button>
                <SignOut />
                <DeleteAccount />
            </div>
        </div>
    )
}