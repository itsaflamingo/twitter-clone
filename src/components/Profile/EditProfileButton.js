import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import addUserInfoToUser from "../../functions/addUserInfoToUser";
import EditProfileInfo from "../ManageUser/EditProfileInfo";
import { addUser } from "../../redux/allUsersSlice";
import { editUser, selectUser } from "../../redux/SignInPgSlice";
import { tweetsSelector, updateTweet } from "../../redux/createTweetSlice";

export default function EditProfileButton() {
    const [seeEditProfile, setSeeEditProfile] = useState(false);
    const user = useSelector(selectUser);
    const tweets = useSelector(tweetsSelector);
    const dispatch = useDispatch();

    const saveEditedInfoToDatabase = (e, user, userInfo) => {
        //Store in database & add to users array
        const updatedUser = addUserInfoToUser(e, user, userInfo);
        editTweets(tweets, user, updatedUser);
        //Store in database & add to users array
        dispatch(addUser(updatedUser));
        //Add to current users array
        dispatch(editUser(updatedUser));
    }

    const editTweets = (tweets, user, updatedUser) => {
        const name = user.personalInfo.name;
        
        tweets.map((tweet, index) => {
            if(name === tweet.name) {
                const newTweet = {
                    ...tweet,
                    name: updatedUser.personalInfo.name,
                    picture: updatedUser.personalInfo.profileInfo.profilePicture,
                    handle: `@${updatedUser.personalInfo.handle}`,
                  }
                dispatch(updateTweet(index, newTweet));
                return newTweet;
            }
            return tweet;
          });
    }

    return (
        <div className="profile-btns">
            <button className="edit-btn" onClick={() => setSeeEditProfile(!seeEditProfile)}>Edit profile</button>
            {seeEditProfile && (<EditProfileInfo saveToDatabase={saveEditedInfoToDatabase} user={user} />)}
        </div>
    )
}