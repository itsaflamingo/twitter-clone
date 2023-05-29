import ProfilePicture from "../Profile/ProfilePicture"
import UserInfo from "../ManageUser/UserInfo";

export default function RecommendedUser(props) {

    const { user, navigateToProfile } = props;

    return (
        <div className="recommended-user">
            <ProfilePicture tweetImage={user.personalInfo.profileInfo.profilePicture} />
            <UserInfo user={user} />
            <button className="visit-profile"
            onClick={() => navigateToProfile(user.personalInfo.name)}>
                Profile
                </button>
            </div>
    )
}