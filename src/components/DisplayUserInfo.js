import { useSelector } from "react-redux"
import { selectUser } from "./SignInPgSlice"

export default function DisplayUserInfo() {

    const user = useSelector(selectUser);

    return (
        <div id='user-info'>
            <h2>{user.personalInfo.name}</h2>
            <p>{user.personalInfo.handle}</p>
            <p>{user.personalInfo.description}</p>
            <p>Joined {user.personalInfo.dateJoined}</p>
            </div>
    )
}