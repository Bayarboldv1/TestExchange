const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER_BALANCE":
            return {
                ...state,
                fiatBalanceList: action.payload.fiat,
                nonFiatBalanceList: action.payload.nonFiat,
                status: {
                    ...state.status,
                    loaded: true
                },
            };
        case "SET_USER_TOTAL_BALANCE":
            let tb = [];
            if (action.payload.tokens && action.payload.tokens.length > 0) {
                action.payload.tokens.map(t => {
                    tb[t.tokenId] = t;
                })
            }
            return {
                ...state,
                balanceTotal: { totalMNT: action.payload.totalMNT, tokens: tb }
            };
        case "SET_USER_BALANCE_BANKS":
            return {
                ...state,
                depositBanks: action.payload,
            };
        case "SET_USER_SELECTED_BALANCE":
            return {
                ...state,
                selectedBalance: action.payload,
            };
        case "SET_USER_DEPOSIT_ADDRESS":
            return {
                ...state,
                selectedBalance: { ...state.selectedBalance, depositAddress: action.payload },
            };
        default:
            return state;
    }
};

export default reducer;
