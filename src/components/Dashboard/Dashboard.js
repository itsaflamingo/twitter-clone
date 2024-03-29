import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser, selectUser } from "../../redux/SignInPgSlice"
import { userAddTweets } from "../../redux/userTweetsSlice";
import { userTweetsSelector } from "../../redux/userTweetsSlice";
import { tweetsSelector } from "../../redux/createTweetSlice";
import { usersSelector } from "../../redux/allUsersSlice";
import useGetTweetsFromDatabase from "../customHooks/useGetTweetsFromDatabase";
import Search from "./Search";
import Header from "./Header";
import AddMenuAndAside from "../Menu_and_Aside/AddMenuAndAside";
import CreateTweet from './CreateTweet'
import DisplayTweets from "../DisplayTweet/DisplayTweets";
import useAuth from "../customHooks/useAuth";
import checkIsUserInDatabase from "../../functions/checkIsUserInDatabase";
import { ShowSignInPopupContext } from "../contexts/signInPopupContext";
import SignInPopup from "./SignInPopup";
import { filterUserTweets } from "../../functions/filterTweets";

function Dashboard() {

    // Import redux variables
    const allTweets = useSelector(tweetsSelector);
    const user = useSelector(selectUser);
    const users = useSelector(usersSelector);
    const userTweets = useSelector(userTweetsSelector);

    const { showPopup } = useContext(ShowSignInPopupContext);
    
    const { signedInUser, isSignedIn } = useAuth();

    // Create showTweets and tweets states
    const [showTweets, setShowTweets] = useState(true);
    const [tweets, setTweets] = useState([]);

    const dispatch = useDispatch();

    // Update user tweets
    const addToUserTweets = (filteredTweets) => dispatch(userAddTweets(filteredTweets));
    
    useGetTweetsFromDatabase();

    useEffect(() => {
        if(users.length === 0) return;
        if(isSignedIn === true && user.length === 0) {
            const existingUser = checkIsUserInDatabase(signedInUser, users);
            dispatch(editUser({
                ...existingUser, 
                personalInfo: {
                    ...existingUser.personalInfo,
                }}))
        }
    }, [isSignedIn, users])

    useEffect(() => {
        if(allTweets.length === 0) return;
        setTweets(allTweets);
    }, [allTweets])

    useEffect(() => {
        if(tweets.length === 0) return;
        // Executes when returning after navigating to different page.
        setShowTweets(true);
    }, [tweets])

    useEffect(() => {
        if(tweets.length === 0 || userTweets.length > 0 || user.length === 0) return;
        addToUserTweets(filterUserTweets(tweets, user));
    }, [tweets])

    return (
        <div id='dashboard'>
            <Header />
            <Search setTweets={setTweets} />
            <CreateTweet retweet={[]} showRetweet={null} retweetAriaLabel='create tweet input' tweetButtonAriaLabel='create tweet submit' />
            {showTweets && (<DisplayTweets tweets={tweets} />)}
            {showPopup === true && <SignInPopup />}
        </div>
    )
}

export default AddMenuAndAside(Dashboard);

