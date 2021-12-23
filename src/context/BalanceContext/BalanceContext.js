import React, { createContext, useEffect, useReducer } from 'react';
import BalanceReducer from './BalanceReducer';
import WalletService from '../../service/wallet/index';
import DepositService from '../../service/deposit/index';

const BalanceContext = createContext();
const BalanceConsumer = BalanceContext.Consumer;

const BalanceProvider = ({ children }) => {

    const initialState = {
        status: {
            loading: false,
            loaded: false
        },
        fiatBalanceList: [],
        nonFiatBalanceList: [],
        balanceTotal: {},
        depositBanks: [],
        selectedBalance: {}
    }

    const [balance, dispatch] = useReducer(BalanceReducer, initialState);

    const setBalanceList = async () => {
        try {
            WalletService.getWalletBalance().then((res) => {
                let fiat = [];
                let nonFiat = [];
                res.data.map(d => {
                    if (d.tokenType === 1) {
                        fiat[d.tokenId] = d;
                    } else {
                        nonFiat[d.tokenId] = d;
                    }
                })
                dispatch({ type: "SET_USER_BALANCE", payload: { fiat: fiat, nonFiat: nonFiat } });
            }).catch((e) => {
                dispatch({ type: "SET_USER_BALANCE", payload: { fiat: [], nonFiat: [] } });
            });
        } catch (e) {
            dispatch({ type: "SET_USER_BALANCE", payload: { fiat: [], nonFiat: [] } });
        }
    };

    const setBalanceTotal = async () => {
        try {
            WalletService.getBalanceMNT().then((res) => {
                dispatch({ type: "SET_USER_TOTAL_BALANCE", payload: res.data });
            }).catch((e) => {
                dispatch({ type: "SET_USER_TOTAL_BALANCE", payload: {} });
            });
        } catch (e) {
            dispatch({ type: "SET_USER_TOTAL_BALANCE", payload: {} });
        }
    };

    const setDepositBanks = async () => {
        try {
            DepositService.getDepositbanks().then((res) => {
                dispatch({ type: "SET_USER_BALANCE_BANKS", payload: res.data });
            }).catch((e) => {
                dispatch({ type: "SET_USER_BALANCE_BANKS", payload: [] });
            });
        } catch (e) {
            dispatch({ type: "SET_USER_BALANCE_BANKS", payload: [] });
        }
    };

    const setDepositAddress = async (tokenId) => {
        try {
            DepositService.getDepositTokenAddress(tokenId).then((res) => {
                dispatch({ type: "SET_USER_DEPOSIT_ADDRESS", payload: res.data });
            }).catch((e) => {
                dispatch({ type: "SET_USER_DEPOSIT_ADDRESS", payload: "" });
            });
        } catch (e) {
            dispatch({ type: "SET_USER_DEPOSIT_ADDRESS", payload: "" });
        }
    };

    const setSelectedBalance = async (data) => {
        dispatch({ type: "SET_USER_SELECTED_BALANCE", payload: data });
    };

    return (
        <BalanceContext.Provider value={{ balance, dispatch, setBalanceList, setBalanceTotal, setDepositBanks, setDepositAddress, setSelectedBalance }}>
            {children}
        </BalanceContext.Provider>
    );

}

export { BalanceContext, BalanceProvider, BalanceConsumer };