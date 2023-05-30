import { useDispatch, useSelector } from "react-redux";
import { addUser, usersSelector } from "../redux/allUsersSlice";
import { useEffect } from "react";
import { getUsers } from "../firebase/manageDbUsers";

export default function useGetUsersFromDatabase() {
    const users = useSelector(usersSelector);
    const dispatch = useDispatch();

        // Will run more than once because there is a closure inside the callback function. Ignore variable ensures it runs only once.
        useEffect(() => {
            if(users.length > 0) return;
            let ignore = false;
            
            const getdbUsers = async() => {
                if(!ignore) {
                    await getUsers().then((res) => {
                        if(res[0] === undefined) return;
                        console.log('user retrieved');
                        dispatch(addUser(res))
                    }).catch(error => console.log(error));
                }
            }
    
            getdbUsers();
    
            return() => {
                ignore = true;
            }
        }, [])
}