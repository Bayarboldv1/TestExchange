import React, { useState, useEffect } from "react";
import Service from "../../service/wallet/index";
import TokenCheck from "../../components/guard/TokenCheck";
import TotalMnt from "./TotalMnt";
import MarketsList from "../../components/MarketsList";
// import Balance from './Balance';

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
          return;
        });
    } catch (e) {
      return;
    }
  };

  return (
    <>
      <div>
        <MarketsList />
      </div>
    </>
  );
}

export default Wallet;
