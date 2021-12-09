import React, { Component } from "react";
import HistoryOrder from "../components/HistoryOrder";
import MarketHistory from "../components/MarketHistory";
import MarketNews from "../components/MarketNews";
import MarketPairs from "../components/MarketPairs";
import MarketTrade from "../components/MarketTrade";
import OrderBook from "../components/OrderBook";
import TradingChart from "../components/TradingChart";
import TradingChartDark from "../components/TradingChartDark";
import { ThemeConsumer } from "../context/ThemeContext";

export default class exchange extends Component {
  render() {
    return (
      <>
        <div className="container-fluid mtb20 no-fluid">
          <div className="exchangeDiv row sm-gutters">
            {/* <div className="col-sm-12 col-md-3">
              <MarketPairs />
            </div> */}
            <div className="col-sm-12 col-md-8">
              <div className="secondHeader row mt-1">
                <div className="form-group1 col">
                  {/* <select id="selectBank" className="custom-select">
                    <option defaultValue value="BTC">
                      BTC
                    </option>
                    <option value="LUNA">LUNA</option>
                    <option value="SHIBA">SHIBA</option>
                    <option value="ETH">ETH</option>
                    <option value="UNI">UNI</option>
                  </select> */}
                </div>
                <div className="col">
                  <div className="green mt-2">
                    <h5>32423432</h5>
                  </div>
                </div>
                <div className="col">
                  <span>Өөрчлөлт</span>
                  <div className="green">+0.15%</div>
                </div>
                <div className="col">
                  <span>24Ц Дээд</span>
                  <div className="">32423432</div>
                </div>
                <div className="col">
                  <span>24Ц Доод</span>
                  <div className="">32423432</div>
                </div>
                <div className="col">
                  <span>24Ц Хэмжээ</span>
                  <div className="">32423432</div>
                </div>
              </div>
              <ThemeConsumer>
                {({ data }) => {
                  return data.theme === "dark" ? (
                    <TradingChart />
                  ) : (
                    <TradingChartDark />
                  );
                }}
              </ThemeConsumer>
              <div className="col-md-16">
                <HistoryOrder />
              </div>
            </div>
            <div className="col-md">
              <div className="row">
                <div className="col">
                  <OrderBook />
                </div>
                <div className="col">
                  <MarketHistory />
                </div>
                <MarketTrade />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
