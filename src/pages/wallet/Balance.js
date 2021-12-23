import { useState, useEffect, useContext } from "react";
// import { Table, Space, message, Switch } from "antd";
import { Table } from "react-bootstrap";
import {
  numberToFixed,
  numberWithCommas,
  pairFormat,
} from "../../components/helper/utils";
import DepositModalCrypto from "./DepositModalCrypto";
import DepositModalMnt from "./DepositModalMnt";
import { SiteContext } from "../../context/SiteContext/SiteContext";
import MobileBalance from "./MobileBalance";
import Service from "../../service/wallet/index";
import balance from "../../assets/css/balance.css";
import DepoService from "../../service/deposit/index";
import UtilService from "../../service/wallet/index";

import WithdrawModal from "./WithdrawModal";
import ModalNonFiat from "../../components/modals/ModalNonFiat";
import ModalFiat from "../../components/modals/ModalFiat";
import { BalanceContext } from "../../context/BalanceContext/BalanceContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import ModalDeposit from "../../components/modals/ModalDeposit";
import { UserContext } from "../../context/UserContext";
import { message } from "antd";

function Balance({ loading }) {
  const { balance, setDepositBanks, setDepositAddress, setSelectedBalance } =
    useContext(BalanceContext);
  const { user } = useContext(UserContext);
  const { data } = useContext(ThemeContext);

  console.log("balance", balance);
  const [modalDeposit, setModalDeposit] = useState(false);

  // const [quantityData, setquantityData] = useState({});
  // const [isMobile, setisMobile] = useState(false);

  // const [modalOpen, setModalOpen] = useState(false);
  // const [withdraw, setWithdraw] = useState(false);
  // const [outModal, setOutModal] = useState(false);
  // const [outMnt, setOutMnt] = useState(false);
  // const [tokenDetail, setTokenDetail] = useState("");
  // const [address, setAddress] = useState("");
  // const [cryptoType, setcryptoType] = useState({
  //   mnt: false,
  //   crypto: false,
  //   cryptoData: null,
  // });

  const onDeposit = (data, type) => {
    if (user.user.statusId != 7) {
      message.warning("Баталгаажаагүй хэрэглэгч байна");
    } else {
      setSelectedBalance(data);
      setModalDeposit(true);
      if (type === "fiat") {
        setDepositBanks();
      } else {
        setDepositAddress(data.tokenId);
      }
    }
  };

  // const columns = [
  //   {
  //     title: "Тикер",
  //     dataIndex: "tokenTicker",
  //     key: "tokenTicker",
  //     render: (text, record) => (
  //       <div className="">
  //         {record.tokenTicker}
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Нэр",
  //     dataIndex: "tokenName",
  //     key: "tokenName",
  //     render: (text, record) => (
  //       <div className="">
  //         {record.tokenName}
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Үлдэгдэл",
  //     dataIndex: "balance",
  //     key: "balance",
  //     render: (text, record) =>
  //       numberWithCommas(
  //         record.tokenBalance,
  //         pairFormat(record.tokenTicker || 0)
  //       ),
  //   },

  //   {
  //     title: "Захиалганд байгаа",
  //     dataIndex: "inOrder",
  //     key: "inOrder",
  //     render: (text, record) =>
  //       numberWithCommas(
  //         numberToFixed(
  //           record.tokenOrderedBalance === null
  //             ? 0
  //             : record.tokenOrderedBalance,
  //           pairFormat(record.tokenTicker || 0)
  //         )
  //       ),
  //   },
  //   {
  //     title: "Боломжит үлдэгдэл",
  //     dataIndex: "activeTotal",
  //     key: "activeTotal",
  //     render: (text, record) =>
  //       numberWithCommas(
  //         record.tokenBalance,
  //         pairFormat(record.tokenTicker || 0)
  //       ),
  //   },
  //   {
  //     title: "Гүйлгээ",
  //     key: "action",
  //     render: (text, record, index) => (
  //       <Space size="middle">
  //         {record.tokenDeposit ? (
  //           <button
  //             onClick={() => onDeposit(index)}
  //             type="button"
  //             className="btn btn-sm"
  //           >
  //             {"Орлого"}
  //           </button>
  //         ) : null}
  //         {/* {record.tokenWithdraw ? (
  //           record.tokenType === 1 ? (
  //             <button
  //               onClick={() => {
  //                 UtilService.getTokenDetail(record.tokenId)
  //                   .then((res) => {
  //                     if (res) {
  //                       if (res.data.status === 200) {
  //                         setTokenDetail(res);
  //                       }
  //                     }
  //                   })
  //                   .catch((e) => {
  //                     return;
  //                   });
  //                 return (
  //                   setOutMnt(true),
  //                   setOutMntId(record.tokenId),
  //                   setOutModalBalance(record.tokenBalance)
  //                 );
  //               }}
  //               type="button"
  //               className="btn retex--wallet--btn btn-sm"
  //             >
  //               Зарлага
  //             </button>
  //           ) : (
  //             <button
  //               type="button"
  //               className="btn retex--wallet--btn btn-sm"
  //               onClick={() => {
  //                 UtilService.getTokenDetail(record.tokenId)
  //                   .then((res) => {
  //                     if (res) {
  //                       if (res.data.status === 200) {
  //                         setTokenDetail(res);
  //                       }
  //                     }
  //                   })
  //                   .catch((e) => {
  //                     return;
  //                   });

  //                 return (
  //                   setOutModal(true),
  //                   setOutId(record.tokenId),
  //                   setOutModalBalance(record.tokenBalance)
  //                 );
  //               }}
  //             >
  //               Зарлага
  //             </button>
  //           )
  //         ) : null} */}

  //         {record.tokenExchange ? (
  //           <button type="button" className="btn btn-sm">
  //             Арилжаа
  //           </button>
  //         ) : null}
  //       </Space>
  //     ),
  //   },
  // ];

  return (
    <div className={"wallet-table-container"}>
      <ModalDeposit show={modalDeposit} onHide={() => setModalDeposit(false)} />
      {/* <ModalNonFiat
        tokenDetail={tokenDetail}
        balance={outModalBalance}
        id={outId}
        show={outModal}
        onHide={() => setOutModal(false)}
      />

      <ModalFiat
        balance={outModalBalance}
        tokenDetail={tokenDetail}
        show={outMnt}
        onHide={() => setOutMnt(false)}
      /> */}
      {balance.fiatBalanceList.length > 0 && (
        <p className="wallet-title">Fiat үлдэгдэл</p>
      )}
      <Table
        className={
          "wallet-table " + (data.theme === "dark" ? "wallet-table-dark" : "")
        }
      >
        <thead>
          <tr>
            <th>Нэр</th>
            <th>Нийт</th>
            <th>Боломжит</th>
            <th>Захиалганд байгаа</th>
            <th>Төгрөгөөр</th>
            <th>Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {balance.fiatBalanceList &&
            balance.fiatBalanceList.map((b) => {
              return (
                <tr key={b.tokenId}>
                  <td>
                    <div
                      style={{
                        justifyContent: "left",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginRight: "15px", width: "30px" }}>
                        <img
                          src={
                            b.tokenTicker === "MNT"
                              ? "img/icon/19.png"
                              : "img/icon/1.png"
                          }
                          style={{ width: "100%" }}
                        ></img>
                      </div>
                      <div>
                        <strong>{b.tokenTicker}</strong>
                        <br />
                        {b.tokenName}
                      </div>
                    </div>
                  </td>
                  <td>
                    {numberWithCommas(
                      numberToFixed(
                        b.tokenBalance === null ? 0 : b.tokenBalance,
                        pairFormat(b.tokenTicker || 0)
                      )
                    )}
                  </td>
                  <td>
                    {numberWithCommas(
                      numberToFixed(
                        b.tokenBalance === null ? 0 : b.tokenBalance,
                        pairFormat(b.tokenTicker || 0)
                      )
                    )}
                  </td>
                  <td>
                    {numberWithCommas(
                      numberToFixed(
                        b.tokenOrderedBalance === null
                          ? 0
                          : b.tokenOrderedBalance,
                        pairFormat(b.tokenTicker || 0)
                      )
                    )}
                  </td>
                  <td>
                    {"≈" +
                      numberWithCommas(
                        numberToFixed(
                          balance.balanceTotal &&
                            balance.balanceTotal.tokens &&
                            balance.balanceTotal.tokens[b.tokenId]
                            ? balance.balanceTotal.tokens[b.tokenId][
                                "balanceMNT"
                              ]
                            : 0.0,
                          pairFormat("MNT" || 0)
                        )
                      ) +
                      "₮"}
                  </td>
                  <td>
                    {b.tokenDeposit ? (
                      <button
                        className="green btn btn-link"
                        onClick={() => onDeposit(b, "fiat")}
                      >
                        Орлого
                      </button>
                    ) : (
                      false
                    )}
                    {b.tokenWithdraw ? (
                      <button className="red btn btn-link">Зарлага</button>
                    ) : (
                      false
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      {balance.nonFiatBalanceList.length > 0 && (
        <p className="wallet-title mt-4">Крипто үлдэгдэл</p>
      )}
      <Table
        className={
          "wallet-table " + (data.theme === "dark" ? "wallet-table-dark" : "")
        }
      >
        <thead>
          <tr>
            <th>Нэр</th>
            <th>Нийт</th>
            <th>Боломжит</th>
            <th>Захиалганд байгаа</th>
            <th>Төгрөгөөр</th>
            <th>Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {balance.nonFiatBalanceList &&
            balance.nonFiatBalanceList.map((b) => {
              return (
                <tr key={b.tokenId}>
                  <td>
                    <div
                      style={{
                        justifyContent: "left",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginRight: "15px", width: "30px" }}>
                        <img
                          src={
                            b.tokenTicker === "BTC"
                              ? "img/icon/18.png"
                              : "img/icon/1.png"
                          }
                          style={{ width: "100%" }}
                        ></img>
                      </div>
                      <div>
                        <strong>{b.tokenTicker}</strong>
                        <br />
                        {b.tokenName}
                      </div>
                    </div>
                  </td>
                  <td>
                    {numberWithCommas(
                      numberToFixed(
                        b.tokenBalance === null ? 0 : b.tokenBalance,
                        pairFormat(b.tokenTicker || 0)
                      )
                    )}
                  </td>
                  <td>
                    {numberWithCommas(
                      numberToFixed(
                        b.tokenBalance === null ? 0 : b.tokenBalance,
                        pairFormat(b.tokenTicker || 0)
                      )
                    )}
                  </td>
                  <td>
                    {numberWithCommas(
                      numberToFixed(
                        b.tokenOrderedBalance === null
                          ? 0
                          : b.tokenOrderedBalance,
                        pairFormat(b.tokenTicker || 0)
                      )
                    )}
                  </td>
                  <td>
                    {"≈" +
                      numberWithCommas(
                        numberToFixed(
                          balance.balanceTotal &&
                            balance.balanceTotal.tokens &&
                            balance.balanceTotal.tokens[b.tokenId]
                            ? balance.balanceTotal.tokens[b.tokenId][
                                "balanceMNT"
                              ]
                            : 0.0,
                          pairFormat("MNT" || 0)
                        )
                      ) +
                      "₮"}
                  </td>
                  <td>
                    {b.tokenDeposit ? (
                      <button
                        className="green btn btn-link"
                        onClick={() => onDeposit(b, "nonfiat")}
                      >
                        Орлого
                      </button>
                    ) : (
                      false
                    )}
                    {b.tokenWithdraw ? (
                      <button className="red btn btn-link">Зарлага</button>
                    ) : (
                      false
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default Balance;
