export default function useToggleFollowButton(props) {

    const { followers, userFollowing } = props;

    const checkIfFollowing = () => followers.some(obj => obj.name === userFollowing.personalInfo.name);
    
    if(checkIfFollowing()) {
        return 'Following';
    }
    else {
        return 'Follow';
    }
}