import React, { useContext, useEffect, useState } from "react";
import { numberToFixed, numberWithCommas, pairFormat } from "../components/helper/utils";
import HistoryOrder from "../components/HistoryOrder";
import MarketHistory from "../components/MarketHistory";
import MarketTrade from "../components/MarketTrade";
import OrderBook from "../components/OrderBook";
import TradingChart from "../components/TradingChart";
import TradingChartDark from "../components/TradingChartDark";
import { ThemeConsumer, ThemeContext } from "../context/ThemeContext/ThemeContext";
import SocketService from '../service/socket/Socket';
import socketIOClient from 'socket.io-client';
import parser from 'socket.io-msgpack-parser';
import { ExchangeContext } from "../context/ExchangeContext/ExchangeContext";
import { Dropdown, DropdownButton } from "react-bootstrap";

// const socket = socketIOClient("http://192.168.1.107:5000", { path: "/gam_socket/", parser, secure: true, upgrade: false, reconnection: false, transports: ["websocket"] });
const socket = socketIOClient("wss://ws.coinmart.mn", { path: "/gam_socket/", parser, secure: true, upgrade: false, reconnection: false, transports: ["websocket"] });

const Exchange = ({ ...props }) => {

  const [loading, setLoading] = useState(false);
  const { exchange, setSelectedPair, setPairList, setPairOrder, setPairBuy, setPairSell, setPairOrderAdd, setPairBuyAdd, setPairSellAdd, addSelectedPairInfo } = useContext(ExchangeContext);
  const { data } = useContext(ThemeContext);

  useEffect(() => {

    getInitialData();

    socket.on("depth_update", (res) => {
      console.log("sdaaa depth", res);
      if (res[0] && res[1] && !loading) {
        console.log("sdaaa selectedPair", exchange.selectedPair);
        // addSelectedPairInfo({ min: res[0].min, max: res[0].max, volume: res[0].volume_m });
        setPairOrder(res[1]);
      }
    })

    socket.on("deals_update", (res) => {
      console.log("initial data buysell: ", res)
      if (res.ask && res.bids) {
        setPairSell(res.ask);
        setPairBuy(res.bids);
      }
    })

    socket.on("daily_update", (res) => {
      console.log("daily_update", res);
      setSelectedPair({
        ...exchange.selectedPair,
        percent: res['percent'],
        min: res['l'],
        max: res['h']
      });
    })

    socket.on("kline_update", (res) => {
      console.log("kline_update", res);
    })

    socket.on("update", (res) => {
      console.log("update", res);
      if (res[exchange.selectedPair.pairName]) {
        setPairOrderAdd(res[exchange.selectedPair.pairName]);
      }
    })

    socket.on("tx_udpate", (res) => {
      console.log("tx_udpate", res);
    })

    socket.on("depth_mn", (res) => {
      console.log("depth_mn", res);
      if (res.ask && res.ask[0]) {
        setPairSellAdd(res.ask[0], exchange['pairSell']);
      }
      if (res.bids && res.bids[0]) {
        setPairBuyAdd(res.bids[0], exchange['pairBuy']);
      }
    })

    return () => {
      socket.disconnect();
    };

  }, [])

  const getInitialData = () => {
    setLoading(true);
    SocketService.getInitialData().then(res => {
      if (res.data[0] && res.data[1]) {
        const sortedPairList = res.data[0].sort(function (a, b) { return a.fromTokenId - b.fromTokenId })
        setSelectedPair({
          currentPrice: sortedPairList[0].currentPrice,
          dailyPrice: sortedPairList[0].dailyPrice,
          percent: sortedPairList[0].percent,
          pairName: sortedPairList[0].pairName,
          fromTokenId: sortedPairList[0].fromTokenId,
          toTokenId: sortedPairList[0].toTokenId,
          min: res.data[1][0].min,
          max: res.data[1][0].max,
          volume: res.data[1][0].volume_m
        });
        setPairList(sortedPairList);
        setPairOrder(res.data[1][1]);
        let pairArray = [];
        pairArray.push(sortedPairList[0].pairName)
        socket.emit("deals_sub", pairArray);
        socket.emit("depth_sub", pairArray);
      }
      setLoading(false);
    }).catch(err => { setLoading(false); });
  }

  const onSelectPair = (event) => {
    exchange.pairList.map(p => {
      if (p.pairName === event.target.value) {
        let pairArray = [];
        pairArray.push(exchange.selectedPair.pairName);
        pairArray.push(p.pairName);
        let pairArray1 = [];
        pairArray1.push(p.pairName);
        addSelectedPairInfo(p);
        changeSocketPair(pairArray, pairArray1);
      }
    })
  }

  const changeSocketPair = (pairArray, pairArray1) => {
    socket.emit("deals_sub", pairArray);
    socket.emit("depth_sub", pairArray1);
  }

  return (
    <div style={{ height: 'calc(100vh - 50px)' }}>
      <div className="h-100 " style={{ flexGrow: 1 }}>
        <div className={"row no-gutters h-100" + (data.theme === 'dark' ? " exchangeDiv-dark" : " exchangeDiv")}>
          <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 h-100" style={{ flexDirection: 'column', justifyContent: 'space-between', display: 'flex', paddingRight: '5px', paddingLeft: '5px' }}>
            <div className="secondHeader row " style={{ height: '50px', alignItems: 'center', display: 'flex', color: data.theme === 'dark' ? "#8fa3cc" : "black" }}>
              <div className="col">
                <select onChange={(event) => onSelectPair(event)} id="selectPair" className="custom-select">
                  {
                    exchange.pairList.map(p => {
                      return (
                        <option defaultValue value={p.pairName}>{p.pairName}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="col">
                <div className="green" >
                  <div style={{ color: data.theme === 'dark' ? "#8fa3cc" : "black", justifyContent: 'center', flexDirection: 'column', display: 'flex', fontSize: '18px' }}>
                    {exchange.selectedPair.currentPrice ? numberWithCommas(
                      numberToFixed(
                        exchange.selectedPair.currentPrice,
                        pairFormat(exchange.selectedPair.toTokenTicker ? exchange.selectedPair.toTokenTicker : 'MNT' || 0)
                      )
                    ) : 0.00}
                  </div>
                </div>
              </div>
              <div className="col">
                <span>Өөрчлөлт</span>
                <div className={exchange.selectedPair.percent == 0 ? "" : exchange.selectedPair.percent > 0 ? "green" : "red"}>
                  {(exchange.selectedPair.percent ? exchange.selectedPair.percent : 0.00) + "%"}
                </div>
              </div>
              <div className="col">
                <span>24Ц Дээд</span>
                <div className="">
                  {exchange.selectedPair.max ? numberWithCommas(
                    numberToFixed(
                      exchange.selectedPair.max,
                      pairFormat(exchange.selectedPair.toTokenTicker ? exchange.selectedPair.toTokenTicker : 'MNT' || 0)
                    )
                  ) : 0.00}
                </div>
              </div>
              <div className="col">
                <span>24Ц Доод</span>
                <div className="">
                  {exchange.selectedPair.min ? numberWithCommas(
                    numberToFixed(
                      exchange.selectedPair.min,
                      pairFormat(exchange.selectedPair.toTokenTicker ? exchange.selectedPair.toTokenTicker : 'MNT' || 0)
                    )
                  ) : 0.00}
                </div>
              </div>
              <div className="col">
                <span>24Ц Хэмжээ</span>
                <div className="">
                  {exchange.selectedPair.volume ? numberWithCommas(
                    numberToFixed(
                      exchange.selectedPair.volume,
                      pairFormat(exchange.selectedPair.toTokenTicker ? exchange.selectedPair.toTokenTicker : 'MNT' || 0)
                    )
                  ) : 0.00}
                </div>
              </div>
            </div>
            <div style={{ flex: 1, paddingBottom: '5px' }}>
              <ThemeConsumer>
                {({ data }) => {
                  return data.theme === "dark" ? (
                    <TradingChartDark />
                  ) : (
                    <TradingChart />
                  );
                }}
              </ThemeConsumer>
            </div>
            <div className="" style={{ height: '250px' }}>
              <HistoryOrder />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 h-100" style={{ flexDirection: 'column', justifyContent: 'space-between', display: 'flex', paddingRight: '5px' }}>
            <div className="row no-gutters" style={{ height: 'calc(100% - 310px)' }}>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 h-100">
                <OrderBook />
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 h-100 pl-1">
                <MarketHistory />
              </div>
            </div>
            <MarketTrade />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exchange;