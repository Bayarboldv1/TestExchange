import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";

function Id() {
  return (
    <>
      <div className="settings mtb15">
        <div className="container-fluid">
          <div className="card-bank">
            <div className="card-body">
              <h5 className="card-title">Хэрэглэгч Баталгаажуулах</h5>
              <div className="settings-notification">
                <div className="notification-info">
                  <p>Хэрэглэгчийн мэдээлэл баталгаажуулах</p>
                </div>

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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Id;
