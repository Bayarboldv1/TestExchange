import React, { useEffect, useContext, useState } from "react";
import { SiteContext } from "../context/SiteContext/SiteContext";
import { removeSession } from "../components/helper/utils";
import Layout from "../components/Layout";
import { Switch, Route } from "react-router-dom";
import Exchange from "../pages/exchange";
import Markets from "../pages/markets";
import Profile from "./profile";
// import Wallet from "./wallet";
import Settings from "./settings";
import Login from "./login";
import Reset from "./reset";
import OtpVerify from "./otp-verify";
import OtpNumber from "./otp-number";
import Lock from "./lock";
import TermsAndConditions from "./terms-and-conditions";
import NewsDetails from "./news-details";
import Signup from "./signup/signup";
import Notfound from "./notfound";
import Test from "./test";
import Id from "./settings/id";
import ChangeBank from "./settings/changeBank";
import Wallet from "./wallet/index";

export default function Index() {
  const [loading, setloading] = useState(true);
  // const { loginHandler, setUserData } = useContext(SiteContext);

  useEffect(() => {
    checkUserExists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const checkUserExists = () => {
    let token = sessionStorage.getItem("at");
    let data = sessionStorage.getItem("us");
    if (token && data) {
      // setUserData(JSON.parse(data));
      // loginHandler(true);
    } else {
      removeSession();
      // loginHandler(false);
    }
    setloading(false);
  };
  if (loading) {
    return "";
  }
  return (
    <>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Exchange />
          </Route>
          <Route path="/markets">
            <Markets />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/wallet">
            <Wallet />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/reset">
            <Reset />
          </Route>
          <Route path="/otp-verify">
            <OtpVerify />
          </Route>
          <Route path="/otp-number">
            <OtpNumber />
          </Route>
          <Route path="/lock">
            <Lock />
          </Route>
          <Route path="/terms-and-conditions">
            <TermsAndConditions />
          </Route>
          <Route path="/news-details">
            <NewsDetails />
          </Route>
          <Route path="/notfound">
            <Notfound />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/id">
            <Id />
          </Route>
          <Route path="/change-bank">
            <ChangeBank />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}
