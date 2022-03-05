import React, {useState,useRef }from 'react'
import { getAuth, updateProfile } from "firebase/auth";
import { Button } from "../../../components/Button";
import { getStorage, ref } from "firebase/storage";


const auth = getAuth();

export const ProfilePicture = () => {
    //selected image
    const [image, setImage] = useState("");

    const inputFile = useRef(null);

    const handleFileUpload = (e : any ) => {
        
      const { files } = e.target;
      if (files && files.length) {
        const filename = files[0].name;
 
        let parts = filename.split(".");
        const fileType = parts[parts.length - 1];
        console.log("fileType", fileType); 

        setImage(files[0]);
        console.log(files[0])
        
        // updateProfile(auth.currentUser, {
        //     photoURL: files[0]
            
        // }).then(() => {
        //     console.log("profile updated")!
            
        // }).catch(() => {
        //     console.log("An error occured")
        // })
      }
    };

      const onButtonClick = () => {
        inputFile.current.click();
      };
        //Upload a file
    
        //ensure that file is a image file format (jpeg,png)
        //only allow certain image width and height to be used 
        
        //update profile picture


  return (
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

  );
}


  
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

  