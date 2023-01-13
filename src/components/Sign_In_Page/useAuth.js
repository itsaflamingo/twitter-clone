import { useState, useEffect } from "react";
import { auth } from '../firebaseConfig'
export default function useAuth() {
    const [authState, setAuthState] = useState({
        isSignedIn: false,
        signedInUser: null
    })

    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(signedInUser => {
            setAuthState({ signedInUser, isSignedIn: Boolean(signedInUser) })
        })

        return () => unregisterAuthObserver();
    }, [])

    return { auth, ...authState}
}