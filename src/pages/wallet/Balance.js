import { useState, useEffect, useContext } from "react";
import { Table, Space, message } from "antd";
import {
  numberToFixed,
  numberWithCommas,
  pairFormat,
} from "../../components/helper/utils";
import DepositModalCrypto from "./DepositModalCrypto";
import DepositModalMnt from "./DepositModalMnt";
import { SiteContext } from "../../context/SiteContext/SiteContext";
import MobileBalance from "./MobileBalance";
// import DepositConverter from "./DepositConvertor";

function Balance({ data, loading, getBalance }) {
  const {
    state: { currentUser },
  } = useContext(SiteContext);
  const [quantityData, setquantityData] = useState({});
  const [isMobile, setisMobile] = useState(false);
  const [cryptoType, setcryptoType] = useState({
    mnt: false,
    crypto: false,
    cryptoData: null,
  });
  const [converter, setconverter] = useState({
    data: null,
    show: false,
  });
  useEffect(() => {
    checkClientWidth();

    let obj = {};
    data &&
      Object.keys(data).forEach((i) => {
        let result = 0;
        data[i].forEach((item) => {
          if (item.quantity) {
            result += item.quantity;
          }
        });
        obj[data[i][0]["code"]] = result;
      });
    setquantityData(obj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      let obj = {};
      Object.keys(data).forEach((i) => {
        let result = 0;
        data[i].forEach((item) => {
          if (item.quantity) {
            result += item.quantity;
          }
        });
        obj[data[i][0]["code"]] = result;
        if (data[i][0]["code"] === "MNT" || data[i][0]["code"] === "RTXC") {
          arr.push(data[i][0]);
        }
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

  const onConverterHideHandler = () => {
    try {
      setconverter({ ...converter, show: false, data: null });
    } catch (e) {
      return;
    }
  };

  const onConverter = (value) => {
    try {
      setconverter({ ...converter, show: true, data: value });
    } catch (e) {
      return;
    }
  };
  const columns = [
    {
      title: "Хослол",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="retex--wallet--pair--icon">{text}</div>
      ),
    },
    {
      title: "Үлдэгдэл",
      dataIndex: "balance",
      key: "balance",
      render: (text, record) =>
        numberWithCommas(
          numberToFixed(record.balance, pairFormat(record.code || 0))
        ),
    },

    {
      title: "Захиалганд байгаа",
      dataIndex: "inOrder",
      key: "inOrder",
      render: (text, record) =>
        numberWithCommas(
          numberToFixed(quantityData[record.code], pairFormat(record.code || 0))
        ),
    },
    {
      title: "Боломжит үлдэгдэл",
      dataIndex: "activeTotal",
      key: "activeTotal",
      render: (text, record) =>
        numberWithCommas(
          numberToFixed(
            record.balance - quantityData[record.code],
            pairFormat(record.code || 0)
          )
        ),
    },
    {
      title: "Үйлдэл",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.isDepositable === 1 && record.code === "MNT" && (
            <button
              type="button"
              className="btn retex--wallet--btn btn-sm"
              onClick={() => onDepositHandler(record)}
            >
              Данс цэнэглэх
            </button>
          )}

          {record.isWithdrawable === 1 && record.code === "MNT" && (
            <button type="button" className="btn retex--wallet--btn btn-sm">
              Зарлага
            </button>
          )}
          {record.code === "USDT" && (
            <button
              type="button"
              className="btn retex--wallet--btn btn-sm"
              onClick={() => onConverter(record)}
            >
              MNT болгох
            </button>
          )}
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

  const refreshWallet = () => {
    getBalance();
  };
  return (
    <div className="col-md-12 mt-4 mb-5">
      {!isMobile && (
        <Table
          className="retex--wallet"
          columns={columns}
          dataSource={arrData()}
          pagination={false}
          rowKey="id"
          loading={loading}
        />
      )}

      {isMobile && mobileRender()}

      {cryptoType.crypto && (
        <DepositModalCrypto
          show={cryptoType.crypto}
          hide={() => onDepositHideHandler()}
          data={cryptoType.cryptoData}
        />
      )}
      {cryptoType.mnt && (
        <DepositModalMnt
          show={cryptoType.mnt}
          hide={() => onDepositHideHandler()}
        />
      )}

      {/* {converter.show && (
        <DepositConverter
          show={converter.show}
          hide={() => onConverterHideHandler()}
          data={converter.data}
          refreshWallet={refreshWallet}
        />
      )} */}
    </div>
  );
}

export default Balance;
