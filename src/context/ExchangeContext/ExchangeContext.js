import React, { createContext, useEffect, useReducer } from 'react';
import ExchangeReducer from './ExchangeReducer';
import WalletService from '../../service/wallet/index';

const ExchangeContext = createContext();
const ExchangeConsumer = ExchangeContext.Consumer;

const ExchangeProvider = ({ children }) => {

    const initialState = {
        pairList: [],
        selectedPair: {},
        pairBuy: [],
        pairSell: [],
        pairOrder: [],
        balance: {}
    }

    const [exchange, dispatch] = useReducer(ExchangeReducer, initialState);

    const setPairList = async (data) => {
        dispatch({ type: "SET_PAIR_LIST", payload: data });
    };

    const setSelectedPair = async (data) => {
        dispatch({ type: "SET_SELECTED_PAIR", payload: data });
    };

    const addSelectedPairInfo = async (data) => {
        dispatch({ type: "ADD_SELECTED_PAIR_INFO", payload: data });
    };

    const setPairBuy = async (data) => {
        let allBuy = [];
        let sortedBuy = [];
        data.map((s, i) => {
            let order = {
                price: s[0],
                quantity: s[1],
                total: s[0] * s[1]
            }
            allBuy.push(order);
        })
        sortedBuy = allBuy.sort(function (a, b) { return b.price - a.price });
        dispatch({ type: "SET_PAIR_BUY", payload: sortedBuy });
    };

    const setPairSell = async (data) => {
        let allSell = [];
        let sortedSell = [];
        data.map((s, i) => {
            let order = {
                price: s[0],
                quantity: s[1],
                total: s[0] * s[1]
            }
            allSell.push(order);
        })
        sortedSell = allSell.sort(function (a, b) { return b.price - a.price });
        dispatch({ type: "SET_PAIR_SELL", payload: sortedSell });
    };

    const setPairOrder = async (orders) => {
        let allOrder = [];
        orders.id.map((o, i) => {
            let order = {
                id: o,
                price: orders.p[i],
                quantity: orders.q[i],
                date: orders.c[i]
            }
            allOrder.push(order);
        })
        allOrder = allOrder.sort(function (a, b) { return b.id - a.id })
        allOrder.map((a, i) => {
            if (i === allOrder.length - 1) {
                a.color = "green";
            } else {
                a.color = a.price < allOrder[i + 1].price ? "red" : "green";
            }
        });
        dispatch({ type: "SET_PAIR_ORDER", payload: allOrder });
    };

    const setBalance = async () => {
        if (exchange.selectedPair.fromTokenId != null && exchange.selectedPair.toTokenId != null) {
            WalletService.getBalancePair(exchange.selectedPair.fromTokenId, exchange.selectedPair.toTokenId).then(res => {
                console.log("sonin yum sdaa")
                dispatch({ type: "SET_BALANCE", payload: res.data });
            }).catch(err => {
                dispatch({ type: "SET_BALANCE", payload: {} });
            })
        } else {
            dispatch({ type: "SET_BALANCE", payload: {} });
        }
    };

    const setPairBuyAdd = async (buy, pairBuy) => {
        let b = pairBuy;
        let a = {
            price: buy[0],
            quantity: buy[1],
            total: buy[0] * buy[1]
        };
        let length = b.length;
        for (let i = 0; i < length; i++) {
            if (b[i]['price'] === a['price'] && a['total'] === 0) {
                b.splice(i, 1);
                break;
            } else if (b[i]['price'] === a['price'] && a['total'] > 0) {
                b[i]['price'] = a['price'];
                b[i]['quantity'] = a['quantity'];
                b[i]['total'] = a['total'];
                break;
            } else if (a['price'] > b[i]['price']) {
                b.splice(i, 0, a);
                break;
            }
        }
        dispatch({ type: "ADD_PAIR_BUY", payload: pairBuy.length === 0 ? new Array(a) : b });
    };

    const setPairSellAdd = async (sell, pairSell) => {
        let b = pairSell;
        let a = {
            price: sell[0],
            quantity: sell[1],
            total: sell[0] * sell[1]
        };
        let length = b.length;
        for (let i = 0; i < length; i++) {
            if (b[i]['price'] === a['price'] && a['total'] === 0) {
                b.splice(i, 1);
                break;
            } else if (b[i]['price'] === a['price'] && a['total'] > 0) {
                b[i]['price'] = a['price'];
                b[i]['quantity'] = a['quantity'];
                b[i]['total'] = a['total'];
                break;
            } else if (a['price'] > b[i]['price']) {
                b.splice(i, 0, a);
                break;
            }
        }
        dispatch({ type: "ADD_PAIR_SELL", payload: pairSell.length === 0 ? new Array(a) : b });
    };

    const setPairOrderAdd = async (order) => {
        dispatch({ type: "ADD_PAIR_ORDER", payload: order });
    };

    return (
        <ExchangeContext.Provider value={{ exchange, dispatch, setSelectedPair, addSelectedPairInfo, setPairList, setPairOrder, setBalance, setPairBuy, setPairSell, setPairOrderAdd, setPairBuyAdd, setPairSellAdd }}>
            {children}
        </ExchangeContext.Provider>
    );

}

export { ExchangeContext, ExchangeProvider, ExchangeConsumer };