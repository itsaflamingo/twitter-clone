import { useNavigate } from 'react-router-dom'
import logo from '../images/twitter.webp'

export default function Menu() {

    const nav = useNavigate();
    const goHome = () => nav('/dashboard');
    const visitProfile = () => nav('/profile');

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