import React, { useState, useEffect } from "react";
// import { Modal, Button } from "react-bootstrap";
import { Modal, message } from "antd";
import Service from "../../service/deposit/index";

const Title = ({ data }) => {
  return <span style={{ fontWeight: "bold" }}>Крипто цэнэглэлт{data}</span>;
};
function InModal({ onHide, show, data, tokenId }) {
  const [address, setaddress] = useState(null);
  useEffect(() => {
    getAddress();
  }, []);
  const getAddress = () => {
    try {
      Service.getDepositTokenAddress(tokenId)
        .then((res) => {
          if (res) {
            setaddress(res.data.address);
          }
        })
        .catch((e) => {
          return;
        });
    } catch (e) {
      return message.error("Хаяг татаж чадсангүй");
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
      <div className="w-100">
        {address !== null && (
          <>
            <label>
              <b>{data.tokenName} хаяг</b>
            </label>
            <div className="d-flex align-items-center">
              {address}
              <i
                className="ri-file-copy-line pointer ml-2"
                style={{ color: "#007bff" }}
                onClick={() => copyToClipBoard(address)}
              />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default InModal;
