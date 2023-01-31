import ProfilePicture from "./Profile/ProfilePicture"
export default function RecommendedUser(props) {

    const { user, navigateToProfile, index } = props;

    return (
        <div className="recommended-user" key={index}>
            <ProfilePicture tweetImage={user.personalInfo.profileInfo.profilePicture} />
            <div className="user-info">
                <p className='name'>{user.personalInfo.name}</p>
                <p className='font-grey'>@{user.personalInfo.handle}</p>
            </div>
            <button className="visit-profile"
            onClick={() => navigateToProfile(user.personalInfo.name)}>Profile</button>
            </div>
    )
}