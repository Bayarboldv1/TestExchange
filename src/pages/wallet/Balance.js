import { useState, useEffect, useContext } from "react";
import { Table, Space, message, Switch } from "antd";
import {
  numberToFixed,
  numberWithCommas,
  pairFormat,
} from "../../components/helper/utils";
import DepositModalCrypto from "./DepositModalCrypto";
import DepositModalMnt from "./DepositModalMnt";
import { SiteContext } from "../../context/SiteContext/SiteContext";
import MobileBalance from "./MobileBalance";
import balance from "../../assets/css/balance.css";
// import DepositConverter from "./DepositConvertor";

import InModal from "../../components/modals/Modal";
import ModalMnt from "../../components/modals/ModalMNT";
import WithdrawModal from "./WithdrawModal";
import OutModal from "../../components/modals/OutModal";
import OutMnt from "../../components/modals/OutMnt";

function Balance({ data, loading, getBalance }) {
  const currentUser = useContext(SiteContext);
  const [quantityData, setquantityData] = useState({});
  const [isMobile, setisMobile] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMnt, setModalMnt] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [outModal, setOutModal] = useState(false);
  const [outMnt, setOutMnt] = useState(false);
  const [cryptoType, setcryptoType] = useState({
    mnt: false,
    crypto: false,
    cryptoData: null,
  });
  useEffect(() => {
    checkClientWidth();
  }, []);

  const checkClientWidth = () => {
    try {
      let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      width > 996 ? setisMobile(false) : setisMobile(true);
    } catch (e) {
      return;
    }
  };
  const arrData = () => {
    try {
      let arr = [];
      data.map((d, index) => {
        arr.push(d);
      });
      return arr;
    } catch (e) {
      return [];
    }
  };

  const onDepositHandler = (values) => {
    try {
      if (!currentUser.mobileVerification || currentUser.idVerification !== 3) {
        return message.error("Таны хэрэглэгч баталгаажуулалт дутуу байна.");
      }
      if (values.code === "MNT") {
        return setcryptoType({ ...cryptoType, mnt: true, crypto: false });
      } else {
        return setcryptoType({
          ...cryptoType,
          mnt: false,
          crypto: true,
          cryptoData: values,
        });
      }
    } catch (e) {
      return;
    }
  };

  const onDepositHideHandler = () => {
    try {
      setcryptoType({ ...cryptoType, mnt: false, crypto: false });
    } catch (e) {
      return;
    }
  };
  const [dat, setDat] = useState("");
  const [outId, setOutId] = useState("");
  const columns = [
    {
      title: "ВАЛЮТ",
      dataIndex: "tokenName",
      key: "tokenName",
      render: (text, record) => (
        <div className="retex--wallet--pair--icon">
          {record.tokenName + " (" + record.tokenTicker + ")"}
        </div>
      ),
    },
    {
      title: "Үлдэгдэл",
      dataIndex: "balance",
      key: "balance",
      render: (text, record) =>
        numberWithCommas(
          record.tokenBalance,
          pairFormat(record.tokenTicker || 0)
        ),
    },

    {
      title: "Захиалганд байгаа",
      dataIndex: "inOrder",
      key: "inOrder",
      render: (text, record) =>
        numberWithCommas(
          numberToFixed(
            record.tokenOrderedBalance === null
              ? 0
              : record.tokenOrderedBalance,
            pairFormat(record.tokenTicker || 0)
          )
        ),
    },
    {
      title: "Боломжит үлдэгдэл",
      dataIndex: "activeTotal",
      key: "activeTotal",
      render: (text, record) =>
        numberWithCommas(
          record.tokenBalance,
          pairFormat(record.tokenTicker || 0)
        ),
    },
    {
      title: "Гүйлгээ",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.tokenDeposit ? (
            record.tokenId === 1 ? (
              <button
                onClick={(e) => setModalMnt(true)}
                type="button"
                className="btn retex--wallet--btn btn-sm"
              >
                Орлого
              </button>
            ) : (
              <button
                // style={{ color: "blue" }}
                onClick={() => {
                  return setModalOpen(true), setDat(record.tokenId);
                }}
                type="button"
                className="btn retex--wallet--btn btn-sm"
              >
                Орлого
              </button>
            )
          ) : null}
          {record.tokenWithdraw ? (
            record.tokenId === 1 ? (
              <button
                onClick={(e) => setOutMnt(true)}
                type="button"
                className="btn retex--wallet--btn btn-sm"
              >
                Зарлага
              </button>
            ) : (
              <button
                type="button"
                className="btn retex--wallet--btn btn-sm"
                onClick={() => {
                  return setOutModal(true), setOutId(record.tokenId);
                }}
              >
                Зарлага
              </button>
            )
          ) : null}

          {record.tokenExchange ? (
            <button type="button" className="btn retex--wallet--btn btn-sm">
              Арилжаа
            </button>
          ) : null}
        </Space>
      ),
    },
  ];

  const mobileRender = () => {
    try {
      return arrData()?.map((item) => {
        return (
          <MobileBalance
            key={item.id}
            item={item}
            quantityData={quantityData}
            onDepositHandler={onDepositHandler}
          />
        );
      });
    } catch (e) {
      return;
    }
  };

  return (
    <div className="Tbale mt-4 mb-5 d-flex justify-content-center ">
      {/* Crypto orlogo */}
      <InModal
        tokenId={dat}
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        // show={cryptoType.crypto}
      />
      <ModalMnt
        show={modalMnt}
        onHide={() => setModalMnt(false)}
        data={cryptoType.cryptoData}
      />
      {/* crypto zarlaga */}
      <OutModal id={outId} show={outModal} onHide={() => setOutModal(false)} />

      <OutMnt id={outId} show={outModal} onHide={() => setOutModal(false)} />

      {!isMobile && (
        <Table
          className="ant ml-5 mr-5 col-md-9 table-response "
          columns={columns}
          dataSource={arrData()}
          pagination={false}
          rowKey="id"
          loading={loading}
          rowClassName={(record) => (record.tokenName = "#08AE4E")}
        />
      )}

      {isMobile && mobileRender()}
    </div>
  );
}

export default Balance;
