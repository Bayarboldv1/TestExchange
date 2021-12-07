import React from "react";
import "../assets/scss/module/modal.scss";

function OutModal({ setOpenOutModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>Зарлага </h1>
        </div>
        <div className="body">
          <p>Зарлага хийх крипто данс</p>
        </div>
        <div className="obody">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Хаяг"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              placeholder="Дүн"
              required
            />
          </div>
          <p>44</p>
        </div>

        <div className="footer">
          <button
            onClick={() => {
              setOpenOutModal(false);
            }}
            id="cancelBtn"
          >
            Болих
          </button>
          <button>Зарлага Гарах</button>
        </div>
      </div>
    </div>
  );
}

export default OutModal;
