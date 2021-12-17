import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Select, Input, message, Password } from "antd";
import {
  checkFirstName,
  checkLastName,
  checkName,
  checkRegNumber,
  passwordReg,
} from "../signup/Share/utils";
import { useHistory } from "react-router";
import Service from "../../service/auth/index";
import LoggedIn from "../../components/guard/LoggedIn";
import OtpModal from "../../components/modals/OtpModal";
import UtilService from "../../service/util/index";
import { UserContext } from "../../context/UserContext";

const { Option } = Select;
function Signup(item) {
  let history = useHistory();
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [banks, setBanks] = useState("");
  const userContext = useContext(UserContext);

  useEffect(() => {
    UtilService.bankList().then((res) => {
      setBanks(res.data);
    });
  }, []);

  useEffect(() => {
    userContext.dispatch({ user: null, auth: false, token: null }, "login");
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
  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      let passReg = passwordReg(values.password);
      let correctReg = checkRegNumber(values.registerNumber);
      if (!correctReg) {
        return message.warning("Регистрийн дугаарын формат буруу байна !");
      }
      if (!passReg) {
        return message.warning(
          "Нууц үг хамгийн багадаа 6 оронтой 1 том үсэг, 1 жижиг үсэг, тоо, 1 тусгай тэмдэгт байна !"
        );
      }
      values["bankAccount"] = values.bankAccount.trim();
      values["bankId"] = values.bankId ? values.bankId.trim() : 1;
      values["email"] = values.email.trim().toLowerCase();
      setEmail(values.email.trim());
      setPhone(values.phone.trim());
      values["password"] = values.password.trim();
      values["phone"] = values.phone.trim();
      values["firstname"] = values.firstName.trim();
      values["lastname"] = values.lastName.trim();
      values["registerNumber"] = values.registerNumber.trim();
      setloading(true);
      Service.signup(values)
        .then((res) => {
          setloading(false);
          message.success(
            "Та имэйлээ шалгаад хэрэглэгчийн эрхээ баталгаажуулна уу!",
            4
          );
          form.resetFields();
          setModalShow(true);
        })
        .catch((e) => {
          setloading(false);
          if (e.response?.status === 400) {
            if (e.response.data.errors) {
              e.response.data.errors.map((error) => {
                message.error(error.defaultMessage);
              });
            } else {
              message.error(e.response.data.message);
            }
          } else {
            message.error("Алдаа гарлаа");
          }
        });
    } catch (errorInfo) {
      return;
    }
  };
  return (
    <>
      <OtpModal
        email={email}
        phone={phone}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: 40, paddingBottom: 40 }}
      >
        <div className="form-access my-auto">
          <div className="settings-profile">
            <span>Бүртгүүлэх</span>
            <Form form={form}>
              <Form.Item name="lastName" className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Овог"
                  required
                />
              </Form.Item>
              <Form.Item name="firstName" className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Нэр"
                  required
                />
              </Form.Item>
              <Form.Item name="registerNumber" className="form-group">
                <Input
                  className="form-control"
                  placeholder="Регистэр"
                  required
                />
              </Form.Item>
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
              <Form.Item name="bankAccount" className="form-group">
                <Input
                  type="number"
                  className="form-control"
                  placeholder="Дансны Дугаар"
                  required
                />
              </Form.Item>
              <Form.Item
                name="email"
                className="form-group"
                rules={[
                  {
                    type: "email",
                    message: "Заавал бөглөнө үү !",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  placeholder="Email Хаяг"
                  required
                />
              </Form.Item>
              <Form.Item name="phone" className="form-group">
                <Input
                  type="number"
                  className="form-control"
                  placeholder="Утас"
                  required
                />
              </Form.Item>
              <Form.Item
                name="password"
                className="form-group"
                rules={[
                  {
                    min: 6,
                    message: "Нууц үгийн урт 6 тэмдэгдээс багагүй байх ёстой",
                  },
                ]}
                // hasFeedback
              >
                <Input
                  autoComplete="new-password"
                  type="password"
                  className="form-control"
                  placeholder="Нууц үг"
                />
              </Form.Item>
              <Form.Item>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => (loading ? "" : onCheck())}
                  // disabled={loading}
                >
                  {loading ? "Илгээж байна..." : "Илгээх"}
                </button>
              </Form.Item>
            </Form>
            <h2>
              Хаяг байгаа бол?
              <Link to="/login"> Нэвтрэх</Link>
            </h2>
            {/* <button onClick={() => setModalShow(true)}>dsa</button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoggedIn(Signup);
