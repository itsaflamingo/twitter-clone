import { fetchUser } from "../redux/SignInPgSlice"
import { useDispatch } from "react-redux"

export default function GoogleSignIn() {
    const dispatch = useDispatch();

    return (
        <div>
            <button className='sign-in'
                    onClick={() => dispatch(fetchUser())}>Google Sign-In</button>
        </div>
    )
}