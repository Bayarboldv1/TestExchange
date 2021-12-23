import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import Exchange from "./exchange";
import Profile from "./profile";
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
import Document from "./settings/verify/Document";
import ChangeBank from "./settings/changeBank";
import ProtectedRoute from "./ProtectedRoute";
import Wallet from "../pages/wallet/index";
import Deposit from "../pages/deposit/Deposit";
import Withdraw from "../pages/withdraw/Withdraw";
import { SocketConsumer } from "../context/SocketContext";
import { ExchangeProvider } from "../context/ExchangeContext/ExchangeContext";
import { BalanceProvider } from "../context/BalanceContext/BalanceContext";

export default function Index() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/reset" component={Reset} />
        <Layout>
          <Route exact path="/">
            <ExchangeProvider>
              <Exchange />
            </ExchangeProvider>
          </Route>
          <Route exact path="/exchange">
            <ExchangeProvider>
              <Exchange />
            </ExchangeProvider>
          </Route>
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/wallet" component={Wallet} />
          <ProtectedRoute path="/deposit/:tokenId" component={Deposit} />
          <ProtectedRoute path="/withdraw" component={Withdraw} />
          <ProtectedRoute path="/withdraw/:tokenId" component={Withdraw} />
          <ProtectedRoute path="/document" component={Document} />
          <ProtectedRoute path="/settings" component={Settings} />
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
          <Route path="/change-bank">
            <ChangeBank />
          </Route>
        </Layout>
      </Switch>
    </>
  );
}
