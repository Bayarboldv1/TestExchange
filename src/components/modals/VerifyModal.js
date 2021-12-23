import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Service from "../../service/settings/index";
import { Form, Input, message, Space, Tooltip, Typography } from "antd";

export default function VerifyModal({ ...props }) {
  const [mailOTP, setMailOTP] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [loading, setloading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const onChangeMailOTP = (event) => {
    setMailOTP(event.target.value);
  };

  const onChangePhoneOTP = (event) => {
    setPhoneOTP(event.target.value);
  };

  const onCheck = async () => {
    try {
      if (mailOTP.length != 6 || phoneOTP.length != 6) {
        message.warning("Баталгаажуулах код 6 оронтой байна.");
        return;
      }
      const values = {
        emailOTP: mailOTP,
        phoneOTP: phoneOTP,
      };
      setloading(true);
      console.log("data", values);
      Service.verifyOTP(values)
        .then((res) => {
          if (res.data.status === 200) {
            message.success("Амжилттай солигдлоо");
            props.onHide();
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
            ? message.error(e.response?.data?.message)
            : message.error("Алдаа гарлаа");
        });
    } catch (errorInfo) {
      return;
    }
  };

  const mail = async () => {
    setResendLoading(true);
    Service.createEmailOtp()
      .then((res) => {
        setResendLoading(false);
        if (res.data.status === 200) {
          message.success(res.data.message);
        } else {
          message.error("Алдаа гарлаа.");
        }
      })
      .catch((e) => {
        setResendLoading(false);
        e.response?.status === 400
          ? message.error(e.response?.data?.error)
          : message.error("Алдаа гарлаа");
      });
  };

  const sms = async () => {
    setResendLoading(true);
    Service.createPhoneOtp()
      .then((res) => {
        setResendLoading(false);
        if (res.data.status === 200) {
          message.success(res.data.message);
        } else {
          message.error("Алдаа гарлаа.");
        }
      })
      .catch((e) => {
        setResendLoading(false);
        e.response?.status === 400
          ? message.error(e.response?.data?.error)
          : message.error("Алдаа гарлаа");
      });
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          OTP баталгаажуулалт
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span> Email баталгаажуулалт</span>
        <div
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            marginBottom: 20,
          }}
        >
          <Input
            value={mailOTP}
            type="number"
            className="form-control"
            placeholder="Баталгаажуулалтын 6 оронтой код"
            onChange={(e) => onChangeMailOTP(e)}
          />
          <button
            onClick={() => (resendLoading ? "" : mail())}
            className=" ml-3 col-3 btn btn-link "
          >
            {resendLoading ? "Илгээж байна ..." : "Илгээх"}
          </button>
        </div>
        <span> Утас баталгаажуулалт {props.email}</span>
        <div
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Input
            value={phoneOTP}
            type="number"
            className="form-control"
            placeholder="Баталгаажуулалтын 6 оронтой код"
            onChange={(e) => onChangePhoneOTP(e)}
          />
          <button
            onClick={() => (resendLoading ? "" : sms())}
            className="ml-3 col-3 btn btn-link "
          >
            {resendLoading ? "Илгээж байна ..." : "Илгээх"}
          </button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => (loading ? "" : onCheck())}>
          {loading ? "Баталгаажуулж байна..." : "Баталгаажуулах"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
