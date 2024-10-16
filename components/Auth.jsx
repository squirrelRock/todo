import React from "react";
import { Box, Button, Link, Text, useColorMode } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

// react jsx login component
const Auth = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    const { isLoggedIn, user } = useAuth() || {};
    // define a function to perform the login operation
    const handleAuth = async () => {
        const provider = new GoogleAuthProvider();
        // some async calls with promise
        signInWithPopup(
            auth,
            provider
        ).then(
            // since we got a promise, inside the then we get results returns
            (result) => {
                console.log(result);
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // now we should be able to get info about the user who is logged in!
                const user = result.user;
            }
        ).catch(
            (error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log("authentication error " + errorCode + errorMessage);
            }
        );
    };
    // define the jsx component
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
                <Link href="/add-todo">Add To Do</Link>
            </Box>
            <Box>
            <Link href="/">List All To Dos</Link>
            </Box>
            <Box textAlign="right">
                <Button onClick={() => toggleColorMode()}>
                    {colorMode == "dark" ? <FaSun /> : <FaMoon />}
                </Button>
                {" "}
                {isLoggedIn && (
                    <>
                        <Text color="green.500">{user.email}</Text>
                        <Link color="red.500" onClick={ () => auth.signOut() }>
                            Logout
                        </Link>
                    </>
                )}
                {!isLoggedIn && (
                    <Button leftIcon={<FaGoogle />} onClick={ () => handleAuth() }>
                        Login with Google
                    </Button>
                )}
            </Box>
        </Box>
    );
};

// export component!
export default Auth;
