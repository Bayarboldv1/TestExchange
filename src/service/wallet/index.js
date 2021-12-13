import axios from "axios";
let base_url = "http://192.168.1.103:8080/api/gam/v1/wallet/";
let url = base_url;

class Services {
  getWalletBalance = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}wallet/balance`, data)
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
      axios
        .get(`${url}token/detail`, data)
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
