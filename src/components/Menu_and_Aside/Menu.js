import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import logo from '../../images/icon.png'
import { editUser, selectError, selectStatus, selectUser } from '../../redux/SignInPgSlice';
import userIcon from '../../images/user.png'
import home from '../../images/home-black.png'
import SignOut from './SignOut';
import DeleteAccount from './DeleteAccount';
import { useContext, useEffect, useState } from 'react';
import SignInPopup from '../Dashboard/SignInPopup';
import GoogleSignIn from './GoogleSignIn';
import { addUser, usersSelector } from '../../redux/allUsersSlice';
import useAuth from '../customHooks/useAuth';
import { storeUsers } from '../../firebase/manageDbUsers';
import checkIsUserInDatabase from '../../functions/checkIsUserInDatabase';
import addUserInfoToUser from '../../functions/addUserInfoToUser';
import EditProfileInfo from '../ManageUser/EditProfileInfo';
import useGetUsersFromDatabase from '../customHooks/useGetUsersFromDatabase';
import { ShowSignInPopupContext } from '../contexts/signInPopupContext';

export default function Menu() {

    const user = useSelector(selectUser);
    const userLength = user.length;
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const users = useSelector(usersSelector);

    const dispatch = useDispatch();
    const nav = useNavigate();

    const goHome = () => nav('/');
    const visitProfile = () => nav('/profile', { state: user.personalInfo.name });
    const { isSignedIn } = useAuth();

    // Keep track of whether logged in user has account, and is signed in
    const [hasAccount, setHasAccount] = useState(null);
    const [showEditInfo, setShowEditInfo] = useState(false);
    const [userUpdated, setUserUpdated] = useState(false);

    const { showPopup, setShowPopup } = useContext(ShowSignInPopupContext);


    useGetUsersFromDatabase();

    useEffect(() => {
        if(status !== 'succeed') return;
        // IfAddToDatabase adds unknown user to Redux, returns boolean depending on whether user exists or not.
        setHasAccount(ifAddToDatabase(user, users));
    }, [status])

    useEffect(() => {
        if('personalInfo' in user === false || !isSignedIn) return;
        if(isSignedIn && user.personalInfo.hasAccount === true && status !== 'loading' && userUpdated) {
            // Only store user in database after it has been changed.
            storeUsers(user);
        }
    }, [user, isSignedIn])

    useEffect(() => {
        if(isSignedIn === true && user.length > 0) {
            setHasAccount(user.personalInfo.hasAccount);
        }
    }, [])

    useEffect(() => {
        if(status !== 'succeed') return;
        if(hasAccount === false) {
            setShowEditInfo(true);
        }
    }, [hasAccount])

    // If user is in database, return true, else add new user and return false
    const ifAddToDatabase = (user, users) => {
        // If exists, will return object, otherwise will return false.
        const existingUser = checkIsUserInDatabase(user, users);
        // If no existing user, return true to add to database
        if(existingUser === false) return true;

        // If user already exists, combine user and personalInfo section of existingUser and return false.
        dispatch(editUser({
            ...user, 
            personalInfo: {
                ...existingUser.personalInfo,
            }}))
        // If has account, it will return true and navigate to dashboard, otherwise false and account will be created.
        return user.personalInfo.hasAccount;
    }

    const saveNewUserToDatabase = (e, user, userInfo) => {
        // Store in database & add to users array
        const newUser = addUserInfoToUser(e, user, userInfo);
        // Store in database & add to users array
        dispatch(addUser(newUser));
        // Add to current user array
        dispatch(editUser(newUser));
    }

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
                onClick={userLength === 0 ? () => setShowPopup(true) : () => visitProfile()}>
                    <img className='user-icon' src={userIcon} alt='user' />
                    <p className='menu-title'>Profile</p>
                    </button>
                <SignOut />
                <DeleteAccount />
                {showEditInfo && (<EditProfileInfo user={user} saveToDatabase={saveNewUserToDatabase} setShowEditInfo={setShowEditInfo} setUserUpdated={setUserUpdated} />)}
            </div>
        </div>
    )
}