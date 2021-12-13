import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Service from "../service/auth/index";
import { Form, Item, Input, message } from "antd";

function OtpVerify({ route }) {
  var email = { email };
  var phone = { phone };
  let history = useHistory();
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();
  const inputHandler = (e) => {
    const { value, maxLength } = e.target;
    if (String(value).length >= maxLength) {
      e.preventDefault();
      return;
    }
  };
  const onSend = async () => {
    try {
      const values = await form.validateFields();

      values["emailOTP"] = values.emailOTP.trim();
      values["phoneOTP"] = values.phoneOTP.trim();
      values["email"] = email.trim();
      values["phone"] = phone.trim();
      console.log("sss");
      setloading(true);
      console.log("data:", values);
      Service.verify(values)
        .then((res) => {
          if (res.data.status) {
            return history.push("/login");
          } else {
            return message.error("Баталгаажуулах код таарахгүй байна!");
          }
        })
        .catch((e) => {
          setloading(false);
          if (e.response?.status === 406) {
            return message.error(e.response.data.error);
          }
          if (e.response?.status === 400) {
            return message.error(e.response.data.error);
          } else {
            return message.error("Баталгаажуулах хийж чадсангүй");
          }
        });
    } catch (e) {
      return message.error("Баталгаажуулах хийж чадсангүй");
    }
  };
  return (
    <>
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          <span className="mb-2">OTP Баталгаажуулалт</span>
          <Form form={form}>
            <p>E-mail-руу тань явуулсан Баталгаажуулах Кодоо Оруулна уу</p>
            <Form.Item
              name="emailOTP"
              rules={[
                {
                  min: 6,
                  message: "Баталгаажуулах код 6 оронтой байх ёстой",
                },
              ]}
            >
              <Input
                maxlength="6"
                type="number"
                className="form-control mb-4"
                placeholder=""
                onKeyPress={inputHandler}
                required
              />
            </Form.Item>
            <p>Утасруу тань явуулсан Баталгаажуулах Кодоо Оруулна уу</p>
            <Form.Item
              name="phoneOTP"
              rules={[
                {
                  min: 6,
                  message: "Баталгаажуулах код 6 оронтой байх ёстой",
                },
              ]}
            >
              <Input
                maxlength="6"
                type="number"
                className="form-control"
                placeholder=""
                required
                onKeyPress={inputHandler}
              />
            </Form.Item>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => onSend()}
            >
              Баталгаажуулах
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default OtpVerify;
