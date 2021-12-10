import React, { createContext, useReducer } from "react";
import SiteReducer from "./SiteReducer";
export const SiteContext = createContext();

const SiteContextProvider = ({ children }) => {
  //initial state
  const initialState = {
    isloggedIn: null,
    currentUser: null,
  };

  const [state, dispatch] = useReducer(SiteReducer, initialState);
  const loginHandler = (data) => {
    dispatch({ type: "SET_USER_LOGGED_IN", payload: data });
  };
  const setUserData = (data) => {
    dispatch({ type: "SET_USER_DATA", payload: data });
  };
  const changeIdVerification = (data) => {
    dispatch({ type: "SET_ID_VERIFICATION", payload: data });
    let storeData = JSON.parse(sessionStorage.getItem("us" || ""));
    if (storeData) {
      storeData.idVerification = data;
      sessionStorage.setItem("us", JSON.stringify(storeData));
    }
  };

  const changeUserVerifyInfo = (data) => {
    dispatch({ type: "SET_USER_VERIFY_INFO", payload: data });
    let storeData = JSON.parse(sessionStorage.getItem("us" || ""));
    if (storeData) {
      storeData.lastName = data.lastName;
      storeData.mobileNumber = data.mobileNumber;
      storeData.firstName = data.firstName;
      sessionStorage.setItem("us", JSON.stringify(storeData));
    }
  };
  const changeMobileVerification = (data) => {
    dispatch({ type: "SET_MOBILE_VERIFICATION", payload: data });
    let storeData = JSON.parse(sessionStorage.getItem("us" || ""));
    if (storeData) {
      storeData.mobileVerification = data;
      sessionStorage.setItem("us", JSON.stringify(storeData));
    }
  };
  const changeAuthType = (data) => {
    dispatch({ type: "SET_AUTH_TYPE", payload: data });
    let storeData = JSON.parse(sessionStorage.getItem("us" || ""));
    if (storeData) {
      storeData.auth = data.toUpperCase();
      sessionStorage.setItem("us", JSON.stringify(storeData));
    }
  };

  return (
    <SiteContext.Provider
      value={{
        state,
        setUserData,
        loginHandler,
        changeIdVerification,
        changeMobileVerification,
        changeUserVerifyInfo,
        changeAuthType,
        dispatch,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export default SiteContextProvider;
