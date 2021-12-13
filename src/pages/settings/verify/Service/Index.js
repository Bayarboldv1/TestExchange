import axios from "axios";
let base_url = "http://192.168.1.103:8080/api/gam/v1/auth/";
let url = base_url;

class MainService {
  //хэрэглэгчийн мэдээлэл баталгааажуулалт
  storeUserInfo = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .post(`${url}verify/mobile`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  //хэрэглэгчийн утас баталгааажуулалт
  confirmMobile = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`verify/mobile/sms?confirmCode=${data}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  //хэрэглэгчийн дахин баталгааажуулах message авах mobile
  resendMobile = () => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`verify/send/sms`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  //хэрэглэгчийн зураг илгээнэ
  storeDocumentImage = (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .post(`${url}verify/id`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  //хэрэглэгчийн id status check
  checkUserStatusId = () => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${url}user/id/check`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

const instance = new MainService();
export default instance;
