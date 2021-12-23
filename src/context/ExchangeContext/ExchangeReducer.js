const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PAIR_LIST":
            return {
                ...state,
                pairList: action.payload,
            };
        case "SET_SELECTED_PAIR":
            return {
                ...state,
                selectedPair: action.payload,
            };
        case "ADD_SELECTED_PAIR_INFO":
            return {
                ...state,
                selectedPair: action.payload, ...state.selectedPair,
            };
        case "SET_PAIR_BUY":
            return {
                ...state,
                pairBuy: action.payload,
            };
        case "SET_PAIR_SELL":
            return {
                ...state,
                pairSell: action.payload,
            };
        case "SET_PAIR_ORDER":
            return {
                ...state,
                pairOrder: action.payload,
            };
        case "ADD_PAIR_BUY":
            return {
                ...state,
                pairBuy: action.payload,
            };
        case "ADD_PAIR_SELL":
            return {
                ...state,
                pairSell: action.payload,
            };
        case "ADD_PAIR_ORDER":
            return {
                ...state,
                pairOrder: [{
                    price: action.payload.price,
                    quantity: action.payload.quantity,
                    date: action.payload.createdDate,
                    color: state.pairOrder.length === 0 ? "green" : state.pairOrder[0].price > action.payload.price ? "red" : "green"
                }, ...state.pairOrder],
            };
        case "SET_BALANCE":
            return {
                ...state,
                balance: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
