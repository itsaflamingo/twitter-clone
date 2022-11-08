import { useNavigate } from 'react-router-dom'
import logo from '../images/twitter.webp'

export default function Header() {

    const nav = useNavigate();
    const goHome = () => nav('/dashboard');

    return (
        <div id='header'>
            <img id='logo' 
                src={logo} 
                alt='logo' 
                onClick={() => goHome()}/>
            <div id='menu'>
                <div>Search</div>
                <div>Account</div>
            </div>
        </div>
    )
}