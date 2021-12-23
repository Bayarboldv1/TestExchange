import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { numberToFixed, numberWithCommas, pairFormat } from "../../components/helper/utils";
import { BalanceContext } from "../../context/BalanceContext/BalanceContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

function TotalMnt() {

  const { balance, setBalanceTotal } = useContext(BalanceContext);
  const { data } = useContext(ThemeContext);

  useEffect(() => {
    setBalanceTotal();
  }, []);

  return (
    <div className={"wallet-total " + (data.theme === 'dark' ? "wallet-total-dark" : "")}>
      <div className="wallet-total-balances">
        <div className="">
          <h7>Нийт үлдэгдэл</h7>
          <h5>{"≈ " + (balance.balanceTotal.totalMNT ? numberWithCommas(
            numberToFixed(
              balance.balanceTotal.totalMNT,
              pairFormat('MNT' || 0)
            )
          ) : 0.00) + " ₮"}</h5>
        </div>
      </div>
      <Button variant="outline-secondary">Гүйлгээний түүх</Button>
    </div>
  );
}

export default TotalMnt;
