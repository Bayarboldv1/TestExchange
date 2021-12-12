import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Select, Input, message } from "antd";
import { checkRegNumber, passwordReg } from "../signup/Share/utils";
import { useHistory } from "react-router";
import Service from "../../service/index";
import banks from "../../service/bank/index";
import LoggedIn from "../../components/guard/LoggedIn";
import axios from "axios";
import Banks from "./Banks";
import { optionalCallExpression } from "@babel/types";
const { Option } = Select;

function Signup(item) {
  const [khanName, setKhanName] = useState("");
  const [golomtName, setGolomtName] = useState("");
  const [tdbName, setTdbName] = useState("");
  const [xacName, setXacName] = useState("");
  const [bogdName, setBogdName] = useState("");
  const [turName, setTurBank] = useState("");
  axios
    .get("http://192.168.1.103:8080/api/gam/v1/util/bank")
    .then(function (banks) {
      setKhanName(banks.data[0].name);
      setGolomtName(banks.data[1].name);
      setTdbName(banks.data[2].name);
      setXacName(banks.data[3].name);
      setTurBank(banks.data[4].name);
      setBogdName(banks.data[5].name);
      console.log(banks.data);
    });

  let history = useHistory();
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);

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
      values["bankId"] = values.bankId.trim();
      values["email"] = values.email.trim().toLowerCase();
      values["firstname"] = values.firstName.trim();
      values["lasttname"] = values.lastName.trim();
      values["password"] = values.password.trim();
      values["phone"] = values.number.trim();
      values["registerNumber"] = values.registerNumber.trim();
      setloading(true);
      console.log("data:", values);
      Service.signup(values)
        .then((res) => {
          if (res.data.status === 0) {
            message.success(
              "Та имэйлээ шалгаад хэрэглэгчийн эрхээ баталгаажуулна уу!",
              4
            );
            form.resetFields();
            history.push("/otp-verify");
          } else {
            message.warning(
              "Таны хүсэлтийг биелүүлж чадсангүй. Дахин оролдоно уу ?"
            );
          }
          console.log("res");
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
  return (
    <>
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          <div className="settings-profile">
            <Form form={form}>
              <span>Бүртгүүлэх</span>
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
              {/* <Banks /> */}
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
                  {/* {banks.map((data) => (
                    <option value={data.id}>{data.name}</option>
                  ))} */}
                  <option value="Khan">{khanName}</option>
                  <option value="Xac">{xacName}</option>
                  <option value="TDB">{tdbName}</option>
                  <option value="Golomt">{golomtName}</option>
                  <option value="Golomt">{turName}</option>
                  <option value="Bogd">{bogdName}</option>
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
                    required: true,
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
              <Form.Item name="number" className="form-group">
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
                  {
                    required: true,
                    message: "Заавал бөглөнө үү !",
                  },
                ]}
              >
                <Input
                  autoComplete="new-password"
                  type="password"
                  className="form-control"
                  placeholder="Нууц үг"
                  required
                />
              </Form.Item>
              <Form.Item className="custom-control custom-checkbox">
                <Input
                  type="checkbox"
                  className="custom-control-input"
                  id="form-checkbox"
                  required
                />
                <label className="custom-control-label" htmlFor="form-checkbox">
                  Үйлчилгээний нөхцөл зөвшөөрөх
                  <Link to="/terms-and-conditions">Нөхцөл</Link>
                </label>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default LoggedIn(Signup);
