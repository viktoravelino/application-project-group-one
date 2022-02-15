import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { auth } from "../../config/firebase";

export const UserProfilePage = () => {
  const currentName = auth.currentUser?.displayName;
  const currentEmail = auth.currentUser?.email;

  const [name, setName] = useState(currentName || "no user logged");
  const [email, setEmail] = useState(currentEmail || "no user logged");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
    try {
      await reauthenticateWithCredential(auth.currentUser!, credential);
      await updatePassword(auth.currentUser!, newPassword);
      alert("Password Updated");
    } catch (error: any) {
      alert(error.message);
    }
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
        <div className="profile-picture border-2 w-36 h-36 rounded-full mb-10"></div>

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
