const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_LOGGED_IN":
      return {
        ...state,
        isloggedIn: action.payload,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "SET_ID_VERIFICATION":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          idVerification: action.payload,
        },
      };
    case "SET_MOBILE_VERIFICATION":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          mobileVerification: action.payload,
        },
      };
    case "SET_USER_VERIFY_INFO":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          lastName: action.payload.lastName,
          mobileNumber: action.payload.mobileNumber,
          firstName: action.payload.firstName,
        },
      };

    default:
      return state;
  }
};

export default reducer;
