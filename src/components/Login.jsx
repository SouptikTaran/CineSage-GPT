import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, } from "firebase/auth";
import { addUser } from "../utils/userSlice";
import { BG_LOGO } from "../utils/constants";

const Login = () => {
    const [isSignInForm, setisSignInForm] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const nameRef = useRef(null);
    const dispatch = useDispatch();

    const toggleSignIn = () => {
        setisSignInForm(!isSignInForm);
    };

    const handleButton = () => {
        const message = checkValidData(
            emailRef.current.value,
            passwordRef.current.value
        );
        setError(message);

        if (message) return;

        if (!isSignInForm) {
            // Signup logic
            createUserWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: nameRef.current.value,
                    })
                        .then(() => {
                            const { uid, email, displayName } = auth.currentUser;
                            dispatch(
                                addUser({
                                    uid: uid,
                                    email: email,
                                    displayName: displayName,
                                })
                            );
                        })
                        .catch((error) => {
                            setError(error)
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode + "-" + errorMessage);
                    setError(errorCode + "-" + errorMessage);
                    navigate("/error");
                });
        } else {
            signInWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (
                        errorCode ===
                        "auth/invalid-value-(email),-starting-an-object-on-a-scalar-field"
                    ) {
                        setError("User Not Found");
                    } else if (errorCode === "auth/invalid-credential") {
                        setError("Password Invalid");
                    } else {
                        setError(errorCode + "-" + errorMessage);
                    }
                    navigate("/error");
                });
        }
    };

    return (
        <div className="relative min-h-screen">
            <Header />
            <div className="absolute inset-0">
                <img
                    src={BG_LOGO        }
                    alt="background"
                    className="w-full h-full object-cover"
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-10/12 max-w-md lg:my-[13.5vh] absolute text-white p-6  bg-black bg-opacity-75 rounded  md:my-[22vh] my-[22vh] mx-auto left-0 right-0"
            >
                <h1 className="font-bold text-3xl py-4 text-center">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (
                    <input
                        ref={nameRef}
                        type="text"
                        placeholder="Enter Full Name"
                        className="py-2 px-3 mb-4 w-full bg-transparent border-2 border-gray-500 rounded"
                    />
                )}

                <input
                    type="text"
                    ref={emailRef}
                    placeholder="Email or mobile number"
                    className="py-2 px-3 mb-4 w-full bg-transparent border-2 border-gray-500 rounded"
                />
                <input
                    type="password"
                    ref={passwordRef}
                    placeholder="Password"
                    className="py-2 px-3 mb-4 w-full bg-transparent border-2 border-gray-500 rounded"
                />
                <p className="font-bold text-red-600 mb-4">{error}</p>
                <button
                    className="py-2 bg-red-600 w-full rounded font-bold"
                    onClick={handleButton}
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>

                <div
                    className="text-center mt-4 text-slate-300 cursor-pointer"
                    onClick={toggleSignIn}
                >
                    {isSignInForm ? (
                        <>
                            New to CineSage?{" "}
                            <span className="font-bold text-white">Sign Up Now</span>
                        </>
                    ) : (
                        <>
                            Already A Member?{" "}
                            <span className="font-bold text-white">Sign In</span>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;
