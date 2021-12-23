import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Modal, Button } from "react-bootstrap";
import Service from "../../service/auth/index";
import { Form, Input, message, Space, Tooltip, Typography } from "antd";

export default function OtpModal({ email, phone, ...props }) {
  const [counter, setCounter] = useState(120);
  const [counter1, setCounter1] = useState(120);
  const [mailOTP, setMailOTP] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [loading, setloading] = useState(false);
  const [isDisabled, setisDisabled] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendLoadingPhone, setResendLoadingPhone] = useState(false);
  let history = useHistory();

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    const timer1 =
      counter1 > 0 && setInterval(() => setCounter1(counter1 - 1), 1000);
    return () => clearInterval(timer1);
  }, [counter1]);

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
        email: email,
        phone: phone,
      };
      setloading(true);
      console.log("data", values);

      setisDisabled(true);
      Service.verify(values)
        .then((res) => {
          if (res.data.status === 200) {
            message.success("Амжилттай бүртгэгдлээ");
            props.onHide();
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
            ? message.error(e.response?.data?.message)
            : message.error("Алдаа гарлаа");
        });
    } catch (errorInfo) {
      return;
    }
  };

  const mail = async () => {
    if (counter === 0 && !isDisabled) {
      setResendLoading(true);

      Service.mailOTP(email)
        .then((res) => {
          setResendLoading(false);
          if (res.data.status === 200) {
            message.success(res.data.message);
            setCounter(120);
            setisDisabled(false);
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
    }
  };

  const sms = async () => {
    if (counter1 === 0 && !isDisabled) {
      setResendLoadingPhone(true);
      Service.smsOTP(phone)
        .then((res) => {
          setResendLoadingPhone(false);
          if (res.data.status === 200) {
            message.success(res.data.message);
            setCounter1(120);
            setisDisabled(false);
          } else {
            message.error("Алдаа гарлаа.");
          }
        })
        .catch((e) => {
          setResendLoadingPhone(false);
          e.response?.status === 400
            ? message.error(e.response?.data?.error)
            : message.error("Алдаа гарлаа");
        });
      // .finally((e) => {

      // });
    }
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
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
              {counter != 0
                ? // <img src={"svg/loadingblack.svg"} />
                  `${counter}`
                : "Илгээх"}
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
              onClick={() => (resendLoadingPhone ? "" : sms())}
              className="ml-3 col-3 btn btn-link "
            >
              {counter1 != 0
                ? // <img src={"svg/loadingblack.svg"} />
                  `${counter1}`
                : "Илгээх"}
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => (loading ? "" : onCheck())}>
            {loading ? "Баталгаажуулж байна..." : "Баталгаажуулах"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
