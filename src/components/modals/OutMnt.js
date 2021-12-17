import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, Input, message } from "antd";
import Service from "../../service/withdraw/index";
import { UserConsumer } from "../../context/UserContext";

export default function OutMnt(props) {
  const [data, setData] = useState("");
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    onSend();
  }, []);

  const onSend = async () => {
    try {
      const values = await form.validateFields();
      values["address"] = values.address.trim();
      values["price"] = values.price.trim();
      console.log("ss", values);
      setloading(true);
      Service.withdrawFiat(values)
        .then((res) => {
          setloading(false);
          if (res.data.status === 200) {
            message.success("Амжилттай");
          } else {
            message.error("Алдаа гарлаа");
          }
        })
        .catch((e) => {
          message.error("alda1");
        });
    } catch (e) {
      return message.error("alda2");
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Зарлага</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6> Зарлага хийх данс</h6>
        <Form form={form}>
          <Form.Item name="address" className="form-group">
            <Input type="text" className="form-control" required disabled>
              <UserConsumer>
                {({ user }) => {
                  return (
                    <span style={{ fontWeight: "bold" }} className="white">
                      {user.user.userInfo.bankAccount}
                    </span>
                  );
                }}
              </UserConsumer>
            </Input>
          </Form.Item>
          <div className="row justify-content-between ml-1 mr-1">
            <h6>Зарлага гаргах дүн</h6>
            <h7>
              Боломжит:<strong>{}</strong>
            </h7>
          </div>
          <Form.Item name="price">
            <Input
              type="number"
              className="form-control mb-4"
              placeholder="Дүн"
              required
            />
            <h6 className="row ml-1">
              Шимтгэл :
              <p className="col" style={{ color: "grey" }}>
                00{}
              </p>
            </h6>
            <h6 className="row ml-1">
              Шимтгэлийн дараах :
              <p className="col" style={{ color: "grey" }}>
                00{}
              </p>
            </h6>
          </Form.Item>
          <p>
            <strong>Санамж</strong>
          </p>
          <span style={{ fontSize: "13px" }} className="">
            • Хамгийн бага зарлага гаргах хэмжээ: {} • Та аюулгүй байдлыг бүрэн
            хангасан төхөөрөмж болон веб хөтчөөс хандах шаардлагатайг анхаарна
            уу
          </span>
          <p>
            <strong>Сануулга</strong>
          </p>
          <span>
            • 1 өдрийн зарлагын дээд хэмжээ{}байна. Таны шилжүүлэг хийх боломжит
            хэмжээ: {}
            (24 цагийн дараа буюу 2021-12-18 08:00:00 цагт шилжүүлгийн эрх дахин
            шинэчлэгдэнэ.)
          </span>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onSend()}>Баталгаажуулах</Button>
      </Modal.Footer>
    </Modal>
  );
}
