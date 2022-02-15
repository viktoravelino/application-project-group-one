import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
export const UserProfilePage = () => {
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
          <InputGroup label="Name" type="text" value="John Doe" />
          <InputGroup label="Email" type="email" value="johndoe@mail.com" />

          <ButtonsContainer>
            <Button className="ml-5">Save</Button>
          </ButtonsContainer>
        </BlockContainer>

        <hr className="w-4/6 my-10 border-gray-500" />

        <BlockContainer title="Change Password">
          <InputGroup label="New Password" type="password" value="123456" />
          <InputGroup label="Old Password" type="password" value="123456" />

          <ButtonsContainer>
            <Button className="ml-5">Change Password</Button>
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
        className="bg-transparent outline-none border-0 border-b-2  md:flex-1 md:pl-10"
        type={props.type}
        value={props.value}
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
