import React from "react";
import { Tabs, Tab } from "react-bootstrap";

export default function MarketHistory() {
  return (
    <>
      <div className="market-history orders-book mb15">
        <Tabs defaultActiveKey="recent-trades">
          <Tab eventKey="recent-trades" title="Биелсэн Захиалга">
            <table className="table">
              <thead>
                <tr>
                  <th>Огноо</th>
                  <th>Хэмжээ(BTC)</th>
                  <th>Нийт(ETH)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>13:03:53</td>
                  <td className="red">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="red">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="red">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="red">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="red">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="red">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="red">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="red">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="red">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="green">0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className="red">0.020191</td>
                  <td>0.2155045</td>
                </tr>
              </tbody>
            </table>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
