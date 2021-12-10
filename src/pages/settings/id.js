import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import ImageUpload from "../../components/ImageUpload";

function Id() {
  return (
    <>
      {/* <div className="settings mtb15">
        <div className="container-fluid">
          <Tab.Container defaultActiveKey="settings">
            <Row>
              <Col lg={9}>
                <Tab.Content>
                  <Tab.Pane
                    eventKey="settings"
                    className="d-flex justify-content-center"
                  >
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          Хэрэглэгчийн мэдээлэл баталгаажуулах
                        </h5>
                        <div className="settings-notification">
                          <ul>
                            <li>
                              <div className="notification-info">
                                <div className="row">
                                  <div className="custom-file col">
                                    <p>Иргэний үнэмлэхийн урд талын зураг</p>

                                    <div className="fgo">
                                      <ImageUpload />
                                    </div>
                                  </div>
                                  <div className="custom-file col ml-5">
                                    <p>Иргэний үнэмлэхийн ард талын зураг</p>
                                    <ImageUpload />
                                  </div>
                                </div>
                                <div className="custom-control mt-5 ">
                                  <Link to="/id">
                                    <button
                                      type="submit"
                                      className="bi bi-upload btn btn-primary btn-sm"
                                    >
                                      Баталгаажуулах
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div> */}

      <div className="container">
        <div className="header mt-5">
          <h2> Хэрэглэгчийн мэдээлэл баталгаажуулах</h2>
        </div>
        <div className="body row">
          <div className="col">
            <div className="card">
              <p>Иргэний үнэмлэхийн урд талын зураг</p>
              <div className="card">
                <ImageUpload />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <p>Иргэний үнэмлэхийн ард талын зураг</p>
              <div className="card">
                <ImageUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Id;
