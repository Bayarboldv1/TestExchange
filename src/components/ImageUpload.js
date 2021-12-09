import React, { useState } from "react";

const ImageUpload = () => {
  const [picture, setPicture] = useState(null);

  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div className="imageCard">
      <div className="id_image">
        <input
          id="idPic"
          type="file"
          className="fileButton"
          onChange={onChangePicture}
        />
      </div>
      <div className="preidImg mt-2">
        <img
          className="imaged rounded mx-auto d-block"
          src={picture && picture}
        ></img>
      </div>
    </div>
  );
};

export default ImageUpload;
