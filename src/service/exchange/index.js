import { instance as axios } from "../AxiosInterceptor";
let base_url = "/api/gam/v1/exchange/";
let url = base_url;

class Services {
  cancelExchange = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}cancel`, { params: { exchangeId: data } })
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

  getActiveExchange = (page, size) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}list/active`, { params: { page: page, size: size } })
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
