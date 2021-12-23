import React, { useState, useEffect, useContext } from "react";
import Service from "../../service/wallet/index";
import TokenCheck from "../../components/guard/TokenCheck";
import TotalMnt from "./TotalMnt";
import MarketsList from "../../components/MarketsList";
import Balance from "./Balance";
import { message } from "antd";
import { BalanceContext } from "../../context/BalanceContext/BalanceContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

function Wallet() {

  const { setBalanceList } = useContext(BalanceContext);
  const { data } = useContext(ThemeContext);

  useEffect(() => {
    setBalanceList();
  }, []);

  return (
    <div className={"_wallet " + (data.theme === 'dark' ? "_wallet-dark" : "")}>
      <div className="_container col-12 col-sm-12 col-md-11 col-lg-10 col-xl-10">
        <TotalMnt />
        <Balance />
      </div>
    </div>
  );
}

export default Wallet;
