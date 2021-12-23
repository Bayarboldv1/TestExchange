import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Badge } from "antd";
import {
  ExclamationCircleOutlined,
  FileExclamationOutlined,
  ExclamationOutlined,
} from "@ant-design/icons";
import { ThemeConsumer } from "../context/ThemeContext/ThemeContext";
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
    return (
      <>
        <UserConsumer>
          {({ user }) => {
            return (
              <header className="light-bb" style={{ height: "50px" }}>
                <Navbar expand="lg" style={{ height: "100%" }}>
                  <Link className="navbar-brand" to="/">
                    <ThemeConsumer>
                      {({ data }) => {
                        return data.theme === "light" ? (
                          <img
                            src={"logo/3.png"}
                            alt="logo"
                            style={{ height: "30px" }}
                          />
                        ) : (
                          <img
                            src={"logo/2.png"}
                            className="sm"
                            alt="logo"
                            style={{ height: "30px" }}
                          />
                        );
                      }}
                    </ThemeConsumer>
                  </Link>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbar-nav mr-auto">
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Арилжаа"
                        menuVariant="dark"
                      >
                        <NavDropdown.Item>
                          <Link to={"exchange"}>Лимит</Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Хэтэвч"
                        menuVariant="dark"
                      >
                        <NavDropdown.Item>
                          <Link to={"/wallet"}>Ерөнхий</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <Link to={"/deposit"}>Орлого</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link to={"/withdraw"}>Зарлага</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link to={"/history"}>Түүх</Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Захиалга"
                        menuVariant="dark"
                      >
                        <NavDropdown.Item>
                          <Link to={"wallet"}>Лимит</Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                    <Nav className="navbar-nav ml-auto">
                      <Dropdown className="header-custom-icon">
                        <ThemeConsumer>
                          {({ data, dispatch, changeTheme }) => (
                            <Button
                              variant="default"
                              onClick={() =>
                                changeTheme(
                                  data.theme === "dark" ? "light" : "dark"
                                )
                              }
                              id="darkTheme"
                            >
                              {data.theme === "dark" ? (
                                <i className="icon ion-md-sunny"></i>
                              ) : (
                                <i className="icon ion-md-moon"></i>
                              )}
                            </Button>
                          )}
                        </ThemeConsumer>
                        {user.auth && (
                          <Dropdown.Toggle variant="default">
                            <i className="icon ion-md-notifications"></i>
                            <span className="circle-pulse"></span>
                          </Dropdown.Toggle>
                        )}
                        <Dropdown.Menu></Dropdown.Menu>
                      </Dropdown>
                      {!user.auth && (
                        <Button
                          variant="secondary"
                          style={{ marginRight: 10 }}
                          onClick={() => {
                            history.push("/signup");
                          }}
                        >
                          Бүртгүүлэх
                        </Button>
                      )}
                      {!user.auth && (
                        <Button
                          variant="outline-secondary"
                          onClick={() => {
                            history.push("/login");
                          }}
                        >
                          Нэвтрэх
                        </Button>
                      )}
                      {user.auth && (
                        <Dropdown className="header-img-icon">
                          <Dropdown.Toggle variant="default">
                            <UserConsumer>
                              {({ user }) => {
                                return user.user.statusId === 7 ? (
                                  <Badge>
                                    <img src={"img/avatar.svg"} alt="avatar" />
                                  </Badge>
                                ) : user.user.statusId === 3 ? (
                                  <Badge size="small" count={"!"}>
                                    <img src={"img/avatar.svg"} alt="avatar" />
                                  </Badge>
                                ) : user.user.statusId === 6 ? (
                                  <Badge size="small" count={"!"}>
                                    <img src={"img/avatar.svg"} alt="avatar" />
                                  </Badge>
                                ) : user.user.statusId === 5 ? (
                                  <Badge
                                    size="small"
                                    count={
                                      <img src="svg/idVerify/badgeLooking.svg" />
                                    }
                                  >
                                    <img src={"img/avatar.svg"} alt="avatar" />
                                  </Badge>
                                ) : (
                                  <Badge size="small" count={"!"}>
                                    <img src={"img/avatar.svg"} alt="avatar" />
                                  </Badge>
                                );
                              }}
                            </UserConsumer>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <div className="dropdown-header d-flex flex-column align-items-center">
                              <UserConsumer>
                                {({ user }) => {
                                  return (
                                    <div className="info text-center">
                                      <p className="name font-weight-bold mb-0">
                                        {user.user.userInfo.lastname.substr(
                                          0,
                                          1
                                        ) +
                                          ". " +
                                          user.user.userInfo.firstname}
                                      </p>
                                      <p className="email text-muted mb-2">
                                        {user.user.userInfo.email}
                                      </p>
                                    </div>
                                  );
                                }}
                              </UserConsumer>
                              <UserConsumer>
                                {({ user }) => {
                                  return user.user.statusId === 7 ? (
                                    <span className="text-success">
                                      Баталгаажсан
                                    </span>
                                  ) : user.user.statusId === 3 ? (
                                    <span className="text-danger">
                                      Баталгаажаагүй
                                    </span>
                                  ) : user.user.statusId === 6 ? (
                                    <span className="text-danger">
                                      Баталгаажаагүй
                                    </span>
                                  ) : user.user.statusId === 5 ? (
                                    <span className="text-warning">
                                      Шалгагдаж буй
                                    </span>
                                  ) : (
                                    <></>
                                  );
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
                                  <UserConsumer>
                                    {({ user }) => {
                                      return user.user.statusId === 7 ? (
                                        <Link
                                          to="/settings"
                                          className="nav-link"
                                        >
                                          <i className="icon ion-md-settings"></i>
                                          <span>Тохиргоо</span>
                                        </Link>
                                      ) : user.user.statusId === 3 ? (
                                        <Badge size="small" count={"!"}>
                                          <Link
                                            to="/settings"
                                            className="nav-link"
                                          >
                                            <i className="icon ion-md-settings"></i>
                                            <span>Тохиргоо</span>
                                          </Link>
                                        </Badge>
                                      ) : user.user.statusId === 6 ? (
                                        <Badge size="small" count={"!"}>
                                          <Link
                                            to="/settings"
                                            className="nav-link"
                                          >
                                            <i className="icon ion-md-settings"></i>
                                            <span>Тохиргоо</span>
                                          </Link>
                                        </Badge>
                                      ) : user.user.statusId === 5 ? (
                                        <Badge
                                          size="small"
                                          count={
                                            <img src="svg/idVerify/badgeLooking.svg" />
                                          }
                                        >
                                          <Link
                                            to="/settings"
                                            className="nav-link"
                                          >
                                            <i className="icon ion-md-settings"></i>
                                            <span>Тохиргоо</span>
                                          </Link>
                                        </Badge>
                                      ) : (
                                        <Badge size="small" count={"!"}>
                                          <Link
                                            to="/settings"
                                            className="nav-link"
                                          >
                                            <i className="icon ion-md-settings"></i>
                                            <span>Тохиргоо</span>
                                          </Link>
                                        </Badge>
                                      );
                                    }}
                                  </UserConsumer>
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
                      )}
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
