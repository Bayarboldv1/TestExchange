import React, { useState, useEffect, useContext } from "react";
// import { Modal, Button } from "react-bootstrap";
import { Modal, message, Select } from "antd";
import Service from "../../service/deposit/index";
import { SiteContext } from "../../context/SiteContext/SiteContext";

const { Option } = Select;

const Title = () => {
  return <span style={{ fontWeight: "bold" }}>Хэтэвч цэнэглэлт</span>;
};
function ModalMnt({ onHide, show }) {
  const [value, setvalue] = useState(0);
  const currentUser = useContext(SiteContext);

  const onChangeHandler = (val) => {
    try {
      setvalue(val);
    } catch (e) {
      return;
    }
  };

  const copyToClipBoard = (...str) => {
    try {
      const el = document.createElement("textarea");
      el.value = str;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.textTransform = "unset";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      message.success("Амжилттай хуулагдлаа");
    } catch (e) {
      return;
    }
  };

  return (
    <Modal
      title={<Title />}
      visible={show}
      footer={null}
      onCancel={() => onHide()}
    >
      <div className="row retex--wallet--deposit--modal">
        <div className="col-md-12">
          <h6>
            <strong style={{ color: "red" }}>Анхааруулга:</strong>
          </h6>
          <span style={{ fontSize: "13px" }}>
            Гүйлгээний утга зөвхөн бүртгэлтэй имэйл эсүүл регистрийн дугаараа
            оруулна уу !
          </span>
        </div>
        <div className="col-md-12 mt-4 mb-4">
          <select
            className="w-100 form-control"
            placeholder="Банк сонгох"
            onChange={onChangeHandler}
          >
            <option value="1">Капитрон банк</option>
            <option value="4">Голомт банк</option>
          </select>
        </div>
        {value !== 0 && (
          <div className="col-md-12 d-flex justify-content-between align-items-center">
            <p>Банкны данс</p>
            <p className="d-flex align-items-center">
              <i
                className="ri-file-copy-line pointer"
                style={{ color: "#007bff" }}
                onClick={() =>
                  copyToClipBoard(value === "1" ? "3055010668" : "3015130755")
                }
              />
            </p>
          </div>
        )}
        <div className="col-md-12 d-flex justify-content-between align-items-center">
          <p>Дансны нэр</p>
          <p className="d-flex align-items-center">
            <i
              className="ri-file-copy-line pointer"
              style={{ color: "#007bff" }}
              onClick={() => copyToClipBoard("РЭТЭ ЭКСЧЕЙНЖ ХХК")}
            />
            КОЙНМАРТ ХХК
          </p>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center">
          <p>Гүйлгээний утга</p>
          <p>
            <div className="d-flex align-items-center">
              <i
                className="ri-file-copy-line pointer"
                style={{ color: "#007bff" }}
                onClick={() => copyToClipBoard(currentUser.email)}
              />
              {/* {currentUser.email} */}
            </div>
            <div className="d-flex align-items-center">
              <i
                className="ri-file-copy-line pointer"
                style={{ color: "#007bff" }}
                onClick={() => copyToClipBoard(currentUser.registerNumber)}
              />
              {/* {currentUser.registerNumber} */}
            </div>
          </p>
        </div>
        {/* <div className="col-md-12">
          <button className="btn btn-danger main-btn" onClick={() => hide()}>
            Хаах
          </button>
        </div> */}
      </div>
    </Modal>
  );
}

export default ModalMnt;
