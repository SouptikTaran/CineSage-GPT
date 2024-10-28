import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addUser } from "../utils/userSlice";
import { BG_LOGO } from "../utils/constants";
import { NotificationManager, NotificationContainer } from "react-notifications";
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

function validatePassword(password) {
    const errors = [];

    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one digit.");
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
        errors.push("Password must contain at least one special character.");
    }
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }

    return errors.length > 0 ? errors : null;
}

const Login = () => {
    const [isSignInForm, setisSignInForm] = useState(true);
    const [error, setError] = useState([]);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const nameRef = useRef(null);
    const dispatch = useDispatch();

    const toggleSignIn = () => {
        setisSignInForm(!isSignInForm);
        setError([]);  // Clear errors on form toggle
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleButton = () => {
        const passwordErrors = validatePassword(passwordRef.current.value);
        if (passwordErrors) {
            setError(passwordErrors);
            return;
        }

        const message = checkValidData(emailRef.current.value, passwordRef.current.value);
        if (message) {
            setError([message]);
            return;
        }

        setError([]);  // Clear errors if validation passes

        if (!isSignInForm) {
            // Signup logic
            createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, { displayName: nameRef.current.value })
                        .then(() => {
                            const { uid, email, displayName } = auth.currentUser;
                            dispatch(addUser({ uid, email, displayName }));
                            NotificationManager.success("Account created successfully!");
                        })
                        .catch(setError);
                })
                .catch((error) => {
                    setError([`${error.code} - ${error.message}`]);
                    navigate("/error");
                });
        } else {
            signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then(() => {
                    NotificationManager.success("Successfully Logged in");
                    navigate("/");
                })
                .catch((error) => {
                    let message = `${error.code} - ${error.message}`;
                    if (error.code === "auth/user-not-found") message = "User Not Found";
                    if (error.code === "auth/wrong-password") message = "Password Invalid";
                    setError([message]);
                    NotificationManager.error(message);
                    navigate("/error");
                });
        }
    };

    const handleGoogleSignUp = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            NotificationManager.success("Successfully signed in with Google");
        } catch (err) {
            let message = err.message;
            switch (err.code) {
                case "auth/operation-not-allowed":
                    message = "Email/password accounts are not enabled.";
                    break;
                case "auth/operation-not-supported-in-this-environment":
                    message = "HTTP protocol is not supported. Please use HTTPS.";
                    break;
                case "auth/popup-blocked":
                    message = "Popup has been blocked by the browser. Please allow popups for this website.";
                    break;
                case "auth/popup-closed-by-user":
                    message = "Popup has been closed by the user before finalizing the operation.";
                    break;
                default:
                    NotificationManager.error(err.code);
                    break;
            }
            setError([message]);
            NotificationManager.error(message);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            <Header />
            <div className="absolute inset-0 -z-10">
                <img src={BG_LOGO} alt="background" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center justify-center min-h-screen">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="w-10/12 max-w-md text-white p-6 bg-black bg-opacity-75 rounded-lg"
                >
                    <div className="text-center">
                        <h1 className="font-bold text-3xl pt-4">
                            {isSignInForm ? "Welcome Back To CineSage" : "Welcome to CineSage"}
                        </h1>
                        <h6 className="text-slate-500 text-xs  pb-4 pt-2">
                            {isSignInForm ? "" : "Sign in to start streaming your favorite movies and shows"}
                        </h6>
                    </div>
                    {!isSignInForm && (
                        <input
                            ref={nameRef}
                            type="text"
                            placeholder="Full name"
                            className="py-2 px-4 mb-4 w-full bg-transparent border-2 border-gray-500 rounded"
                        />
                    )}
                    <input
                        type="text"
                        ref={emailRef}
                        placeholder="johndoe@example.com"
                        className="py-2 px-4  mb-4 w-full bg-transparent border-2 border-gray-500 rounded"
                    />
                    <div className="relative">
                        <input
                            type={isPasswordVisible ? "text" : "password"}
                            ref={passwordRef}
                            placeholder="Password"
                            className="py-2 px-4 mb-4 w-full bg-transparent border-2 border-gray-500 rounded"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-2"
                        >
                            {isPasswordVisible ? (
                                <EyeOffIcon className="w-6 h-6 text-gray-500" />
                            ) : (
                                <EyeIcon className="w-6 h-6 text-gray-500" />
                            )}
                        </button>
                    </div>
                    {error.length > 0 && (
                        <ul className="text-red-600 mb-4">
                            {error.map((err, idx) => (
                                <li key={idx} className="font-bold">{err}</li>
                            ))}
                        </ul>
                    )}
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
                    <div className="flex items-center justify-center mt-5">
                        <button
                            className="py-2 w-full border bg-white text-black flex items-center justify-center gap-2 border-slate-200 rounded-lg hover:bg-black hover:text-white hover:shadow transition duration-150"
                            onClick={handleGoogleSignUp}
                        >
                            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                            <span>Login with Google</span>
                        </button>
                    </div>
                    <NotificationContainer />
                </form>
            </div>
        </div>
    );
};

export default Login;


