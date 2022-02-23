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
  forgotPassword: (email: string) => Promise<void>;
  signInUserWithGoogleProvider: () => void;
  signInUserWithGithubProvider: () => void;
}

const initialContext: AuthContextInterface = {
  currentUser: null,
  isAuthLoading: false,
  registerUserWithEmailAndPassword: () => {},
  signInUserWithEmailAndPassword: () => {},
  logoutUser: () => {},
  signInUserWithGoogleProvider: () => {},
  signInUserWithGithubProvider: () => {},
  forgotPassword: async () => {},
};

const AuthContext = createContext<AuthContextInterface>(initialContext);
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: FC = ({ children }: any) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    setIsAuthLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      res ? setCurrentUser(res) : setCurrentUser(null);
      setIsAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  const registerUserWithEmailAndPassword = (
    email: string,
    name: string,
    password: string
  ) => {
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

  const signInUserWithEmailAndPassword = (email: string, password: string) => {
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

  const signInUserWithGoogleProvider = () => {
    setIsAuthLoading(true);
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        // setError(err.message);
        alert(err.message);
        console.error(err.message);
      })
      .finally(() => setIsAuthLoading(false));
  };
  const signInUserWithGithubProvider = () => {
    setIsAuthLoading(true);
    const githubProvider = new GithubAuthProvider();
    signInWithPopup(auth, githubProvider)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        // setError(err.message);
        alert(err.message);
        console.error(err.message);
      })
      .finally(() => setIsAuthLoading(false));
  };

  const logoutUser = () => {
    signOut(auth);
  };

  const forgotPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
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
