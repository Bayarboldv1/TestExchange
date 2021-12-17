export const headers = {
  "content-type":
    "multipart/form-data; boundary=ebf9f03029db4c2799ae16b5428b06bd",
};

export const today = () => {
  let today = new Date();
  let dd = today.getDate();

  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return yyyy + "-" + mm + "-" + dd;
};

export const removeSession = () => {
  sessionStorage.removeItem("at");
  sessionStorage.removeItem("us");
};

export const setSession = (token, data) => {
  sessionStorage.setItem("at", token);
  sessionStorage.setItem("us", data);
};

export const getSession = () => {
  return sessionStorage.getItem("at" || "");
};
export const getUserData = () => {
  return sessionStorage.getItem("us" || "");
};

export const formatDate = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const formatDateOrders = (d) => {
  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const censorWord = (str) => {
  return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
};

export const censorEmail = (email) => {
  var arr = email.split("@");
  return censorWord(arr[0]) + "@" + censorWord(arr[1]);
};

export const HideEmailProvider = (email) => {
  try {
    let hide = email.split("@")[0].length - 2;
    let r = new RegExp(".{" + hide + "}@", "g");
    return email.replace(r, "***@");
  } catch (e) {
    return "";
  }
};

export const moneyFormat = "0,0.00";

export const btcFormat = "0.00000000";

export function numberToFixed(n, f) {
  if (!n) return 0;
  n = parseFloat(n);
  return n.toFixed(f);
}

export function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export const formatMoney = (x) => {
  if (x?.toString()?.includes(".")) {
    let indexz = x?.toString()?.indexOf(".");
    let curIndex = indexz + 1;
    let first = x
      .toString()
      .substring(0, curIndex)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let second = x?.toString()?.substring(curIndex, x.length);
    return `${first}${second}`;
  } else {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const currencyMap = {
  100: "bitcoin",
  101: "ethereum",
  102: "dash",
  // 103: "litecoin",
  104: "ripple",
  201: "ethereum",
  200: "ethereum",
  111: "ethereum",
  113: "ethereum",
  110: "ethereum",
  105: "ethereum",
};

export function formatForMnt(x) {
  if (!x) {
    let num = 0;
    return num.toFixed(2);
  }
  let result = 0;
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (parts?.[1]?.length >= 2) {
    result = `.${parts[1].substring(0, 2)}`;
  } else {
    if (parts?.[1]?.length > 2) {
      result = `.${parts[1]}`;
    }
  }
  return `${parts[0]}${result ? result : ""}`;
}

export function formatForCoin(x, len) {
  if (!x) {
    let num = 0;
    return num.toFixed(len);
  }
  if (x.toString().includes(".")) {
    let result;
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (parts?.[1]?.length >= len) {
      result = `.${parts[1].substring(0, len)}`;
    } else {
      parts?.[1]?.length > len
        ? (result = `.${parts[1]}`)
        : (result = `.${parts[1]}`);
    }
    return `${parts[0]}${result ? result : ""}`;
  } else {
    let num = "0";
    let res = `${x}.${num.repeat(len)}`;
    return numberWithCommas(numberToFixed(res, len));
  }
}

export function formatForCoinWhithoutComma(x, len) {
  if (!x) {
    let num = 0;
    return num.toFixed(len);
  }
  if (x.toString().includes(".")) {
    let result;
    var parts = x.toString().split(".");
    if (parts?.[1]?.length >= len) {
      result = `.${parts[1].substring(0, len)}`;
    } else {
      parts?.[1]?.length > len
        ? (result = `.${parts[1]}`)
        : (result = `.${parts[1]}`);
    }
    return `${parts[0]}${result ? result : ""}`;
  }
  return formatForCoin(x, len);
}

const pairFormatList = {
  MNT: 2,
  BTC: 8,
};

export const pairFormat = (val) => {
  try {
    let res = pairFormatList[val];
    if (res) return res;
    return 8;
  } catch (e) {
    return 8;
  }
};

let tokenList = [
  "ETH",
  "BAT",
  "USDT",
  "OMG",
  "REQ",
  "CND",
  "ARDX",
  "ICTG",
  "BNB",
  "TRD",
  "IHC",
  "MATIC",
  "UNI",
  "MATIC",
  "KOK",
  "CAKE",
  "SPC",
  "DOT",
  "OBOT",
];

export const tokenAddressCheck = (type, value) => {
  try {
    //some check
    if (!type || !value) return false;
    //хэрвээ цэгээр төгөсвөл
    if (value.includes(".")) return false;
    //only number and string
    if (value.match(/[^a-zA-Z\d]+/)) return false;

    //btc
    if (type?.toUpperCase() === "BTC") {
      let res =
        value.startsWith("1") ||
        value.startsWith("3") ||
        value.startsWith("bc");
      if (res) return true;
      return false;
    }

    //ltc
    if (type?.toUpperCase() === "LTC") {
      let res =
        value.startsWith("L") ||
        value.startsWith("M") ||
        value.startsWith("ltc");
      if (res) return true;
      return false;
    }

    //xrp
    if (type?.toUpperCase() === "XRP") {
      let res = value.startsWith("r");
      if (res) return true;
      return false;
    }

    let result = tokenList.some((word) => word === type?.toUpperCase());
    if (result) {
      if (value.startsWith("0x") && value.length === 42) {
        return true;
      }
      return false;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const parseNumber = (val) => {
  let strg = val || "";
  let decimal = ".";
  strg = strg?.replace(/[^0-9$.,]/g, "");
  if (strg.indexOf(",") > strg.indexOf(".")) decimal = ",";
  if ((strg.match(new RegExp("\\" + decimal, "g")) || []).length > 1)
    decimal = "";
  if (
    decimal !== "" &&
    strg.length - strg.indexOf(decimal) - 1 === 3 &&
    strg.indexOf("0" + decimal) !== 0
  )
    decimal = "";
  strg = strg?.replace(new RegExp("[^0-9$" + decimal + "]", "g"), "");
  strg = strg?.replace(",", ".");
  return parseFloat(strg);
};
