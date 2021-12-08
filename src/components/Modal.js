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

          <div className="copy">
            <p>bc1qd8z28thjmk6vc546mnxt8xm7x0ykczezl08jq9</p>
            <button className="btn btn-sm btn-link">Хуулах</button>
          </div>
        </div>
        <div className="lbody">
          <div className="qrt  col-md-4">
            <p>QR Code</p>
            <img
              className="img-fluid w-100"
              src={"img/qr-code-dark.svg"}
              alt="qr-code"
            />
          </div>
          <div className="btext">
            <h5>Санамж</h5>
            <li>
              Энэхүү крипто данс руу {} -с өөр койн илгээж болохгүйг анхаарна
              уу!
            </li>
            <li>
              Энэхүү крипто данс руу шилжүүлэг хийх нь сүлжээний баталгаажуулалт
              шаардана
            </li>
            <li>
              Хамгийн бага орлогын хэмжээ: 0.01 {}. Үүнээс бага орлого
              шилжүүлсэн тохиодолд орохгүй бөгөөд буцаах боломжгүй.
            </li>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Болих
          </button>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Хүлээн Авсан
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
