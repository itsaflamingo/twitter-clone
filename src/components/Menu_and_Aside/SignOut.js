import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import signOut from '../../images/sign-out.png';
import signOutUser from '../ManageUser/signOutUser';
import { resetUser } from '../redux/SignInPgSlice';

export default function SignOut() {

    const nav = useNavigate();
    const dispatch = useDispatch();

    const signOutAndReset = async() => {
        await signOutUser().then(() => {
            nav('/');
            dispatch(resetUser());
        })
    }

    return (
        <button className='menu-btn'
        onClick={() => signOutAndReset()}>
            <img className='user-icon' src={signOut} alt='sign out' />
                Sign Out
            </button>
    )
}