import { instance as axios } from "../AxiosInterceptor";
// import axios from "axios";
let base_url = "/api/gam/v1/wallet/";
let url = base_url;

class Services {
  getWalletBalance = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}balance`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getBalanceMNT = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}balance/mnt`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getBalancePair = (fromTokenId, toTokenId) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}balance/pair`, {
          params: { fromTokenId: fromTokenId, toTokenId: toTokenId },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getDepisotList = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}deposit/list`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getTokenDetail = (data) => {
    return new Promise(function (resolve, reject) {
      console.log("da", data);
      axios
        .get(`${url}token/detail?tokenId=${data}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getWithdrawList = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}withdraw/list`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

const instance = new Services();
export default instance;
