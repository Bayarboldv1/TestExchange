import { message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ExchangeContext } from "../context/ExchangeContext/ExchangeContext";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { UserConsumer, UserContext } from "../context/UserContext";
import ExchangeService from '../service/exchange/index';
import WalletService from '../service/wallet/index';

export default function MarketTrade({ ...props }) {

  const { exchange, setBalance } = useContext(ExchangeContext);
  const { data } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const history = useHistory();
  const pair = exchange.selectedPair && exchange.selectedPair.pairName ? exchange.selectedPair.pairName : undefined;
  const [loading, setLoading] = useState(false);
  const [buyPrice, setBuyPrice] = useState("");
  const [buyQuantity, setBuyQuantity] = useState("");
  const [buyTotal, setBuyTotal] = useState(0);
  const [sellPrice, setSellPrice] = useState("");
  const [sellQuantity, setSellQuantity] = useState("");
  const [sellTotal, setSellTotal] = useState(0);

  useEffect(() => {
    setBalance();
  }, [pair])

  const onChangeBuyQuantity = (event) => {
    setBuyQuantity(event.target.value);
    setBuyTotal(buyPrice !== "" && event.target.value !== "" ? buyPrice * event.target.value : 0);
  }

  const onChangeBuyPrice = (event) => {
    setBuyPrice(event.target.value);
    setBuyTotal(buyQuantity !== "" && event.target.value !== "" ? buyQuantity * event.target.value : 0);
  }

  const onChangeSellPrice = (event) => {
    setSellPrice(event.target.value);
    setSellTotal(sellQuantity !== "" && event.target.value !== "" ? sellQuantity * event.target.value : 0);
  }

  const onChangeSellQuantity = (event) => {
    setSellQuantity(event.target.value);
    setSellTotal(sellPrice !== "" && event.target.value !== "" ? sellPrice * event.target.value : 0);
  }

  const onExchange = (type) => {
    if (user.user.statusId === 7) {
      if (type === "buy") {
        if (buyPrice === "" || buyQuantity === "") {
          message.warning("Талбар хоосон байна.");
        } else if (exchange.balance.toTokenBalance < buyTotal) {
          message.warning("Үлдэгдэл хүрэлцэхгүй байна.");
        } else {
          createExchange(1);
        }
      } else if (type === "sell") {
        if (sellPrice === "" || sellQuantity === "") {
          message.warning("Талбар хоосон байна.");
        } else if (exchange.balance.fromTokenBalance < sellQuantity) {
          message.warning("Үлдэгдэл хүрэлцэхгүй байна.");
        } else {
          createExchange(0);
        }
      }
    } else {
      message.warning("Хэрэглэгчийн эрх баталгаажаагүй байна.");
    }
  }

  const createExchange = (type) => {
    let data = {
      fromToken: exchange.balance.fromTokenId,
      toToken: exchange.balance.toTokenId,
      price: type === 1 ? buyPrice : sellPrice,
      quantity: type === 1 ? buyQuantity : sellQuantity,
      type: type
    }
    setLoading(true);
    ExchangeService.createExchange(data).then(res => {
      if (res.data.status === 200) {
        setBuyPrice("");
        setBuyQuantity("");
        setSellPrice("");
        setSellQuantity("");
        message.success(res.data.message);
      }
      setBalance();
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      if (err.response?.status === 400) {
        return message.error(err.response.data.message);
      } else {
        return message.error("Алдаа гарлаа.");
      }
    })
  }

  return (
    <div className="" style={{ height: '300px', color: data.theme === 'dark' ? "#8fa3cc" : "black", backgroundColor: data.theme === 'dark' ? '#1a1c2a' : 'white' }}>
      <Tabs defaultActiveKey="limit" id="uncontrolled-tab-example">
        <Tab eventKey="limit" title="Лимит">
          <div className="row no-gutters pt-3">
            <div className="market-trade-buy col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div style={{ paddingLeft: '5px', paddingBottom: '5px' }}>Боломжит: <span>{(exchange.balance.toTokenBalance ? exchange.balance.toTokenBalance : 0.00) + " " + (pair && pair.includes("/") ? pair.split("/")[1] : "")}</span></div>
              <div style={{ padding: '0px 5px 0px 5px' }}>
                <div className="input-group" style={{ marginBottom: '5px' }}>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Ханш"
                    value={buyPrice}
                    onChange={(event) => onChangeBuyPrice(event)}
                    required
                  />
                  <div className={"input-group-append" + (data.theme === 'dark' ? " input-group-append-dark" : "")}>
                    <span className="input-group-text">{pair && pair.includes("/") ? pair.split("/")[1] : ""}</span>
                  </div>
                </div>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Хэмжээ"
                    value={buyQuantity}
                    onChange={(event) => onChangeBuyQuantity(event)}
                    required
                  />
                  <div className={"input-group-append" + (data.theme === 'dark' ? " input-group-append-dark" : "")}>
                    <span className="input-group-text">{pair && pair.includes("/") ? pair.split("/")[0] : ""}</span>
                  </div>
                </div>
                <ul className={"market-trade-list " + (data.theme === 'dark' ? "market-trade-list-dark" : "")}>
                  <li>
                    <a href="#!">25%</a>
                  </li>
                  <li>
                    <a href="#!">50%</a>
                  </li>
                  <li>
                    <a href="#!">75%</a>
                  </li>
                  <li>
                    <a href="#!">100%</a>
                  </li>
                </ul>
                <div style={{ paddingTop: '10px', fontSize: '14px', justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
                  <span>Нийт үнэ: </span>
                  <strong>{buyTotal + " " + (pair && pair.includes("/") ? pair.split("/")[1] : "")}</strong>
                </div>
                <UserConsumer>
                  {({ user }) => {
                    return (
                      <button type="submit" className="btn buy" onClick={user.auth ? () => onExchange("buy") : () => { history.push("/login") }}>{user.auth ? "Авах" : "Нэвтрэх"}</button>
                    )
                  }}
                </UserConsumer>
              </div>
            </div>
            <div className="market-trade-sell col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div style={{ paddingLeft: '10px', paddingBottom: '5px' }}>Боломжит: <span>{(exchange.balance.fromTokenBalance ? exchange.balance.fromTokenBalance : 0.00) + " " + (pair && pair.includes("/") ? pair.split("/")[0] : "")}</span></div>
              <div style={{ padding: '0px 5px 0px 10px' }}>
                <div className="input-group" style={{ marginBottom: '5px' }}>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Ханш"
                    value={sellPrice}
                    onChange={(event) => onChangeSellPrice(event)}
                    required
                  />
                  <div className={"input-group-append" + (data.theme === 'dark' ? " input-group-append-dark" : "")}>
                    <span className="input-group-text">{pair && pair.includes("/") ? pair.split("/")[1] : ""}</span>
                  </div>
                </div>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Хэмжээ"
                    value={sellQuantity}
                    onChange={(event) => onChangeSellQuantity(event)}
                    required
                  />
                  <div className={"input-group-append" + (data.theme === 'dark' ? " input-group-append-dark" : "")}>
                    <span className="input-group-text">{pair && pair.includes("/") ? pair.split("/")[0] : ""}</span>
                  </div>
                </div>
                <ul className={"market-trade-list " + (data.theme === 'dark' ? "market-trade-list-dark" : "")}>
                  <li>
                    <a href="#!">25%</a>
                  </li>
                  <li>
                    <a href="#!">50%</a>
                  </li>
                  <li>
                    <a href="#!">75%</a>
                  </li>
                  <li>
                    <a href="#!">100%</a>
                  </li>
                </ul>
                <div style={{ paddingTop: '10px', fontSize: '14px', justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
                  <span>Нийт үнэ: </span>
                  <strong>{sellTotal + " " + (pair && pair.includes("/") ? pair.split("/")[1] : "")}</strong>
                </div>
                <UserConsumer>
                  {({ user }) => {
                    return (
                      <button type="submit" className="btn sell" onClick={user.auth ? () => onExchange("sell") : () => { history.push("/login") }}>{user.auth ? "Зарах" : "Нэвтрэх"}</button>
                    )
                  }}
                </UserConsumer>
              </div>
            </div>
          </div>
        </Tab>
        {/* <Tab eventKey="market" title="Market"></Tab>
        <Tab eventKey="stop-limit" title="Stop Limit"></Tab>
        <Tab eventKey="stop-market" title="Stop Market"></Tab> */}
      </Tabs>
    </div>
  );
}
