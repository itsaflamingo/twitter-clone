import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTweet } from "../redux/createTweetSlice";
import { userDeleteTweet } from "../redux/userTweetsSlice";
import { selectUser } from "../redux/SignInPgSlice";
import { deleteTweetFromDb } from "../firebase/manageDbTweets";

export default function TweetOptions() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const [tweetInfo, setTweetInfo] = useState({
        id: '',
        name: ''
    })

    const updateTweetInfo = (e) => {
            if(tweetInfo.id.length === 0 && tweetInfo.name.length === 0) {
                const tweetId = e.target.parentNode.id;
                const tweetName = e.target.parentNode.firstChild.lastChild.firstChild.firstChild.id;
    
                setTweetInfo({ id: tweetId, name: tweetName });
            }
        }
       

    useEffect(() => {
        if(tweetInfo.name.length === 0 || tweetInfo.id.length === 0) return
        dispatchActions();
        setTweetInfo({ id: '', name: ''});
    }, [tweetInfo])

    const dispatchActions = () => {
        const name = user.personalInfo.name;
        // only logged in user is able to delete own tweets.
        if(name !== tweetInfo.name) return;
        dispatch(deleteTweet(tweetInfo.id));
        deleteTweetFromDb(tweetInfo.id);
        dispatch(userDeleteTweet(tweetInfo.id));
    }

    return (
        <button className="delete-tweet"
         onClick={(e) => updateTweetInfo(e)}>
            x
        </button>
    )
}