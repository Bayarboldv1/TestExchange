import React, { useState } from "react";
import { Link } from "react-router-dom";

function ChangeBank() {
  return (
    <>
      <div className="settings mtb15">
        <div className="container-fluid">
          <div className="card-bank">
            <div className="card-body">
              <h5 className="card-title">Банкны мэдээлэл</h5>
              <div className="settings-notification">
                <div className="notification-info ml-3">
                  <p>Одоо ашиглагдаж буй данс</p>
                </div>
                <div className="row">
                  <div className="custom-bank col-12 ml-3">
                    <table className="table">
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
                          <td>Bayarbold</td>
                          <td>5381137671</td>
                          <td className="">KhanBank</td>
                          <td>
                            <div className="custom-bank-button ">
                              <Link to="/id">
                                <button
                                  type="submit"
                                  className="bi bi-upload btn btn-primary btn-sm"
                                >
                                  Өөрчлөх
                                </button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangeBank;
