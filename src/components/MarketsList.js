import { isTemplateElement } from "@babel/types";
import React, { useState } from "react";
import { Tabs, Tab, Alert } from "react-bootstrap";
import TotalMnt from "../pages/wallet/TotalMnt";
import InModal from "./modals/Modal";
import OutModal from "./modals/OutModal";

export default function MarketsList() {
  const [modalShow, setModalShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="markets ">
        <OutModal show={modalShow} onHide={() => setModalShow(false)} />
        <InModal show={modalOpen} onHide={() => setModalOpen(false)} />
        <div className="container-fluid">
          <div className="row ">
            <div className="col-md-12">
              <div className="markets-pair-list">
                <div className="row">
                  <div className="col-md-9 ml-5">
                    <TotalMnt />
                  </div>

                  <div className="col-md-2 mt-5">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary page-title"
                    >
                      <img
                        src="/img/time.svg"
                        alt="time"
                        className="retex--wallet--time"
                      />
                      Гүйлгээний түүх
                    </button>
                  </div>
                </div>
                <div className="lists table-responsive ">
                  <table className="table-responsive star-active w-75">
                    <thead>
                      <tr>
                        <th>Валют</th>
                        <th>Нэр</th>
                        <th>Нийт</th>
                        <th>Захиалга</th>
                        <th>Битүүмжлэгдсэн</th>
                        <th>Гүйлгээ</th>
                        <th className="btn btn-sm btn-link ">
                          0 Үлдэгдэл
                          <i className=" icon ion-md-eye ml-2" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr data-href="exchange-light.html">
                        <td>
                          <img src={"img/icon/1.png"} alt="eth" /> ETH
                        </td>
                        <td>
                          <i
                            value="eth"
                            id="eth"
                            className="icon ion-md-star"
                          ></i>
                          ETH
                        </td>
                        <td>7394.06</td>
                        <td>321</td>

                        <td className="green">+0.78%</td>
                        <td>
                          <button
                            onClick={() => {
                              setModalOpen(true);
                            }}
                            type="button"
                            class="btn btn-sm btn-link "
                          >
                            Орлого
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              setModalShow(true);
                            }}
                            type="button"
                            class="btn btn-sm btn-link "
                          >
                            Зарлага
                          </button>
                        </td>
                      </tr>
                      <tr data-href="exchange-light.html">
                        <td>
                          <img src={"img/icon/2.png"} alt="vid" /> EOS
                        </td>
                        <td>
                          <i className="icon ion-md-star"></i> EOS
                        </td>
                        <td>6984.06</td>
                        <td>213</td>
                        <td className="red">-1.65%</td>
                        <td>
                          <button
                            onClick={() => {
                              setModalOpen(true);
                            }}
                            type="button"
                            class="btn btn-sm btn-link "
                          >
                            Орлого
                          </button>
                        </td>
                        {/* sasasa */}
                        <td>
                          <button
                            onClick={() => {
                              setModalShow(true);
                            }}
                            type="button"
                            class="btn btn-sm btn-link "
                          >
                            Зарлага
                          </button>
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
    </>
  );
}
