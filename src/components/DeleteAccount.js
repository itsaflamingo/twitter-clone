import { deleteUser } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import deleteAccount from '../images/delete-account.png';
import { changeTweets, tweetsSelector } from './Dashboard/CreateTweetSlice';
import signOutUser from './signOutUser';
import { resetUser } from './Sign_In_Page/SignInPgSlice';
import useAuth from './Sign_In_Page/useAuth';

export default function DeleteAccount() {

    const { signedInUser } = useAuth();

    const tweets = useSelector(tweetsSelector);

    const nav = useNavigate();
    const dispatch = useDispatch();

    const signOutAndDeleteUser = async() => {
        await signOutUser().then(() => {
            nav('/');
            deleteUserTweets(tweets, signedInUser);
            deleteUser(signedInUser).then(() => {
                dispatch(resetUser());
            })
        })
    }

    const deleteUserTweets = (tweets, user) => {
        const email = user.email;

        const newTweets = tweets.filter((tweet) => tweet.email !== email)

        dispatch(changeTweets(newTweets));
    }
    
    return (
        <button className='menu-button'
        onClick={() => signOutAndDeleteUser()}>
            <img className='user-icon' src={deleteAccount} alt='delete account' />
                Delete Account
                </button>
    )
}