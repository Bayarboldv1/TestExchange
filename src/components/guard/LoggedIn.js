import React, { Component } from "react";
import { getSession, getUserData } from "../helper/utils";
import Loader from "../../components/MainLoader";
import { withRouter } from "react-router-dom";

export default function LoggedIn(ComponentToProtect) {
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
        this.props.history.push("/");
      } else {
        this.setState({
          loading: false,
        });
      }
    }

    render() {
      const { loading } = this.state;
      if (loading) {
        return <Loader />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
  return withRouter(ShowTheLocation);
}
