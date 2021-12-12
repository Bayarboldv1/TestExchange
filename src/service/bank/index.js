import axios from "axios";

class Services {
  banks = (data) => {
    return new Promise(function () {
      axios
        .get("http://192.168.1.103:8080/api/gam/v1/util/bank")
        .then(function (response) {
          console.log(response);
        });
    });
  };
}
const instance = new Services();
export default instance;
