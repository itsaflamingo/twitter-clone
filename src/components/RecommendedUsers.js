import { useSelector } from "react-redux";
import { usersSelector } from "./Dashboard/allUsersSlice";
import ProfilePicture from "./Profile/ProfilePicture";
import { selectUser } from "./Sign_In_Page/SignInPgSlice";

const filterUsers = (users, activeUser) => users.filter((user) => {
    if(activeUser.length === 0) return [];
    return user.personalInfo.name !== activeUser.personalInfo.name})

function RecommendedUsers() {

    const users = useSelector(usersSelector);
    const user = useSelector(selectUser);

    const followableUsers = filterUsers(users, user);

    return (
        <div id='recommended-users' className='aside'>
            <h3 className="heading">Recommended Users</h3>
            { followableUsers.map((user, index) => {
                if(index <= 5) {
                    return (
                        <div className="recommended-user">
                            <ProfilePicture tweetImage={user.personalInfo.profileInfo.profilePicture} />
                            <div className="user-info">
                                <p className='name'>{user.personalInfo.name}</p>
                                <p className='font-grey'>@{user.personalInfo.handle}</p>
                            </div>
                            <button className="follow">Follow</button>
                        </div>
                    )
                }
            }) }
        </div>
    )
}

export default RecommendedUsers;