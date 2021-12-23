import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, Input, message } from "antd";
import Service from "../../service/withdraw/index";
import { UserConsumer } from "../../context/UserContext";
import VerifyModal from "./VerifyModal";
import UtilService from "../../service/wallet/index";

export default function OutMnt({ tokenDetail, balance, ...props }) {
  // const [data, setData] = useState("");
  const [verifyModal, setVerifyModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();
  const [amount, setAmount] = useState("");
  const data = tokenDetail;
  const tokenID = data.tokenId;
  const tokenNetId = data.id;

  const onChange = (event) => {
    setAmount(event.target.value);
  };

  useEffect(() => {
    onSend();
  }, []);
  const gg = () => {
    props.onHide();
    setVerifyModal(true);
  };

  const onSend = async () => {
    try {
      const values = {
        amount: amount,
        tokenId: tokenID,
        tokenNetId: tokenNetId,
      };
      console.log("FIAT", values);
      setloading(true);
      Service.withdrawFiat(values)
        .then((res) => {
          setloading(false);
          if (res.data.status === 400) {
            props.onHide();
            setVerifyModal(true);
          }
        })
        .catch((e) => {
          setloading(false);
          message.error("alda1");
        });
    } catch (e) {
      return message.error("alda2");
    }
  };

  return (
    <>
      {tokenDetail !== null && (
        <>
          <VerifyModal
            show={verifyModal}
            onHide={() => setVerifyModal(false)}
          />
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Зарлага MNT
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6> Зарлага хийх данс</h6>
              <UserConsumer>
                {({ user }) => {
                  return (
                    <form className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        placeholder={user.user.userInfo.bankAccount}
                      ></input>
                    </form>
                  );
                }}
              </UserConsumer>
              <div className="row justify-content-between ml-1 mr-1">
                <h6>Зарлага гаргах дүн</h6>
                <h7>
                  Боломжит:<strong>{balance}</strong>
                </h7>
              </div>
              <div className="input-group mb-3">
                <Input
                  value={amount}
                  type="number"
                  className="form-control"
                  placeholder="Дүн"
                  required
                  onChange={(e) => onChange(e)}
                ></Input>
                <div className="input-group-append">
                  <button className="btn btn-primary ">MAX</button>
                </div>
              </div>
              <h6 className="row ml-1">
                Шимтгэл :
                <p className="col" style={{ color: "grey" }}>
                  {}
                </p>
              </h6>
              <h6 className="row ml-1">
                Шимтгэлийн дараах :
                <p className="col" style={{ color: "grey" }}>
                  {}
                </p>
              </h6>
              <p>
                <strong>Санамж</strong>
              </p>
              <span style={{ fontSize: "13px" }} className="">
                • Хамгийн бага зарлага гаргах хэмжээ: {} • Та аюулгүй байдлыг
                бүрэн хангасан төхөөрөмж болон веб хөтчөөс хандах шаардлагатайг
                анхаарна уу
              </span>
              <p>
                <strong>Сануулга</strong>
              </p>
              <span>
                • 1 өдрийн зарлагын дээд хэмжээ{}байна. Таны шилжүүлэг хийх
                боломжит хэмжээ: {}
                (24 цагийн дараа буюу 2021-12-18 08:00:00 цагт шилжүүлгийн эрх
                дахин шинэчлэгдэнэ.)
              </span>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => (loading ? "" : onSend())}>
                {loading ? "Илгээж байна..." : "Баталгаажуулах"}
              </Button>
              <button onClick={() => gg()}>gg</button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
