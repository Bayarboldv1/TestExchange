import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link, NavLink } from "react-router-dom";
import { Form, Input, message, Button, Alert } from "antd";
import Service from "../service/auth/index";
import { UserContext } from "../context/UserContext";
import OtpModal from "../components/modals/OtpModal";

function Login() {
  let history = useHistory();
  const [loading, setloading] = useState(false);
  const userContext = useContext(UserContext);
  const [form] = Form.useForm();
  const [modalShow, setModalShow] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    userContext.dispatch({ user: null, auth: false, token: null }, "login");
  }, [])

  const onLogin = async () => {
    try {
      const values = await form.validateFields();
      setloading(true);
      console.log("data", values);
      Service.login(values)
        .then((res) => {
          setloading(false);
          if (res.data.response.status === 202) {
            message.error('Хэрэглэгчийн мэдээлэл баталгаажаагүй байна.');
            setEmail(res.data.userInfo.email);
            setPhone(res.data.userInfo.phone);
            setModalShow(true);
          } else if (res.data.response.status === 200) {
            userContext.dispatch({ user: res.data, auth: true, token: res.data.accessToken }, "login");
            history.push('/exchange');
            message.success('Амжилттай нэвтэрлээ.');
          } else {
            message.error('Нэвтэрхэд алдаа гарлаа.');
          }
        })
        .catch((e) => {
          setloading(false);
          if (e.response?.status === 400) {
            return message.error(e.response.data.message);
          } else {
            return message.error("Нэвтрэх үйлдэл хийж чадсангүй1");
          }
        });
    } catch (e) {
      return;
    }
  };

  return (
    <>
      <OtpModal email={email} phone={phone} show={modalShow} onHide={() => setModalShow(false)} />
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          <span>Нэвтрэх</span>
          <Form form={form}>
            <Form.Item
              name="username"
              className="form-group"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Email буруу байна !",
                },
              ]}
            >
              <Input
                className="form-control"
                placeholder="Email Хаяг"
                required
                autoComplete="new-password"
              />
            </Form.Item>
            <Form.Item
              name="password"
              className="form-group"
              rules={[
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
                placeholder="Нууц Үг"
                required
              />
            </Form.Item>
            <div className="text-right">
              <NavLink to="/reset">Нууц үгээ мартсан?</NavLink>
            </div>
            <Form.Item>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => (loading ? "" : onLogin())}
                disabled={loading}
              >
                {loading ? "Илгээж байна..." : "Нэвтрэх"}
              </button>
            </Form.Item>
          </Form>
          <h2>
            Шинэ хэрэглэгч? <NavLink to="/signup">Бүртгүүлэх</NavLink>
          </h2>
        </div>
      </div>
    </>
  );
}

export default Login;
