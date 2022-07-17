import React, { useState } from "react";
import Axios from "axios";

const key = process.env.REACT_APP_CLOUDINARY_PRESET;

function UploadImage() {
  const [image, setImage] = useState(undefined);
  const handleChange = (files) => {
    console.log(files[0]);
    setImage(files[0]);
  };
  const handleSubmit = () => {
    if (image === undefined) return;
    const formData = new FormData();
    formData.append("file", image);

    let k = key.toString().slice(0, -1)
    formData.append("upload_preset", k);

    Axios.post(
      "https://api.cloudinary.com/v1_1/dyjj9njcj/image/upload",
      formData
    )
      .then((res) => {
        console.log(res.data.secure_url);
        prompt("Image Uploaded", "Ya hoo");
      })
      .catch((res) => {
        console.log(res.data.secure_url);
        prompt("Image Not Uploaded", "jokes on you");
      });
  };
  return (
    < >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleChange(e.target.files)}
      />

      <button className="btn btn-secondary" onClick={() => handleSubmit()}>
        upload Image
      </button>
    </ >
  );
}

export default UploadImage;
