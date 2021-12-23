import { instance as axios } from "../AxiosInterceptor";
// import axios from "axios";
let base_url = "/api/gam/v1/deposit/";
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

  getDepositTokenAddress = (address) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}token/address?tokenId=${address}`)
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
