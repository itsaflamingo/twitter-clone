import FollowButton from './FollowButton';
import EditProfileButton from './EditProfileButton';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/SignInPgSlice';

export default function RenderPersonalOrOtherProfile(props) {
    const { userName } = props;
    const user = useSelector(selectUser);
    
    if(userName !== user.personalInfo.name) {
        return <FollowButton />
    }
    else {
        return <EditProfileButton />
    }

}