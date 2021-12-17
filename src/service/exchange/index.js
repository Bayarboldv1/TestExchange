import axios from "axios";
let base_url = "/api/gam/v1/exchange/";
let url = base_url;

class Services {
  cancelExchange = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}cancel`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  createExchange = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .post(`${url}create`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getActiveExchange = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}list/active`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getAllExchange = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}list/all`, data)
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
