import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

interface GoogleSvgProps {
    invert?: boolean;
    height?: number;
    width?: number;
  }
  
  export default function GoogleSvg({
    invert,
    height = 134,
    width = 134,
  }: GoogleSvgProps) {
    const outerColor = invert ? "#ffffff" : "#181D27";
    const letterWColor = invert ? "#181D27" : "#ffffff";
    const letterTColor = "#457F54";
    
const GoogleAuth = (e : any) => {
  e.preventDefault();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token)
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
    return (
      <button onClick={GoogleAuth}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.7509 10.1943C18.7509 9.47489 18.6913 8.94989 18.5624 8.40546H10.1794V11.6526H15.1C15.0009 12.4596 14.4652 13.6749 13.2747 14.4915L13.258 14.6002L15.9085 16.6125L16.0921 16.6305C17.7786 15.104 18.7509 12.8582 18.7509 10.1943Z" fill="#4285F4"/>
        <path d="M10.1789 18.75C12.5896 18.75 14.6134 17.9722 16.0916 16.6305L13.2741 14.4916C12.5202 15.0069 11.5083 15.3666 10.1789 15.3666C7.81785 15.3666 5.81391 13.8402 5.09956 11.7305L4.99485 11.7392L2.2388 13.8295L2.20276 13.9277C3.67099 16.786 6.68686 18.75 10.1789 18.75Z" fill="#34A853"/>
        <path d="M5.10002 11.7305C4.91153 11.1861 4.80244 10.6027 4.80244 9.99998C4.80244 9.39716 4.91153 8.81385 5.0901 8.26941L5.08511 8.15346L2.29451 6.0296L2.20321 6.07216C1.59808 7.25829 1.25085 8.59026 1.25085 9.99998C1.25085 11.4097 1.59808 12.7416 2.20321 13.9277L5.10002 11.7305Z" fill="#FBBC05"/>
        <path d="M10.179 4.63331C11.8555 4.63331 12.9865 5.34303 13.6313 5.93612L16.1512 3.525C14.6036 2.11528 12.5897 1.25 10.179 1.25C6.68689 1.25 3.671 3.21387 2.20276 6.07218L5.08966 8.26943C5.81393 6.15972 7.81788 4.63331 10.179 4.63331Z" fill="#EB4335"/>
        </svg>
      </button>
    );
  }
  