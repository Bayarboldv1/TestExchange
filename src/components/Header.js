import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ThemeConsumer } from "../context/ThemeContext";
import { UserConsumer, UserProvider } from "../context/UserContext";
class Header extends Component {
  componentDidMount() {
    let el = document.querySelector("#darkTheme");
    if (el) {
      el.addEventListener("click", function () {
        document.body.classList.toggle("dark");
      });
    }
  }

  render() {
    const { history } = this.props;
    console.log("sdd --- " + window.location.pathname);
    return (
      <>
        <UserConsumer>
          {({ user }) => {
            return user.auth ? (
              <header className="light-bb">
                <Navbar expand="lg">
                  <Link className="navbar-brand" to="/">
                    <ThemeConsumer>
                      {({ data }) => {
                        return data.theme === "light" ? (
                          <img src={"img/logo-light.svg"} alt="logo" />
                        ) : (
                          <img src={"img/logo-dark.svg"} alt="logo" />
                        );
                      }}
                    </ThemeConsumer>
                  </Link>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbar-nav mr-auto">
                      <Link
                        to="/"
                        className={
                          "nav-link " +
                          (window.location.pathname === "/"
                            ? "selected-nav-link"
                            : "")
                        }
                      >
                        Арилжаа
                      </Link>
                      <Link
                        to="/wallet"
                        className={
                          "nav-link " +
                          (window.location.pathname === "/wallet"
                            ? "selected-nav-link"
                            : "")
                        }
                      >
                        Хэтэвч
                      </Link>
                    </Nav>
                    <Nav className="navbar-nav ml-auto">
                      <Dropdown className="header-custom-icon">
                        <ThemeConsumer>
                          {({ data, dispatch }) => (
                            <Button
                              variant="default"
                              onClick={() =>
                                dispatch(
                                  data.theme === "dark" ? "light" : "dark"
                                )
                              }
                              id="darkTheme"
                            >
                              {data.theme === "dark" ? (
                                <i className="icon ion-md-moon"></i>
                              ) : (
                                <i className="icon ion-md-sunny"></i>
                              )}
                            </Button>
                          )}
                        </ThemeConsumer>
                        <Dropdown.Toggle variant="default">
                          <i className="icon ion-md-notifications"></i>
                          <span className="circle-pulse"></span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu></Dropdown.Menu>
                      </Dropdown>
                      <Dropdown className="header-img-icon">
                        <Dropdown.Toggle variant="default">
                          <img src={"img/avatar.svg"} alt="avatar" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <div className="dropdown-header d-flex flex-column align-items-center">
                            <UserConsumer>
                              {({ user }) => {
                                return (
                                  <div className="info text-center">
                                    <p className="name font-weight-bold mb-0">
                                      {user.user.userInfo.lastname.substr(0, 1) + ". " + user.user.userInfo.firstname}
                                    </p>
                                    <p className="email text-muted mb-3">
                                      {user.user.userInfo.email}
                                    </p>
                                  </div>
                                )
                              }}
                            </UserConsumer>
                          </div>
                          <div className="dropdown-body">
                            <ul className="profile-nav">
                              <li className="nav-item">
                                <Link className="nav-link">
                                  <i className="icon ion-md-archive"></i>
                                  <span>Мэдэгдэл</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link to="/wallet" className="nav-link">
                                  <i className="icon ion-md-wallet"></i>
                                  <span>Хэтэвч</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link to="/settings" className="nav-link">
                                  <i className="icon ion-md-settings"></i>
                                  <span>Тохиргоо</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link to="/login" className="nav-link red">
                                  <i className="icon ion-md-power"></i>
                                  <span>Гарах</span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </header>
            ) : (
              <header className="light-bb">
                <Navbar expand="lg">
                  <Link className="navbar-brand" to="/">
                    <ThemeConsumer>
                      {({ data }) => {
                        return data.theme === "light" ? (
                          <img src={"img/logo-light.svg"} alt="logo" />
                        ) : (
                          <img src={"img/logo-dark.svg"} alt="logo" />
                        );
                      }}
                    </ThemeConsumer>
                  </Link>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbar-nav mr-auto">
                      <Link to="/" className={
                        "nav-link " +
                        (window.location.pathname === "/"
                          ? "selected-nav-link"
                          : "")
                      }>
                        Арилжаа
                      </Link>
                      <Link to="/wallet" className={
                        "nav-link " +
                        (window.location.pathname === "/wallet"
                          ? "selected-nav-link"
                          : "")
                      }>
                        Хэтэвч
                      </Link>
                    </Nav>
                    <Nav className="navbar-nav ml-auto">
                      <Dropdown className="header-custom-icon">
                        <ThemeConsumer>
                          {({ data, dispatch }) => (
                            <Button
                              variant="default"
                              onClick={() =>
                                dispatch(
                                  data.theme === "dark" ? "light" : "dark"
                                )
                              }
                              id="darkTheme"
                            >
                              {data.theme === "dark" ? (
                                <i className="icon ion-md-moon"></i>
                              ) : (
                                <i className="icon ion-md-sunny"></i>
                              )}
                            </Button>
                          )}
                        </ThemeConsumer>
                      </Dropdown>
                      <Button
                        variant="secondary"
                        style={{ marginRight: 10 }}
                        onClick={() => {
                          history.push("/signup");
                        }}
                      >
                        Бүртгүүлэх
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          history.push("/login");
                        }}
                      >
                        Нэвтрэх
                      </Button>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </header>
            );
          }}
        </UserConsumer>
      </>
    );
  }
}

export default Header;
