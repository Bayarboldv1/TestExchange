import React, { useState, useEffect, useContext } from "react";
// import { Modal, Button } from "react-bootstrap";
import { Modal, message, Select, Form } from "antd";
import Service from "../../service/withdraw/index";
import { SiteContext } from "../../context/SiteContext/SiteContext";
import { ModalFooter } from "react-bootstrap";

const Title = () => {
  return <span style={{ fontWeight: "bold" }}>Зарлага</span>;
};
function WithdrawModal({ onHide, show }) {
  const [value, setvalue] = useState("");
  const currentUser = useContext(SiteContext);

  return (
    <Modal
      title={<Title />}
      footer={null}
      visible={show}
      onCancel={() => onHide()}
    >
      <Form className="row retex--wallet--deposit--modal">
        <Form.Item className="col-md-12 mt-2 mb-2">
          <p>Илгээх хаяг</p>
          <input
            className="w-100 form-control"
            placeholder="Илгээх хаяг"
          ></input>
        </Form.Item>
        <Form.Item className="col-md-12  mb-2">
          <p>Илгээх дүн</p>
          <input
            className="w-100 form-control"
            placeholder="Илгээх дүн"
          ></input>
        </Form.Item>
        <div className="col-md-12 d-flex justify-content-between align-items-center">
          Шимтгэл
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center">
          <p>Шимтгэлийн дараах</p>
          <p className="d-flex align-items-center">{}</p>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center">
          <div className="col-md-20">
            <h6>
              <strong style={{ color: "red" }}>Санамж</strong>
            </h6>
            <span style={{ fontSize: "13px" }}>
              • Хамгийн бага зарлага гаргах хэмжээ:: 24 MANA • Та аюулгүй
              байдлыг бүрэн хангасан төхөөрөмж болон веб хөтчөөс хандах
              шаардлагатайг анхаарна уу
            </span>
            <h6>
              <strong style={{ color: "red" }}>Сануулга</strong>
            </h6>
            <span>
              1 өдрийн зарлагын дээд хэмжээ 6,800 USDT (2,138.2665 MANA) байна.
              Таны шилжүүлэг хийх боломжит хэмжээ: 6,800 USDT ( 2,138.2665MANA )
              (24 цагийн дараа буюу 2021-12-18 08:00:00 цагт шилжүүлгийн эрх
              дахин шинэчлэгдэнэ.)
            </span>
          </div>
        </div>
      </Form>
      <ModalFooter>
        <button className="btn btn-primary btn-sm">Баталгаажуулах</button>
      </ModalFooter>
    </Modal>
  );
}

export default WithdrawModal;
