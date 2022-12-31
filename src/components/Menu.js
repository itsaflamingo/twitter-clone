import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import logo from '../images/twitter.webp'
import { selectUser } from './Sign_In_Page/SignInPgSlice';

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
                <div>Search</div>
                <div>Account</div>
                <div onClick={() => visitProfile()}>Profile</div>
            </div>
        </div>
    )
}