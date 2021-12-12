import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Service from "../service/index";
import { Form, Item, Input, message } from "antd";

function OtpVerify() {
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
  const verify = async () => {
    try {
      const values = await form.validateFields();

      values["emailOTP"] = values.emailOTP.trim();
      values["phoneOTP"] = values.phoneOTP.trim();
      console.log("data:", values);
      setloading(true);
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
      return;
    }
  };
  return (
    <>
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          <Form form={form}>
            <span className="mb-2">OTP Баталгаажуулалт</span>
            <Form.Item
              label="E-mail-руу тань явуулсан Баталгаажуулах Кодоо Оруулна уу"
              name="emailOTP"
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
            <Form.Item
              label="Утасруу тань явуулсан Баталгаажуулах Кодоо Оруулна уу"
              name="phoneOTP"
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
              onClick={() => verify()}
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
