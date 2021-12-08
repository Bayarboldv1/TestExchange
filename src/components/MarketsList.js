import React, { useState } from "react";
import { Tabs, Tab, Alert } from "react-bootstrap";
import Modal from "./Modal";
import OutModal from "./OutModal";

export default function MarketsList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [outModalOpen, setOutModalOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <>
      <div className="markets pb70">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="markets-pair-list">
                <div className="col-md mt-3 ml-5 justify-content-center  ">
                  <h5>Нийт үлдэгдэл</h5>
                  <h2>1000,000 MNT</h2>
                </div>
                <div className="table-responsive ">
                  <table className=" table star-active w-75 ml-5 ">
                    <thead className="">
                      <tr>
                        <th>Валют</th>
                        <th>Нэр</th>
                        <th>Нийт</th>
                        <th>Битүүмжлэгдсэн</th>
                        <th>Гүйлгээ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr data-href="exchange-light.html">
                        <td>
                          <img src={"img/icon/1.png"} alt="eth" /> ETH
                        </td>
                        <td>
                          <i className="icon ion-md-star"></i> ETH
                        </td>
                        <td>7394.06</td>
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
                              setOutModalOpen(true);
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
                          {modalOpen && (
                            <Modal const setOpenModal={setModalOpen} />
                          )}
                          {outModalOpen && (
                            <OutModal const setOpenOutModal={setOutModalOpen} />
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              setOutModalOpen(true);
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
                          <img src={"img/icon/3.png"} alt="bitcoin" /> LTC
                        </td>
                        <td>
                          <i className="icon ion-md-star"></i> LTC
                        </td>

                        <td>4582.06</td>
                        <td className="green">+2.62%</td>
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
                              setOutModalOpen(true);
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
                          <img src={"img/icon/4.png"} alt="bitcoin" /> KCS
                        </td>
                        <td>
                          <i className="icon ion-md-star"></i> KCS
                        </td>

                        <td>7394.06</td>
                        <td className="red">-0.94%</td>
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
                              setOutModalOpen(true);
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
                          <img src={"img/icon/5.png"} alt="bitcoin" /> COTI
                        </td>
                        <td>
                          <i className="icon ion-md-star"></i> COTI
                        </td>
                        <td>7394.06</td>
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
                              setOutModalOpen(true);
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
                          <img src={"img/icon/6.png"} alt="bitcoin" /> TRX
                        </td>
                        <td>
                          <i className="icon ion-md-star"></i> TRX
                        </td>
                        <td>7394.06</td>
                        <td className="green">+0.71%</td>
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
                              setOutModalOpen(true);
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
                          <img src={"img/icon/7.png"} alt="bitcoin" /> XMR
                        </td>
                        <td>
                          <i className="icon ion-md-star"></i> XMR
                        </td>
                        <td>7394.06</td>
                        <td className="red">-0.73%</td>
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
                              setOutModalOpen(true);
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
                          <img src={"img/icon/8.png"} alt="bitcoin" /> ADA
                        </td>
                        <td>
                          <i className="icon ion-md-star"></i> ADA
                        </td>
                        <td>7394.06</td>
                        <td className="red">-1.20%</td>
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
                              setOutModalOpen(true);
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
                          <img src={"img/icon/9.png"} alt="bitcoin" /> BNB
                        </td>
                        <td>
                          <i className="icon ion-md-star"></i> BNB
                        </td>
                        <td>7394.06</td>
                        <td className="green">+0.74%</td>
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
                              setOutModalOpen(true);
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
                          <img src={"img/icon/10.png"} alt="bitcoin" /> NEO
                        </td>
                        <td>
                          <i className="icon ion-md-star"></i> NEO
                        </td>
                        <td>7394.06</td>
                        <td className="red">-0.78%</td>
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
                              setOutModalOpen(true);
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
