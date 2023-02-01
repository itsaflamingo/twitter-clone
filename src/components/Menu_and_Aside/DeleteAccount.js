import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import deleteAccount from '../../images/delete-account.png';
import { changeTweets, tweetsSelector } from '../redux/createTweetSlice';
import { deleteUserFromDb } from '../firebase/manageDbUsers';
import { deleteTweetFromDb } from '../firebase/manageDbTweets';
import signOutUser from '../ManageUser/signOutUser';
import { resetUser } from '../redux/SignInPgSlice';
import useAuth from '../Sign_In_Page/useAuth';

export default function DeleteAccount() {

    const { signedInUser } = useAuth();

    const tweets = useSelector(tweetsSelector);

    const nav = useNavigate();
    const dispatch = useDispatch();

    const signOutAndDeleteUser = async() => {
        await signOutUser().then(() => {
            nav('/');
            deleteUserTweets(tweets, signedInUser);
        })
        await deleteUserFromDb(signedInUser.email).then(() => {
            dispatch(resetUser());
        });
    }

    const deleteUserTweets = (tweets, user) => {
        const email = user.email;

        const newTweets = tweets.filter((tweet) => {
            if(tweet.email === email) {
                deleteTweetFromDb(tweet.id);
            }
            return tweet.email !== email
        })

        dispatch(changeTweets(newTweets));
    }
    
    return (
        <button className='menu-btn'
        onClick={() => signOutAndDeleteUser()}>
            <img className='user-icon' src={deleteAccount} alt='delete account' />
                Delete Account
                </button>
    )
}