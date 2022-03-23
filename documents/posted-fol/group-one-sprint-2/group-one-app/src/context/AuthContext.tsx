import { createContext, FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "../config/firebase";
import { capitalizeFirstLettersEachWord } from "../lib/helpers";

// Define context types for TypeScript
interface AuthContextInterface {
  currentUser: User | null;
  isAuthLoading: boolean;
  registerUserWithEmailAndPassword: (
    email: string,
    name: string,
    password: string
  ) => void;
  signInUserWithEmailAndPassword: (email: string, password: string) => void;
  logoutUser: () => void;
  forgotPassword: (email: string) => void;
  signInUserWithGoogleProvider: () => void;
  signInUserWithGithubProvider: () => void;
}

// Initialize the context values with empty values
const initialContext: AuthContextInterface = {
  currentUser: null,
  isAuthLoading: false,
  registerUserWithEmailAndPassword: () => {},
  signInUserWithEmailAndPassword: () => {},
  logoutUser: () => {},
  signInUserWithGoogleProvider: () => {},
  signInUserWithGithubProvider: () => {},
  forgotPassword: () => {},
};

// Create the context using empty values initialized before
const AuthContext = createContext<AuthContextInterface>(initialContext);

// Create a custom hook to make it easier to use through the application
export const useAuth = () => useContext<AuthContextInterface>(AuthContext);

export const AuthContextProvider: FC = ({ children }: any) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsAuthLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      res ? setCurrentUser(res) : setCurrentUser(null);
      setIsAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  /**
   * This function register a new user into firebase
   * using an email, name and password
   * @param email String: Email to register the user
   * @param name String: Profile name
   * @param password String: User's password
   * @returns void: The function does not returns anything
   *
   * The function throws error if the password does not satisfy minimal requirements
   * and other things.
   * Check firebase docs for other errors
   */
  const registerUserWithEmailAndPassword = (
    email: string,
    name: string,
    password: string
  ): void => {
    setIsAuthLoading(true);
    name = capitalizeFirstLettersEachWord(name);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        return updateProfile(auth.currentUser!, {
          displayName: name,
          photoURL: `https://avatars.dicebear.com/api/initials/${name.replace(
            / /g,
            "%20"
          )}.svg`,
        });
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err.message);
        console.error(err.message);
      })
      .finally(() => setIsAuthLoading(false));
  };

  /**
   * This function login/sign in an user from firebase
   * using user's email and password
   * @param email String: Email to register the user
   * @param password String: User's password
   * @returns void: The function does not returns anything
   *
   * The function throws an error in case the password is wrong or
   * the user does not exists, etc.
   * Check firebase docs for other errors
   */
  const signInUserWithEmailAndPassword = (
    email: string,
    password: string
  ): void => {
    setIsAuthLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err.message);
        console.error(err.message);
      })
      .finally(() => setIsAuthLoading(false));
  };

  /**
   * This function login/sign in an user from firebase
   * using user's Google Account - It shows a popup for the user to
   * select its account and login
   *
   * Check firebase docs for other errors
   */
  const signInUserWithGoogleProvider = (): void => {
    setIsAuthLoading(true);
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err.message);
        console.error(err.message);
      })
      .finally(() => setIsAuthLoading(false));
  };

  /**
   * This function login/sign in an user from firebase
   * using user's Github Account - It shows a popup for the user to
   * select its account and login
   *
   * Check firebase docs for other errors
   */
  const signInUserWithGithubProvider = (): void => {
    setIsAuthLoading(true);
    const githubProvider = new GithubAuthProvider();
    signInWithPopup(auth, githubProvider)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err.message);
        console.error(err.message);
      })
      .finally(() => setIsAuthLoading(false));
  };

  /**
   * This function logout the user out
   */
  const logoutUser = (): void => {
    signOut(auth);
  };

  /**
   * This function send a reset password email to the user
   * @param email String: Email for the reset password link be sent to
   *
   * Check firebase docs for errors
   */
  const forgotPassword = (email: string): void => {
    setIsAuthLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Email sent!");
        navigate("/login");
      })
      .catch((err) => {
        alert(err.message);
        console.error(err.message);
      })
      .finally(() => setIsAuthLoading(false));
  };

  const contextValue: AuthContextInterface = {
    currentUser,
    isAuthLoading,
    registerUserWithEmailAndPassword,
    signInUserWithEmailAndPassword,
    logoutUser,
    forgotPassword,
    signInUserWithGoogleProvider,
    signInUserWithGithubProvider,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
