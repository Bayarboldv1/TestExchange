import axios from "axios";
let base_url = "http://192.168.1.103:8080/api/gam/v1/deposit/";
let url = base_url;

class Services {
  getDepositbanks = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}bank`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getDepositTokenAddress = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}token/address`, data)
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
