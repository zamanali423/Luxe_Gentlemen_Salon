import React, { useState } from "react";
import { useLocation } from "react-router";

const Image = () => {
  const [image, setImage] = useState("");
  const location = useLocation();
  let id = location.search.slice(4);

  // Function to handle file input and convert it to Base64
  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result); // Set the base64 string as the image
      };
      reader.onerror = (error) => {
        console.log("Error converting file to base64: ", error);
      };
    }
  };

  // Function to save the image by making a POST request
  const saveImage = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/services/images?id=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image }), 
        }
      );
      const data = await res.json();
      alert("success")
    } catch (error) {
      console.log("Error saving image:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={convertToBase64} style={{color:"#fff"}}/>
      <button onClick={saveImage}>Upload Image</button>
    </div>
  );
};

export default Image;
