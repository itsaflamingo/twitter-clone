export default function useToggleFollowButton(props) {

    const { following } = props;

    if(following === 0) {
        return 'Follow'
    }
    else {
        return 'Following'
    }
}