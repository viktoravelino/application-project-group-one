import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useState, useRef } from "react";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { auth } from "../../config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const UserProfilePage = () => {
  const currentName = auth.currentUser?.displayName;
  const currentEmail = auth.currentUser?.email;
  const currentImage = auth.currentUser?.photoURL;

  const [name, setName] = useState(currentName || "no user logged");
  const [email, setEmail] = useState(currentEmail || "no user logged");
  const [picture, setPicture] = useState(currentImage || "no user logged");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState(oldPassword);
  


  const inputFile = useRef<HTMLInputElement>(null);

  const handleSaveBasicInfo = async () => {
    let functions = [];
    if (name !== "no user logged") {
      functions.push(
        updateProfile(auth.currentUser!, {
          displayName: name,
        })
      );
    }

    if (email !== "no user logged") {
      functions.push(updateEmail(auth.currentUser!, email));
    }

    try {
      await Promise.all(functions);
      alert("Information Updated");
    } catch (error: any) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || !oldPassword) return;
    const credential = EmailAuthProvider.credential(currentEmail!, oldPassword);
    console.log(credential);
    try {
      await reauthenticateWithCredential(auth.currentUser!, credential);
      await updatePassword(auth.currentUser!, newPassword);
      alert("Password Updated");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleChangeEmail = async () => {
  if(newEmail === currentEmail) return alert("Email already in use");
  
  const credential = EmailAuthProvider.credential(currentEmail!, currentPassword);
  console.log(credential);
  try {
    await reauthenticateWithCredential(auth.currentUser!, credential);
    await updateEmail(auth.currentUser!, newEmail);
    alert("Email Updated");
  } catch (error: any) {
    alert(error.message);
  }
  }
  

    const handleFileUpload =  async (e : any ) => {
      const { files } = e.target;
      const filename = files[0].name;
      console.log(files[0]);
      const storage = getStorage();
      const storageRef = ref(storage, `ProfilePictures/${currentName}/${filename}`);
      try{
      // 'file' comes from the Blob or File API
      await uploadBytes(storageRef, files[0]).then(() => {

        //download file
         getDownloadURL(ref(storage, `ProfilePictures/${currentName}/${filename}`))
        .then((url)=>{
          console.log(url)
          updateProfile(auth.currentUser!, {
            photoURL: url
          })
           //change profile picture to new one
          setPicture(url);
        });
    

        
      });
      }catch(error : any) { return error.message}

  
    }

    const onButtonClick = () => {
      inputFile?.current?.click();
    };

  return (
    <div
      className="
      user-profile-page bg-gray-800 w-full min-h-[calc(100vh-3rem)] text-gray-200
      md:min-h-[calc(100vh-4rem)]
      scroll-auto
      "
    >
      <Header />

      <main
        className="main mt-12 md:mt-16 h-full
        pb-10
        flex flex-col items-center pt-8
        bg-gray-700
        "
      >

    <BlockContainer title="Profile Picture">
        <img className="profile-picture border-2 w-36 h-36 rounded-full mb-10"
        src={picture}/> 
        <ButtonsContainer>
             <Button>
                <input
                style={{ display: "none" }}
                accept=".png,.jpg"
                ref={inputFile}
                onChange={handleFileUpload}
                type="file"
              />
            <div className="button" onClick={onButtonClick}>
            Upload
         </div>
      </Button>
      </ButtonsContainer>
    </BlockContainer>

    <hr className="w-4/6 my-10 border-gray-500" />
    <BlockContainer title="Basic Info">
          <InputGroup
            onChange={setName}
            label="Name"
            type="text"
            value={name}
          />
          <InputGroup
            onChange={setEmail}
            label="Email"
            type="email"
            value={email}
          />

          <ButtonsContainer>
            <Button onClick={handleSaveBasicInfo} className="ml-5">
              Save
            </Button>
          </ButtonsContainer>
        </BlockContainer>
        
        <hr className="w-4/6 my-10 border-gray-500" />

        <BlockContainer title="Change Email">
        <InputGroup
            onChange={setCurrentPassword}
            value={currentPassword}
            label="Current Password"
            type="password"
          />
          <InputGroup
            onChange={setNewEmail}
            label="New Email"
            type="email"
            value={newEmail}
          />

          <ButtonsContainer>
            <Button onClick={handleChangeEmail} className="ml-5">
              Change Email
            </Button>
          </ButtonsContainer>
        </BlockContainer>

        <hr className="w-4/6 my-10 border-gray-500" />

        <BlockContainer title="Change Password">
          <InputGroup
            onChange={setNewPassword}
            label="New Password"
            type="password"
            value={newPassword}
          />
          <InputGroup
            onChange={setOldPassword}
            value={oldPassword}
            label="Old Password"
            type="password"
          />

          <ButtonsContainer>
            <Button onClick={handleChangePassword} className="ml-5">
              Change Password
            </Button>
          </ButtonsContainer>
        </BlockContainer>
      </main>
    </div>
  );
};

const InputGroup = (props: any) => {
  return (
    <div
      className="input-group
      w-11/12
      flex items-center mb-4
      md:text-right
      md:w-10/12
      "
    >
      <label className="pr-2 font-bold md:text-xl">{props.label}:</label>
      <input
        className="bg-transparent outline-none border-0 border-b-2  md:flex-1 md:pl-10 rounded
        focus:ring-2 focus:ring-green-500 focus:border-0
        "
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

const ButtonsContainer = (props: any) => {
  return (
    <div
      className="
  mt-5
  flex flex-row justify-end
  buttons w-10/12
  md:w-10/12
  "
    >
      {props.children}
    </div>
  );
};

const BlockContainer = (props: any) => {
  return (
    <div
      className="basic-info 
          flex flex-col
          items-center
          w-11/12
          md:w-6/12
          "
    >
      <span className="self-start mb-2">{props.title}</span>
      {props.children}
    </div>
  );
};
