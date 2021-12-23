import { instance as axios } from "../AxiosInterceptor";
// import axios from "axios";
let base_url = "/api/gam/v1/settings/";
let url = base_url;

class Services {
  changePassword = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .post(`${url}change/password`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  changeVerificationType = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .post(`${url}change/verification/type`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  createEmailOtp = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}email/otp/create?email=${data}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  createPhoneOtp = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}phone/otp/create?phone=${data}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  verifyOtp = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}verify/otp`, data)
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
