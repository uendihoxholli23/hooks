import React, { useEffect, useState, useRef } from "react";
import "../index.css";
import { storage } from "../firebaseAuth";
import { listAll, ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { v4 } from "uuid";
import Avatar from "react-avatar-edit";

const Profile = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls(() => [url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls(() => [url]);
        });
      });
    });
  }, []);

  return (
    <>
      <div className="App">
        <div>
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
        </div>

        {imageUrls.map((url, index) => {
          return (
            <img
              key={index}
              src={url}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          );
        })}
        <button onClick={uploadImage}> Upload Image</button>
      </div>
    </>
  );
};

export default Profile;
