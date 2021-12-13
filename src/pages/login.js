import React, { useContext, useState } from "react";
import { useHistory, Link, NavLink } from "react-router-dom";
import { Form, Input, message, Button, Alert } from "antd";
import { setSession } from "../components/helper/utils";
import { SiteContext } from "../context/SiteContext/SiteContext";
import Service from "../service/auth/index";

export default function Login() {
  let history = useHistory();
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();
  // const { loginHandler, setUserData } = useContext(SiteContext);
  const [isVerify, setisVerify] = useState({
    laoding: false,
    show: false,
    email: "",
  });

  const onLogin = async () => {
    try {
      const values = await form.validateFields();
      setloading(true);
      Service.login(values)
        .then((res) => {
          if (res.data?.token) {
            // setUserData(res.data);
            // loginHandler(true);
            setSession(res.data.token, JSON.stringify(res.data));
            if (!res.data.idVerification || !res.data.mobileVerification) {
              return history.push("/");
            }
            return history.push("/");
          }
          setloading(false);
          return message.error("Нэвтрэх үйлдэл хийж чадсангүй");
        })
        .catch((e) => {
          setloading(false);
          if (e.response?.status === 406) {
            setisVerify({
              ...isVerify,
              show: true,
              email: e.response.data.value,
            });
            return message.error(e.response.data.error);
          }
          if (e.response?.status === 400) {
            return message.error(e.response.data.error);
          } else {
            return message.error("Нэвтрэх үйлдэл хийж чадсангүй");
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
