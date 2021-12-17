import { useState, useEffect } from "react";
import { message } from "antd";
import Service from "../../../../service/settings/index";

function Resend({ loading }) {
  const [counter, setCounter] = useState(120);
  const [isDisabled, setisDisabled] = useState(false);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  const reSend = () => {
    try {
      if (counter === 0 && !isDisabled) {
        setisDisabled(true);
        Service.createPhoneOtp()
          .then((res) => {
            message.success("Амжилттай");
          })
          .catch((e) => {
            e.response?.status === 400
              ? message.error(e.response?.data?.error)
              : message.error("Алдаа гарлаа");
          })
          .finally((e) => {
            setCounter(120);
            setisDisabled(false);
          });
      }
    } catch (e) {
      return message.error("Дахин илгээж чадсангүй");
    }
  };
  return (
    <div className="w-100 d-flex justify-content-end">
      <span
        className="user--mobile--link pointer"
        onClick={() => (loading ? null : reSend())}
      >
        {counter !== 0
          ? `Та ${counter}-ын секундын дараа баталгаажуулах код дахин авах боломжтой`
          : "Дахин илгээх"}
      </span>
    </div>
  );
}
export default Resend;
