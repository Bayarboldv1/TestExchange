import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Modal, Button } from "react-bootstrap";
import Service from "../../service/auth/index";
import { formatMoney } from "../helper/utils";
import { Form, Input, message, Space, Tooltip, Typography } from "antd";
export default function OtpModal(props) {
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  let history = useHistory();
  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      values["emailOTP"] = values.emailOTP.trim();
      values["smsOTP"] = values.smsOTP.trim();
      setloading(true);
      console.log("data", values);
      Service.verify(values)
        .then((res) => {
          if (res.data.status) {
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
    } catch (errorInfo) {
      return;
    }
  };

  const mail = async () => {
    try {
      Service.emailOTP()
        .then((res) => {
          if (res.data.status) {
            message.success("res.data.message");
          }
          setloading(false);
        })
        .catch((e) => {
          e.response?.status === 400
            ? message.error(e.response?.data?.error)
            : message.error("Алдаа гарлаа");
        });
    } catch (errorInfo) {
      return;
    }
  };

  const sms = async () => {
    try {
      Service.smslOTP()
        .then((res) => {
          if (res) {
            setloading({
              ...loading,
            });
            message.success(res.data.message);
          }
        })
        .catch((e) => {
          e.response?.status === 400
            ? message.error(e.response?.data?.error)
            : message.error("Алдаа гарлаа");
          setloading({
            ...loading,
          });
        });
    } catch (errorInfo) {
      return;
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          OTP баталгаажуулалт
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p> Email баталгаажуулалт</p>
        <Form form={form}>
          <Form.Item name="emailOTP">
            <form className="form-group row">
              <Input
                type="number"
                className="form-control ml-3 col-8"
                required
                placeholder="Баталгаажуулалтын 6 оронтой код"
              />
              <button
                onClick={() => (loading ? "" : mail())}
                className=" ml-3 col-3 btn btn-link "
              >
                Илгээх
              </button>
            </form>
          </Form.Item>
          <p> Утас баталгаажуулалт {props.email}</p>
          <Form.Item name="smsOTP">
            <form className="form-group row">
              <Input
                type="number"
                className="form-control ml-3 col-md-8"
                placeholder="Баталгаажуулалтын 6 оронтой код"
                required
              />
              <button
                onClick={() => (loading ? "" : sms())}
                className="ml-3 col-3 btn btn-link "
              >
                {loading ? "Илгээж байна..." : "Илгээх"}
              </button>
            </form>
          </Form.Item>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onCheck()}>Баталгаажуулах</Button>
      </Modal.Footer>
    </Modal>
  );
}
