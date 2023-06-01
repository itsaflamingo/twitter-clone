import ProfilePicture from "../Profile/ProfilePicture"
import UserInfo from "../ManageUser/UserInfo";
import { useContext } from "react";
import { ShowSignInPopupContext } from "../contexts/signInPopupContext";
import useAuth from "../customHooks/useAuth";

export default function RecommendedUser(props) {

    const { user, navigateToProfile } = props;
    const { isSignedIn } = useAuth();
    const { setShowPopup } = useContext(ShowSignInPopupContext)

    return (
        <div className="recommended-user">
            <ProfilePicture tweetImage={user.personalInfo.profileInfo.profilePicture} />
            <UserInfo user={user} />
            <button className="visit-profile"
            onClick={isSignedIn ? () => navigateToProfile(user.personalInfo.name) : () => setShowPopup(true)}>
                Profile
                </button>
            </div>
    )
}