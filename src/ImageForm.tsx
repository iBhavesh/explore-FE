import React, { useRef, useState } from "react";

const ImageForm = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const submitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
    if (!imageInputRef.current!.files) {
      console.log("file not found");
      return;
    }
    const image = imageInputRef.current!.files[0];
    fetch("http://localhost:8000/image/upload", {
      method: "POST",
      body: JSON.stringify({
        file: image,
      }),
    });
  };
  return (
    <form onSubmit={submitHandler} method="post" encType="multipart/form-data">
      <label htmlFor="Image">Choose Image</label>
      <input type="file" name="image" id="image" ref={imageInputRef} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageForm;
