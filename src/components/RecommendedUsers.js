import { useSelector } from "react-redux";
import { usersSelector } from "./Dashboard/allUsersSlice";
import ProfilePicture from "./Profile/ProfilePicture";

function RecommendedUsers() {

    const users = useSelector(usersSelector);

    return (
        <div id='recommended-users' className='aside'>
            <h3 className="heading">Recommended Users</h3>
            {users.map((user, index) => {
                if(index <= 5) {
                    return (
                        <div className="recommended-user">
                            <ProfilePicture tweetImage={user.personalInfo.profileInfo.profilePicture} />
                            <div className="user-info">
                                <p class='name'>{user.personalInfo.name}</p>
                                <p class='font-grey'>@{user.personalInfo.handle}</p>
                            </div>
                            <button className="follow">Follow</button>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default RecommendedUsers;