import React from 'react';
import { instance as axios } from '../AxiosInterceptor';
class SocketService {

    getInitialData = () => {
        return new Promise(function (resolve, reject) {
            axios
                .get('https://ws.coinmart.mn/api/v1/init/get?ticker=BTC/MNT')
                // .get('http://192.168.1.107:5000/api/v1/init/get?ticker=BTC/MNT')
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

}

const instance = new SocketService();
export default instance;