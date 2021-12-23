import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, Input, message } from "antd";
import Service from "../../service/withdraw/index";
import UtilService from "../../service/wallet/index";
import VerifyModal from "./VerifyModal";
export default function OutModal({
  id,
  balance,
  tokenDetail,
  modal,
  ...props
}) {
  // const [data, setData] = useState("");
  const [verifyModal, setVerifyModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const data = tokenDetail;
  const tokenID = data.tokenId;
  const tokenNetId = data.id;

  const onChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  const onChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  useEffect(() => {
    onSend();
  }, []);

  const onSend = async () => {
    try {
      const values = {
        address: address,
        amount: amount,
        tokenId: tokenID,
        tokeNetID: tokenNetId,
      };
      setloading(true);
      Service.withdrawNonFiat(values)
        .then((res) => {
          setloading(false);
          if (res.data.status === 200) {
            props.onHide();
            setVerifyModal(true);
          } else {
            message.error("Алдаа гарлаа");
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
      <VerifyModal show={verifyModal} onHide={() => setVerifyModal(false)} />
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Зарлага</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6> Зарлага хийх крипто данс</h6>
          <form name="address" className="form-group">
            <Input
              type="text"
              className="form-control"
              placeholder="Хаяг"
              required
              onChange={(e) => onChangeAddress(e)}
            />
          </form>
          <h6>Сүлжээ</h6>
          <form name="address" className="form-group">
            <select
              type="text"
              className="form-control"
              placeholder="Сүлжээ"
              required
            >
              <option value="erc-20">ERC-20</option>
              <option value="erc-20">ERC-20</option>
            </select>
          </form>
          <div className="row justify-content-between ml-1 mr-1">
            <h6>Зарлага гаргах дүн</h6>
            <h7>
              Боломжит:<strong>{balance}</strong>
            </h7>
          </div>
          <form name="price">
            <div className="input-group mb-3">
              <Input
                type="number"
                className="form-control"
                placeholder="Дүн"
                required
                onChange={(e) => onChangeAmount(e)}
              ></Input>
              <div className="input-group-append">
                <button className="btn btn-primary ">MAX</button>
              </div>
            </div>
            <h6 className="row ml-1">
              Шимтгэл :
              <p className="col" style={{ color: "grey" }}>
                {data.fee}
              </p>
            </h6>
            <h6 className="row ml-1">
              Шимтгэлийн дараах :
              <p className="col" style={{ color: "grey" }}>
                00{}
              </p>
            </h6>
          </form>
          <p>
            <strong>Санамж</strong>
          </p>
          <span style={{ fontSize: "13px" }} className="">
            • Хамгийн бага зарлага гаргах хэмжээ: {data.minWithdraw} • Та
            аюулгүй байдлыг бүрэн хангасан төхөөрөмж болон веб хөтчөөс хандах
            шаардлагатайг анхаарна уу
          </span>
          <p>
            <strong>Сануулга</strong>
          </p>
          <span>
            • 1 өдрийн зарлагын дээд хэмжээ{data.maxWithdraw}байна. Таны
            шилжүүлэг хийх боломжит хэмжээ: {}
            (24 цагийн дараа буюу 2021-12-18 08:00:00 цагт шилжүүлгийн эрх дахин
            шинэчлэгдэнэ.)
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => (loading ? "" : onSend())}>
            {loading ? "Илгээж байна..." : "Баталгаажуулах"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
