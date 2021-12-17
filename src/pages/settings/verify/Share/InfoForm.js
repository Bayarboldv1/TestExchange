import { useContext } from "react";
import { Input, InputNumber } from "antd";
import { SiteContext } from "../../../../context/SiteContext/SiteContext";

function InfoForm({ loading, onCheck, Form, setshowmodal }) {
  const currentUser = useContext(SiteContext);

  const checkUserMobile = () => {
    try {
      if (
        !currentUser.mobileVerification &&
        currentUser.mobileNumber &&
        currentUser.firstName &&
        currentUser.lastName
      )
        return (
          <button
            className="btn btn-secondary mb-4"
            onClick={() => setshowmodal({ show: true })}
            disabled={loading}
          >
            Баталгаажуулах код оруулах
          </button>
        );
    } catch (e) {
      return;
    }
  };

  const checkUserButton = () => {
    try {
      if (
        !currentUser.mobileVerification &&
        !currentUser.mobileNumber &&
        !currentUser.firstName &&
        !currentUser.lastName
      ) {
        return (
          <Form.Item>
            <button
              className="btn btn-primary mr-4"
              onClick={() => (loading ? "" : onCheck())}
              disabled={loading}
            >
              {loading ? "Илгээж байна..." : "Илгээх"}
            </button>
          </Form.Item>
        );
      }
    } catch (e) {
      return;
    }
  };
  return (
    <>
      <Form.Item
        label="Таны овог"
        name="lastName"
        rules={[
          { required: true, message: "Овгоо оруулна уу !" },
          {
            pattern:
              /^[абвгдеёжзийклмноөпрстуүфхцчшщъьыэюяАБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЬЫЭЮЯ-\s]*$/,
            message: "Криллээр бичнэ үү !",
          },
        ]}
      >
        <Input placeholder="Овог" />
      </Form.Item>
      <Form.Item
        label="Таны нэр"
        name="firstName"
        rules={[
          { required: true, message: "Нэрээ оруулна уу !" },
          {
            pattern:
              /^[абвгдеёжзийклмноөпрстуүфхцчшщъьыэюяАБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЬЫЭЮЯ-\s]*$/,
            message: "Криллээр бичнэ үү !",
          },
        ]}
      >
        <Input placeholder="Нэр" />
      </Form.Item>

      <Form.Item
        className="w-100"
        label="Утасны дугаар"
        name="mobileNumber"
        rules={[
          {
            type: "number",
            required: true,
            message: "Утасны дугаараа оруулна уу !",
          },
          () => ({
            validator(_, value) {
              if (value?.toString().length === 8) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Та 8 оронтой дугаараа оруулна уу !")
              );
            },
          }),
        ]}
      >
        <InputNumber placeholder="Утас" />
      </Form.Item>
      <div className="d-flex align-items-center">
        {checkUserButton()}
        {checkUserMobile()}
      </div>
    </>
  );
}
export default InfoForm;
