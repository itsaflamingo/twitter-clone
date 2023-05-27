import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import signOut from '../../images/sign-out.png';
import signOutUser from '../ManageUser/signOutUser';
import { resetUser, selectUser } from '../redux/SignInPgSlice';
import useAuth from '../Sign_In_Page/useAuth';

export default function SignOut({ setShowSignInPopUp }) {

    const nav = useNavigate();
    const dispatch = useDispatch();
    const { signedInUser } = useAuth();

    const signOutAndReset = async() => {
        console.log('sign out');
        await signOutUser()
            .then(() => {
                nav('/');
                dispatch(resetUser());
            })
    }

    return (
        <button className='menu-btn'
        onClick={signedInUser ? () => setShowSignInPopUp(true) : () => signOutAndReset() }>
            <img className='user-icon' src={signOut} alt='sign out' />
                <p className='menu-title'>Sign Out</p>
                </button>
    )
}