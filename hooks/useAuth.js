// import 2 react functions to implement react hooks with effect and state
import { useEffect, useState } from "react";
import { auth } from "../firebase";

// uses react hooks, learn at: https://reactjs.org/docs/hooks-intro.html
const useAuth = () => {
    // ask react to define a state variable and an associated function to change its value
    const [ user, setUser ] = useState(null);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    // ask react to manage our state variables based on a block of code we give it to run
    useEffect(
        // we are passing an anonymous arrow function to react's useEffect()
        () => {
            auth.onAuthStateChanged(
                // we are passing another anonymous function to firebase's onAuthStateChanged()
                (user) => {
                    // with the user object value that firebase returns 
                    // set react state variable isLoggedIn 
                    setIsLoggedIn( user && user.uid ? true : false );
                    // set react state variable user
                    setUser( user );
                }
            );
        }
    );
    // remember to return something for this useAuth() function we call for authentication
    return { user, isLoggedIn };
}

// don't forget to export the function we made here so other files can import it!
export default useAuth;
