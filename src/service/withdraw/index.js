import axios from "axios";
let base_url = "http://192.168.1.103:8080/api/gam/v1/withdraw/";
let url = base_url;

class Services {
  withdrawFiat = () => {
    return new Promise(function (resolve, reject) {
      axios
        .post(`${url}fiat`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  withdrawNonFiat = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .post(`${url}non/fiat`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  withdrawVerify = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .post(`${url}verify`, data)
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
