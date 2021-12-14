import { useContext, useState } from "react";
import { Modal, Select, message } from "antd";
import { SiteContext } from "../../context/SiteContext/SiteContext";
const { Option } = Select;

const Title = () => {
  return <span style={{ fontWeight: "bold" }}>Хэтэвч цэнэглэлт</span>;
};
function DepositModalMnt({ hide, show }) {
  const [value, setvalue] = useState(0);
  const {
    state: { currentUser },
  } = useContext(SiteContext);

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
      onCancel={() => hide()}
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
          <Select
            className="w-100"
            placeholder="Банк сонгох"
            onChange={onChangeHandler}
          >
            <Option value="1">Капитрон банк</Option>
            <Option value="4">Голомт банк</Option>
          </Select>
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
              {value === "1" && "3055010668"}
              {value === "4" && "3015130755"}
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
            РЭТЭ ЭКСЧЕЙНЖ ХХК
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
              {currentUser.email}
            </div>
            <div className="d-flex align-items-center">
              <i
                className="ri-file-copy-line pointer"
                style={{ color: "#007bff" }}
                onClick={() => copyToClipBoard(currentUser.registerNumber)}
              />
              {currentUser.registerNumber}
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
export default DepositModalMnt;
