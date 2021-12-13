import React, { useState } from "react";
import { Form, message, Input } from "antd";
import { useHistory } from "react-router";

import { Link } from "react-router-dom";
import Service from "../service/auth/index";

export default function Reset() {
  let history = useHistory();
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);

  const onSend = async () => {
    try {
      const values = await form.validateFields();
      values["email"] = values.email.trim().toLowerCase();
      console.log("dsa", values);
      Service.resetPassword(values)
        .then((res) => {
          if (res.data.status) {
            message.success("Амжилттай илгээгдлээ");
            form.resetFields();
            history.push("/login");
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
            <button
              onClick={() => onSend()}
              type="submit"
              className="btn btn-primary"
            >
              Сэргээх
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
