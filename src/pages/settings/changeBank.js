import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Tab, Row, Col, Nav } from "react-bootstrap";
import BankModal from "../../components/modals/BankModal";

function ChangeBank() {
  const [modalShow, setModalShow] = useState(false);
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
                    <td>Bayarbold</td>
                    <td>5381137671</td>
                    <td className="">KhanBank</td>
                    <td>
                      <div className="custom-bank-button ">
                        <button
                          onClick={() => setModalShow(true)}
                          type="submit"
                          className="bi bi-upload btn btn-primary btn-sm"
                        >
                          Өөрчлөх
                        </button>
                      </div>
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
