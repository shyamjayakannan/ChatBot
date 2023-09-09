"use client";
import React, { useState } from "react";
import classes from "../../styles/Upload.module.css";
import Image from "next/image";

const FileUpload = ({ setFile, selectedImage, setSelectedImage }) => {
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    const newfile = e.target.files[0];
    if (newfile) {
      reader.onload = (e) => {
        setSelectedImage(e.target?.result);
      };
      reader.readAsDataURL(newfile);
    }
  };

  return (
    <div className={classes.file_input_wrapper}>
      <input
        type="file"
        id="file"
        name="file"
        className={classes.file_input}
        onChange={handleFileChange}
      />
      <label htmlFor="file" className={classes.file_input_label}>
        <Image src={"/upload.svg"} width={30} height={30} alt="upload" />
      </label>
      <div className={classes.fileImage}>
        {selectedImage && (
          <div
            className={classes.delete}
            onClick={() => setSelectedImage(null)}
          >
            X
          </div>
        )}
        {selectedImage && <img src={selectedImage} alt="file" />}
      </div>
    </div>
  );
};

export default FileUpload;
