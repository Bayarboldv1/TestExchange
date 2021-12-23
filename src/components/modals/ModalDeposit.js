import React, { useState, useContext } from "react";
import { Modal, message, Select } from "antd";
import { UserContext } from "../../context/UserContext";
import { BalanceContext } from "../../context/BalanceContext/BalanceContext";

const { Option } = Select;

function ModalDeposit({ onHide, show }) {

  const { user } = useContext(UserContext);
  const { balance } = useContext(BalanceContext);
  const balanceData = balance.selectedBalance;
  const [value, setvalue] = useState(0);

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

  const Title = () => {
    return <span style={{ fontWeight: "bold" }}>{balanceData.tokenType ? balanceData.tokenType === 1 ? "Хэтэвч цэнэглэлт" : "Крипто цэнэглэлт (" + balanceData.tokenTicker + ")" : ""}</span>;
  }

  return (
    <Modal
      title={<Title />}
      visible={show}
      footer={null}
      onCancel={() => onHide()}
    >
      {
        balanceData.tokenType ?
          balanceData.tokenType === 1
            ?
            (<div className="row retex--wallet--deposit--modal">
              <div className="col-md-12">
                <h6>
                  <strong style={{ color: "red" }}>Анхааруулга:</strong>
                </h6>
                <span style={{ fontSize: "13px" }}>
                  Гүйлгээний утга зөвхөн бүртгэлтэй имэйл эсвэл регистрийн дугаараа
                  оруулна уу !
                </span>
              </div>
              <div className="col-md-12 mt-4 mb-4">
                <Select
                  className="w-100 "
                  placeholder="Банк сонгох"
                  onChange={onChangeHandler}
                  defaultValue={value}
                >
                  {
                    balance.depositBanks.map((b, index) => {
                      return (
                        <Option value={index}>{b.name}</Option>
                      )
                    })
                  }
                </Select>
              </div>
              <div className="col-md-12 d-flex justify-content-between align-items-center">
                <p>Банкны данс</p>
                <p className="d-flex align-items-center">
                  <i
                    className="ri-file-copy-line pointer"
                    style={{ color: "#007bff" }}
                    onClick={() =>
                      copyToClipBoard(balance.depositBanks.length > 0 ? balance.depositBanks[value].account : "")
                    }
                  />
                  {balance.depositBanks.length > 0 ? balance.depositBanks[value].account : ""}
                </p>
              </div>
              <div className="col-md-12 d-flex justify-content-between align-items-center">
                <p>Дансны нэр</p>
                <p className="d-flex align-items-center">
                  <i
                    className="ri-file-copy-line pointer"
                    style={{ color: "#007bff" }}
                    onClick={() => copyToClipBoard(balance.depositBanks.length > 0 ? balance.depositBanks[value].accountName : "")}
                  />
                  {
                    balance.depositBanks.length > 0 ? balance.depositBanks[value].accountName : ""
                  }
                </p>
              </div>
              <div className="col-md-12 d-flex justify-content-between align-items-center">
                <p>Гүйлгээний утга</p>
                <p>
                  <div className="d-flex align-items-center">
                    <i
                      className="ri-file-copy-line pointer"
                      style={{ color: "#007bff" }}
                      onClick={() => copyToClipBoard(user.user?.userInfo.email)}
                    />
                    <span style={{ fontWeight: "bold" }} className="white">
                      {user.user?.userInfo.email}
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i
                      className="ri-file-copy-line pointer"
                      style={{ color: "#007bff" }}
                      onClick={() => copyToClipBoard(user.user?.userInfo.register)}
                    />
                    <span style={{ fontWeight: "bold", textAlign: 'right' }} className="white">
                      {user.user?.userInfo.register}
                    </span>
                  </div>
                </p>
              </div>
            </div>)
            :
            balanceData.tokenType === 2
              ?
              (<div className="w-100">
                {balanceData.depositAddress && (
                  <>
                    <label>
                      <b>{balanceData.tokenName} хаяг</b>
                    </label>
                    <div className="d-flex align-items-center">
                      {balanceData.depositAddress}
                      <i
                        className="ri-file-copy-line pointer ml-2"
                        style={{ color: "#007bff" }}
                        onClick={() => copyToClipBoard(balanceData.depositAddress)}
                      />
                    </div>
                  </>
                )}
              </div>)
              : null
          : null
      }
    </Modal>
  );
}

export default ModalDeposit;
