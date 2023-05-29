import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import logo from '../../images/icon.png'
import { editUser, selectError, selectStatus, selectUser } from '../redux/SignInPgSlice';
import userIcon from '../../images/user.png'
import home from '../../images/home-black.png'
import SignOut from './SignOut';
import DeleteAccount from './DeleteAccount';
import { useEffect, useState } from 'react';
import SignInPopup from '../Dashboard/SignInPopup';
import GoogleSignIn from './GoogleSignIn';
import { addUser, usersSelector } from '../redux/allUsersSlice';
import useAuth from '../Sign_In_Page/useAuth';
import { getUsers, storeUsers } from '../firebase/manageDbUsers';
import checkIsUserInDatabase from '../../functions/checkIsUserInDatabase';
import addUserInfoToUser from '../ManageUser/addUserInfoToUser';
import EditProfileInfo from '../ManageUser/EditProfileInfo';

export default function Menu() {

    const user = useSelector(selectUser);
    const userLength = user.length;
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const users = useSelector(usersSelector);

    const [showSignInPopUp, setShowSignInPopUp] = useState(null);

    const dispatch = useDispatch();
    const nav = useNavigate();

    const goHome = () => nav('/dashboard');
    const visitProfile = () => nav('/profile', { state: user.personalInfo.name });

    // Keep track of whether logged in user has account, and is signed in
    const [hasAccount, setHasAccount] = useState(null);
    const { isSignedIn } = useAuth();

    useEffect(() => {
        if(status !== 'succeed') return;
        // IfAddToDatabase adds unknown user to Redux, returns boolean depending on whether user exists or not.
        setHasAccount(ifAddToDatabase(user, users));
    }, [status])

    useEffect(() => {
        if('personalInfo' in user === false || !isSignedIn) return;
        if(isSignedIn && user.personalInfo.hasAccount === true && status !== 'loading') {
            // Only store user in database after it has been changed.
            storeUsers(user);
        }
    }, [user, isSignedIn])

    useEffect(() => {
        // Retrieve users from database
        getUsersFromDatabase();
        if(isSignedIn === true) {
            setHasAccount(true);
        }
    }, [isSignedIn])

    const getUsersFromDatabase = async() => await getUsers().then((res) => {
        if(res[0] === undefined) return;
        dispatch(addUser(res))
    }).catch(error => console.log(error));

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
                onClick={userLength === 0 ? () => setShowSignInPopUp(true) : () => visitProfile()}>
                    <img className='user-icon' src={userIcon} alt='user' />
                    <p className='menu-title'>Profile</p>
                    </button>
                <SignOut setShowSignInPopUp={setShowSignInPopUp} />
                <DeleteAccount setShowSignInPopUp={setShowSignInPopUp} />
                {userLength === 0 && <SignInPopup showPopUp={showSignInPopUp} setShowPopUp={setShowSignInPopUp} />}
                {hasAccount === false && (<EditProfileInfo user={user} saveToDatabase={saveNewUserToDatabase} />)}
            </div>
        </div>
    )
}