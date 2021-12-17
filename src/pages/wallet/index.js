import React, { useState, useEffect } from "react";
import Service from "../../service/wallet/index";
import TokenCheck from "../../components/guard/TokenCheck";
import TotalMnt from "./TotalMnt";
import MarketsList from "../../components/MarketsList";
import Balance from "./Balance";
import { message } from "antd";

function Wallet() {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getBalance();
  }, []);
  const getBalance = () => {
    try {
      setloading(true);
      Service.getWalletBalance()
        .then((res) => {
          if (res) {
            setloading(false);
            setData(res.data);
          }
        })
        .catch((e) => {
          return message.error("Cant get balance!!");
        });
    } catch (e) {
      return message.error("Cant get balance!");
    }
  };

  return (
    <>
      <div>
        <TotalMnt />
        <Balance data={data} loading={loading} getBalance={getBalance} />
      </div>
    </>
  );
}

export default Wallet;
