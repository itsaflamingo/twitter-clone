import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usersSelector } from "../redux/allUsersSlice";
import RecommendedUser from "./RecommendedUser";
import { selectUser } from "../redux/SignInPgSlice";

const filterUsers = (users, activeUser) => users.filter((user) => {
    if(activeUser.length === 0) return [];
    return user.personalInfo.name !== activeUser.personalInfo.name})

function RecommendedUsers() {

    const users = useSelector(usersSelector);
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    const followableUsers = filterUsers(users, user);

    const navigateToProfile = (target) => navigate('/profile', { state: target });
    

    return (
        <div id='recommended-users' className='aside'>
            <h3 className="heading">Recommended Users</h3>
            { followableUsers.map((user, index) => {
                if(index <= 4) {
                    return (
                        <RecommendedUser user={user} index={index} navigateToProfile={navigateToProfile} />
                    )
                }
                }) }
        </div>
    )
}

export default RecommendedUsers;