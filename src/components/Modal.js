import React from "react";
import "../assets/scss/module/modal.scss";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>Орлого </h1>
        </div>
        <div className="body">
          <p>Орлого хийх крипто данс:</p>
          <p>bc1qd8z28thjmk6vc546mnxt8xm7x0ykczezl08jq9</p>
        </div>
        <div className="qrt  col-md-4">
          <img
            // className="col-md-4"
            src={"img/qr-code-dark.svg"}
            alt="qr-code"
          />
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
