import React from "react";
import "../assets/scss/module/modal.scss";

function BankModal({ setBankModalOpen }) {
  return (
    <div className="modalBackground  d-flex justify-content-center">
      <div className="modalContainer">
        <div className="title">
          <h1>Банкны данс солих </h1>
        </div>
        <div className="body">
          <p>Банк Сонгох</p>
        </div>
        <div className="obody">
          <div className="form-group">
            <p>Дансны дугаар</p>
            <input
              type="text"
              className="form-control"
              placeholder="Хаяг"
              required
            />
          </div>
          <div className="form-group">
            <p>Дансны дугаар</p>
            <input
              type="number"
              className="form-control"
              placeholder="Дүн"
              required
            />
          </div>
        </div>

        <div className="footer">
          <button
            onClick={() => {
              setBankModalOpen(false);
            }}
            id="cancelBtn"
          >
            Болих
          </button>
          <button
            onClick={() => {
              setBankModalOpen(false);
            }}
          >
            Хүлээн Авсан
          </button>
        </div>
      </div>
    </div>
  );
}

export default BankModal;
