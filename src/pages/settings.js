import React, { useState } from "react";
import { Tab, Row, Col, Nav, Button as BsButton } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import EmailModal from "../components/modals/emailModal";
import NumberlModal from "../components/modals/numberModal";
import { UserConsumer } from "../context/UserContext";
import { ThemeConsumer } from "../context/ThemeContext";

export default function Settings() {
  const [modalShow, setModalShow] = useState(false);
  const [numberModal, setNumberModal] = useState(false);
  const history = useHistory();

  return (
    <div className="d-flex justify-content-center mt-5 wfl">
      <EmailModal show={modalShow} onHide={() => setModalShow(false)} />
      <NumberlModal show={numberModal} onHide={() => setNumberModal(false)} />

      <div className="container d-flex  w-100 justify-content-center ">
        <div className="mt-5 settings-list">
          <ThemeConsumer>
            {({ data }) => {
              return (
                <h3
                  className="card-title"
                  style={{ color: data.theme === "dark" ? "black" : "white" }}
                >
                  Тохиргоо
                </h3>
              );
            }}
          </ThemeConsumer>

          <div className="settings-notification">
            <ul>
              <li>
                <div className="notification-info">
                  <p>Хэрэглэгчийн мэдээлэл баталгаажуулах</p>
                  <span>
                    Хэрэглэгчийн мэдээлэл баталгаажсанаар зарлага, арилжаа хийх
                    эрх нээгдэнэ
                  </span>
                </div>
                <div className="custom-control ">
                  <UserConsumer>
                    {({ user }) => {
                      return user.user.statusId === 7 ? (
                        <div
                          style={{
                            justifyContent: "right",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <i
                            className="ion-md-checkmark-circle-outline"
                            style={{
                              fontSize: "30px",
                              color: "#0ba808",
                              display: "flex",
                            }}
                          ></i>
                          <button
                            disabled
                            type="submit"
                            className="btn btn-link btn-sm"
                            style={{ color: "#0ba808" }}
                          >
                            Баталгаажсан
                          </button>
                        </div>
                      ) : (
                        <div
                          style={{
                            justifyContent: "right",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <i
                            className="ion-md-information-circle"
                            style={{
                              fontSize: "30px",
                              color: "#d42d13",
                              display: "flex",
                            }}
                          ></i>
                          <button
                            onClick={() => {
                              history.push("/document");
                            }}
                            type="submit"
                            className="btn btn-link btn-sm"
                          >
                            Баталгаажуулах
                          </button>
                        </div>
                      );
                    }}
                  </UserConsumer>
                </div>
              </li>
              <li>
                <div className="notification-info">
                  <p>Банкны мэдээлэл</p>
                  <span>Одоо ашиглагдаж буй данс : </span>
                  <UserConsumer>
                    {({ user }) => {
                      return (
                        <span style={{ fontWeight: "bold" }} className="white">
                          {user.user.userInfo.bankAccount}
                        </span>
                      );
                    }}
                  </UserConsumer>
                </div>
                <div className="custom-control">
                  <Link to="/change-bank">
                    <button type="submit" className="btn btn-primary btn-sm">
                      Өөрчлөх
                    </button>
                  </Link>
                </div>
              </li>
              <li>
                <div className="notification-info">
                  <p>Имэйл </p>
                  <span>Одоо ашиглагдаж буй: </span>
                  <UserConsumer>
                    {({ user }) => {
                      return (
                        <span style={{ fontWeight: "bold" }} className="white">
                          {user.user.userInfo.email}
                        </span>
                      );
                    }}
                  </UserConsumer>
                </div>
                <div className="custom-control custom-switch">
                  <div className=" custom-control">
                    <button
                      onClick={() => setModalShow(true)}
                      type="submit"
                      className="btn btn-primary btn-sm"
                    >
                      Өөрчлөх
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <div className="notification-info">
                  <p>Утасны дугаар</p>
                  <span>Одоо ашиглагдаж буй: </span>
                  <UserConsumer>
                    {({ user }) => {
                      return (
                        <span style={{ fontWeight: "bold" }} className="white">
                          {user.user.userInfo.phone}
                        </span>
                      );
                    }}
                  </UserConsumer>
                </div>
                <div className="custom-control custom-switch">
                  <div className="custom-control">
                    <button
                      onClick={() => setNumberModal(true)}
                      type="submit"
                      className="btn btn-primary btn-sm"
                    >
                      Өөрчлөх
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <div className="notification-info">
                  <p>2FA (2 алхамт баталгаажуулалт)</p>
                  <span>
                    Илүү найдвартай хамгаалалт. Google authenticator ашиглана.
                  </span>
                </div>
                <div className="custom-control custom-switch">
                  <button disabled className="btn btn-link btn-sm">
                    Тун удахгүй...
                  </button>
                </div>
              </li>
              <li>
                <div className="notification-info">
                  <p>Нэг удаагийн нууц үгээр баталгаажуулалт</p>
                  <span>
                    Утас, Имэйлрүү OTP(нэг удаагийн нууц үг) авч баталгаажуулах{" "}
                  </span>
                </div>
                <div className="custom-control custom-switch">
                  <button disabled className="btn btn-link btn-sm">
                    Тун удахгүй...
                  </button>
                </div>
              </li>
              <li>
                <div className="notification-info">
                  <p>Хэл сонгох</p>
                </div>
                <div className="custom-control">
                  <button disabled className="btn btn-link btn-sm">
                    Тун удахгүй...
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
