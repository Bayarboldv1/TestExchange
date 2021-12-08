import React, { useState } from "react";
import { Link } from "react-router-dom";

function Id() {
  return (
    <>
      <div className="settings mtb15">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Хэрэглэгч Баталгаажуулах</h5>
              <div className="settings-notification">
                <div className="row">
                  <div>
                    <div className="notification-info">
                      <p>Хэрэглэгчийн мэдээлэл баталгаажуулах</p>
                    </div>
                    <div className="custom-control ">
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
                  <div className="ml-5">
                    <div className="notification-info">
                      <p>Банкны мэдээлэл</p>
                    </div>
                    <div className="front">
                      {/* <input
                        className="btn btn-primary btn-sm"
                        type="submit"
                        id="banksubmit"
                        value="Өөрчлөх"
                      /> */}
                    </div>
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

export default Id;
