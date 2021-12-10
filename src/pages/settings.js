import React, { useState } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Modal, Button } from "antd";
import EmailModal from "../components/modals/emailModal";
import NumberlModal from "../components/modals/numberModal";
export default function Settings() {
  const [modalShow, setModalShow] = useState(false);
  const [numberModal, setNumberModal] = useState(false);
  return (
    <div className="d-flex justify-content-center mt-5 wfl">
      <EmailModal show={modalShow} onHide={() => setModalShow(false)} />
      <NumberlModal show={numberModal} onHide={() => setNumberModal(false)} />

      <div className="container d-flex  w-100 justify-content-center ">
        <div className="mt-5 settings-list">
          <h2 className="card-title">Тохиргоо</h2>

          <div className="settings-notification">
            <ul>
              <li>
                <div className="notification-info">
                  <p>Хэрэглэгчийн мэдээлэл баталгаажуулах</p>
                  <span>
                    Хэрэглэгчийн мэдээлэл баталгаажсанаар арилжаа хийх эрх
                    нээгдэнэ
                  </span>
                </div>
                <div className="custom-control ">
                  <Link to="/id">
                    <button type="submit" className="btn btn-primary btn-sm">
                      Баталгаажуулах
                    </button>
                  </Link>
                </div>
              </li>
              <li>
                <div className="notification-info">
                  <p>2 алхамт баталгаажуулалт</p>
                  <span>
                    Орлого, зарлага хийхдээ аль сувгаар гүйлгээ баталгаажуулахыг
                    сонгох
                  </span>
                </div>
                <div className="btn btn-primary btn-sm">
                  <p>Баталгаажуулах</p>
                </div>
              </li>
              <li>
                <div className="notification-info">
                  <p>Банкны мэдээлэл</p>
                  <span>Одоо ашиглагдаж буй данс : </span>
                  <span className="white">5381137671</span>
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
                  <span>Зарлага баталгаажуулахад ашиглах</span>
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
                  <span>Одоо ашиглагдаж буй данс : </span>
                  <span className="white">5381137671</span>
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
                  <p>Google Authenticator</p>
                  <span>Зарлагын баталгаажуулалтад ашиглах </span>
                </div>
                <div className="custom-control custom-switch">
                  <button type="submit" className="btn btn-primary btn-sm">
                    Баталгаажуулах
                  </button>
                </div>
              </li>
              <li>
                <div className="notification-info">
                  <p>Хэл сонгох</p>
                </div>
                <div className="custom-control">
                  <button type="disabled" className="btn btn-primary btn-sm">
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
