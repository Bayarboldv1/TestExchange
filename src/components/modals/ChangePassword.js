import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Modal, Button } from "react-bootstrap";
import Service from "../../service/auth/index";
import { Form, Input, message, Space, Tooltip, Typography } from "antd";
import { passwordReg } from "../../pages/signup/Share/utils";

export default function ResetPassword({ email, phone, code, ...props }) {
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let history = useHistory();

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      let passReg = passwordReg(values.password);

      if (!passReg) {
        return message.warning(
          "Нууц үг хамгийн багадаа 6 оронтой 1 том үсэг, 1 жижиг үсэг, тоо, 1 тусгай тэмдэгт байна !"
        );
      }
      setloading(true);
      console.log("data", values);

      values["email"] = email;
      values["newPassword"] = values.password.trim();
      values["phone"] = phone;
      values["verifiedCode"] = code;
      console.log("valuesChange PAs", values);

      Service.changePassword(values)
        .then((res) => {
          if (res.data.status === 200) {
            message.success("Амжилттай");
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

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Нууц үг сэрээх
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span> Нууц үг </span>

        <Form form={form}>
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
              placeholder="Нууц үг "
            />
          </Form.Item>
          <span> Нууц үг баталгаажуулалт </span>
          <Form.Item
            name="confirm"
            className="form-group"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Заавал бөглөнө үү !",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Давтан нууц үг буруу байна ")
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input
              autoComplete="new-password"
              type="password"
              className="form-control"
              placeholder=" Давтан нууц үг"
            />
          </Form.Item>
        </Form>
        {/* <div
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            marginBottom: 20,
          }}
        >
          <Input
            value={password}
            type="text"
            className="form-control"
            onChange={(e) => onChangePassword(e)}
          />
        </div> */}
        {/* <span> Нууц үг баталгаажуулалт {props.email}</span> */}
        {/* <div
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Input
            value={confirmPassword}
            type="text"
            className="form-control"
            onChange={(e) => onChangeConfirmPassword(e)}
          />
        </div> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => (loading ? "" : onCheck())}>
          {loading ? "Баталгаажуулж байна..." : "Баталгаажуулах"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
