import React, { Component } from "react";
import { getSession, getUserData, removeSession } from "../helper/utils";
import { withRouter } from "react-router-dom";
let base_url = window.location.origin;

export default function TokenCheck(ComponentToProtect) {
  class ShowTheLocation extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
      };
    }
    componentDidMount() {
      let token = getSession();
      let userData = getUserData();
      if (token && userData) {
        this.setState({
          loading: false,
        });
      } else {
        if (`${base_url}/login` !== window.location.href) {
          removeSession();
          this.props.history.push("/login");
        }
      }
    }

    render() {
      const { loading } = this.state;
      if (loading) {
        return "";
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
  return withRouter(ShowTheLocation);
}
