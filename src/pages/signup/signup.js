import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Select, Input, message } from "antd";
import { checkRegNumber, passwordReg } from "../signup/Share/utils";
import { useHistory } from "react-router";
import Service from "../../service/index";
import LoggedIn from "../../components/guard/LoggedIn";

function Signup() {
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
      console.log("dsad1");
      values["email"] = values.email.trim().toLowerCase();
      values["registerNumber"] = values.registerNumber.trim();
      values["registerNumber"] = values.registerNumber.trim();
      setloading(true);
      console.log("dsad2");

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
              <div name="lastName" className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Овог"
                  required
                />
              </div>
              <div name="firstName" className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Нэр"
                  required
                />
              </div>
              <Form.Item name="registerNumber" className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Регистэр"
                  required
                />
              </Form.Item>
              <Form.Item name="bank" className="form-group">
                <select id="selectBank" className="custom-select">
                  <option defaultValue>Банкаа Сонгоно уу</option>
                  <option value="Khan">Хаан Банк</option>
                  <option value="Xac">Хас Банк</option>
                  <option value="TDB">Худалдаа Хөгжилийн Банк</option>
                  <option value="Golomt">Голомт Банк</option>
                </select>
              </Form.Item>
              <Form.Item name="dans" className="form-group">
                <Input
                  type="number"
                  className="form-control"
                  placeholder="Дансны Дугаар"
                  required
                />
              </Form.Item>
              <Form.Item name="email" className="form-group">
                <Input
                  type="email"
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
                  type="text"
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
                  disabled={loading}
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
