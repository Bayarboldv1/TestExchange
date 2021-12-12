import axios from "axios";
let base_url = "http://192.168.1.103:8080/api/gam/v1/auth/";
let url = base_url;

class Services {
  login = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}signin`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  signup = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .post(`${url}signup`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  verify = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .post(`${url}check`, data)
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
