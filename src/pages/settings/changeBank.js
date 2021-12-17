import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, message, Table, Space } from "antd";
import BankModal from "../../components/modals/BankModal";
import Service from "../../service/user/index";
import { UserConsumer } from "../../context/UserContext";
import { assertExportDeclaration } from "@babel/types";

function ChangeBank(user) {
  const [modalShow, setModalShow] = useState(false);
  const [loading, setloading] = useState(false);

  const [bank, setbank] = useState("");

  return (
    <>
      <BankModal show={modalShow} onHide={() => setModalShow(false)} />
      <div className="container">
        <h2 className="card-title  mt-5 ml-3">Банкны мэдээлэл</h2>
        <div className="settings-notification row-2">
          <div className="notification-info ml-3">
            <p>Одоо ашиглагдаж буй данс</p>
          </div>
          <div className="row">
            <div className="custom-bank col-md-12 ml-2 ">
              <table className="table table-responsive w-100 d-block d-md-table">
                <thead>
                  <tr>
                    <th>Данс эзэмшигч</th>
                    <th>Дансны дугаар</th>
                    <th>Банк</th>
                    <th className="">Тохиргоо</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="notification-info">
                      <UserConsumer>
                        {({ user }) => {
                          console.log("user", user);
                          return (
                            <span
                              style={{ fontWeight: "bold" }}
                              className="white"
                            >
                              {user.user.userInfo.firstname}
                            </span>
                          );
                        }}
                      </UserConsumer>
                    </td>
                    <td className="notification-info">
                      <UserConsumer>
                        {({ user }) => {
                          console.log("user", user);
                          return (
                            <span
                              style={{ fontWeight: "bold" }}
                              className="white"
                            >
                              {user.user.userInfo.bankAccount}
                            </span>
                          );
                        }}
                      </UserConsumer>
                    </td>
                    <td className="notification-info">
                      <UserConsumer>
                        {({ user }) => {
                          console.log("user", user);
                          if (user.user.userInfo.bankId === 1) {
                            setbank("Хаан банк");
                          }
                          if (user.user.userInfo.bankId === 2) {
                            setbank("Худалдаа хөгжлийн банк");
                          }
                          if (user.user.userInfo.bankId === 3) {
                            setbank("Төрийн банк");
                          }
                          if (user.user.userInfo.bankId === 4) {
                            setbank("Богд банк");
                          }
                          if (user.user.userInfo.bankId === 5) {
                            setbank("Голомт банк");
                          }
                          return (
                            <span
                              style={{ fontWeight: "bold" }}
                              className="white"
                            >
                              {bank}
                            </span>
                          );
                        }}
                      </UserConsumer>
                    </td>
                    <td>
                      <button
                        onClick={() => setModalShow(true)}
                        type="submit"
                        className="btn btn-link btn-sm"
                      >
                        Өөрчлөх
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChangeBank;
