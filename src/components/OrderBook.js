import React, { useContext, useEffect, useState } from "react";
import { ExchangeContext } from "../context/ExchangeContext/ExchangeContext";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";

export default function OrderBook({ ...props }) {

  const { exchange } = useContext(ExchangeContext);
  const { data } = useContext(ThemeContext);
  const pair = exchange.selectedPair && exchange.selectedPair.pairName ? exchange.selectedPair.pairName : undefined;
  const buy = exchange.pairBuy;
  const sell = exchange.pairSell;

  // useEffect(() => {
  //   console.log("sdadrararara")
  //   setBuyList(buy);
  // }, [buy])

  console.log("sdaaa we ene odoo", data)

  return (
    <div style={{ height: '100%', maxHeight: '100%', border: data.theme === 'dark' ? '1px solid #1e2030' : '1px solid lightgray', margin: '5px 0px', borderRadius: '2px', color: data.theme === 'dark' ? "#8fa3cc" : "black", backgroundColor: data.theme === 'dark' ? '#1a1c2a' : 'white' }}>
      <div className={data.theme === 'dark' ? "buy-sell-orders-heading-dark" : "buy-sell-orders-heading"}>Авах, зарах захиалгууд</div>
      <div className="buy-sell-orders">
        <div className="header row no-gutters">
          <div className="col-4" style={{ textAlign: 'left' }}>Үнэ({pair && pair.includes("/") ? pair.split("/")[1] : ""})</div>
          <div className="col-4" style={{ textAlign: 'right' }}>Хэмжээ({pair && pair.includes("/") ? pair.split("/")[0] : ""})</div>
          <div className="col-4" style={{ textAlign: 'right' }}>Нийт({pair && pair.includes("/") ? pair.split("/")[1] : ""})</div>
        </div>
        <div className="orders">
          <div className="sell">
            {
              sell.map(s => {
                return (
                  <div className="order-item row no-gutters red-bg-60">
                    <div className="col-4 red" style={{ textAlign: 'left' }}>{s.price}</div>
                    <div className="col-4" style={{ textAlign: 'right' }}>{s.quantity}</div>
                    <div className="col-4" style={{ textAlign: 'right' }}>{Math.trunc(s.total)}</div>
                  </div>
                )
              })
            }
          </div>
          <div className={data.theme === 'dark' ? "center-header-dark" : "center-header"}>
            <div>14000000</div>
            <div>+4%</div>
          </div>
          <div className="buy">
            {
              buy.map(s => {
                return (
                  <div className="order-item row no-gutters green-bg-40">
                    <div className="col-4 green" style={{ textAlign: 'left' }}>{s.price}</div>
                    <div className="col-4" style={{ textAlign: 'right' }}>{s.quantity}</div>
                    <div className="col-4" style={{ textAlign: 'right' }}>{Math.trunc(s.total)}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
