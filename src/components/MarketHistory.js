import React, { useContext } from "react";
import { ExchangeContext } from "../context/ExchangeContext/ExchangeContext";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";

export default function MarketHistory({ ...props }) {

  const { exchange } = useContext(ExchangeContext);
  const { data } = useContext(ThemeContext);
  const pair = exchange.selectedPair && exchange.selectedPair.pairName ? exchange.selectedPair.pairName : undefined;
  const orders = exchange.pairOrder;

  return (
    <div style={{ height: '100%', maxHeight: '100%', border: data.theme === 'dark' ? '1px solid #1e2030' : '1px solid lightgray', margin: '5px 0px', borderRadius: '2px', color: data.theme === 'dark' ? "#8fa3cc" : "black", backgroundColor: data.theme === 'dark' ? '#1a1c2a' : 'white' }}>
      <div className={data.theme === "dark" ? "recent-trades-heading-dark" : "recent-trades-heading"}>Идэвхтэй захиалгууд</div>
      <div className="recent-trades">
        <div className="header row no-gutters">
          <div className="col-4" style={{ textAlign: 'left' }}>Огноо</div>
          <div className="col-4" style={{ textAlign: 'left' }}>Үнэ({pair && pair.includes("/") ? pair.split("/")[1] : ""})</div>
          <div className="col-4" style={{ textAlign: 'right' }}>Ширхэг({pair && pair.includes("/") ? pair.split("/")[0] : ""})</div>
        </div>
        <div className="trades">
          {
            orders.length > 0 ? orders.map(o => {
              return (
                <div className="trade-item row no-gutters">
                  <div className="col-4" style={{ textAlign: 'left' }}>{o.date && o.date.includes("T") ? o.date.split("T")[1].split(".")[0] : ""}</div>
                  <div className={"col-4 " + o.color} style={{ textAlign: 'left' }}>{o.price}</div>
                  <div className="col-4" style={{ textAlign: 'right' }}>{o.quantity}</div>
                </div>
              )
            }) : null
          }
        </div>
      </div>
    </div>
  );
}