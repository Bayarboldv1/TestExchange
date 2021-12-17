import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, Input, message } from "antd";
import UtilService from "../../service/util/index";
import Service from "../../service/user/index";
import Services from "../../service/auth/index";
import { UserConsumer } from "../../context/UserContext";

export default function BankModal(props) {
  const [banks, setBanks] = useState("");
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    UtilService.bankList().then((res) => {
      setBanks(res.data);
    });
  }, []);

  const renderBank = () => {
    try {
      return banks?.map((item) => {
        return (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        );
      });
    } catch (e) {
      return;
    }
  };

  const mail = async () => {
    setResendLoading(true);
    Services.mailOTP(email)
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
    Services.smsOTP(phone)
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

  const onChange = async () => {
    try {
      const values = await form.validateFields();
      values["bankId"] = values.bankId.trim();
      values["bankAccount"] = values.bankAccount.trim();
      values["emailOTP"] = values.emailOTP.trim();
      values["phoneOTP"] = values.phoneOTP.trim();
      setloading(true);
      console.log("BankChangeOTP:", values);
      Service.changeBankInfo(values)
        .then((res) => {
          setloading(false);
          if (res.data.status === 200) {
            message.success("Амжилттай солигдлоо");
          } else {
            message.error("Алдаа гарлаа");
          }
        })
        .catch((e) => {
          setloading(true);
          e.response?.status === 400
            ? message.error(e.response?.data?.error)
            : message.error("Алдаа гарлаа");
        });
    } catch (e) {
      return;
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
            Банкны данс солих
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form form={form}>
            <span>Банк Сонгох</span>
            <Form.Item name="bankId" className="form-group">
              <select
                id="selectBank"
                className="custom-select"
                placeholder="Банкаа Сонгоно уу"
                allowClear
              >
                {renderBank()}
              </select>
            </Form.Item>
            <span>Дансны дугаар</span>
            <Form.Item name="bankAccount" className="bank">
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Данс"
                  required
                />
              </div>
            </Form.Item>
          </Form>

          <span> Email баталгаажуулалт</span>
          <Form.Item
            name="mailOTP"
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
              marginBottom: 20,
            }}
          >
            <div className="row">
              <Input
                type="number"
                className="form-control col ml-3"
                placeholder="Баталгаажуулалтын 6 оронтой код"
              />
              <button
                onClick={() => (resendLoading ? "" : mail())}
                className=" ml-3 col-3 btn btn-link "
              >
                {resendLoading ? "..." : "Илгээх"}
              </button>
            </div>
          </Form.Item>
          <span> Утас баталгаажуулалт {props.email}</span>
          <Form.Item
            name="phoneOTP"
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
            }}
          >
            <div className="row">
              <Input
                type="number"
                className="form-control col ml-3"
                placeholder="Баталгаажуулалтын 6 оронтой код"
              />
              <button
                onClick={() => (resendLoading ? "" : sms())}
                className="ml-3 col-3 btn btn-link "
              >
                {resendLoading ? "..." : "Илгээх"}
              </button>
            </div>
          </Form.Item>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => onChange()}>
            {loading ? "Баталгаажуулж байна..." : "Солих"}
          </Button>
        </Modal.Footer>
      </Modal>
      <UserConsumer>
        {({ user }) => {
          return (
            setEmail(user.user.userInfo.email),
            setPhone(user.user.userInfo.phone)
          );
        }}
      </UserConsumer>
    </>
  );
}
