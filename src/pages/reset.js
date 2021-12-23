import React, { useState } from "react";
import { Form, message, Input } from "antd";
import { useHistory } from "react-router";

import { Link } from "react-router-dom";
import Service from "../service/auth/index";
import OtpModal from "../components/modals/OtpModal";
import ResetPassword from "../components/modals/ResetPassword";
import ChangePassword from "../components/modals/ChangePassword";

export default function Reset() {
  let history = useHistory();
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setloading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [resetShow, setResetShow] = useState(false);
  //testgam
  const onSend = async () => {
    try {
      const values = await form.validateFields();
      values["email"] = values.email.trim().toLowerCase();
      values["phone"] = values.phone.trim();
      setEmail(values.email.trim());
      setPhone(values.phone.trim());
      setloading(true);
      Service.resetPassword(values)
        .then((res) => {
          if (res.data.status) {
            message.success("Амжилттай илгээгдлээ");
            setModalShow(true);
            form.resetFields();
            // setResetShow(true);
            // history.push("/login");
          } else {
            message.warning(
              "Таны хүсэлтийг биелүүлж чадсангүй. Дахин оролдоно уу ?"
            );
          }
          setloading(false);
        })
        .catch((e) => {
          setloading(false);
          e.response?.status === 400
            ? message.error(e.response?.data?.error)
            : message.error("Алдаа гарлаа");
        });
    } catch (error) {
      return message.error("Алдаа гарлаа");
    }
  };
  return (
    <>
      <ResetPassword
        email={email}
        phone={phone}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ChangePassword
        email={email}
        phone={phone}
        show={resetShow}
        onHide={() => setResetShow(false)}
      />
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          <span>Нууц Үг Сэргээх</span>
          <Form form={form}>
            <Form.Item name="email">
              <Input
                type="email"
                className="form-control"
                placeholder="Email хаягаа оруулна уу"
              />
            </Form.Item>
            <Form.Item name="phone">
              <Input
                type="number"
                className="form-control"
                placeholder="Утасаа оруулна уу"
              />
            </Form.Item>
            <button
              onClick={() => (loading ? "" : onSend())}
              type="submit"
              className="btn btn-primary"
            >
              {loading ? <img src="svg/loading.svg" /> : "Сэргээх"}
            </button>
            <h2>
              Нууц үгээ санасан?
              <Link to="/login"> Нэвтрэх</Link>
            </h2>
          </Form>
        </div>
      </div>
    </>
  );
}
