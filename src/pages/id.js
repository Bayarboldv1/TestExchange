import React, { useState } from "react";
import { Link } from "react-router-dom";

function Id() {
  return (
    <>
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          <form>
            <span className="mb-2">OTP Баталгаажуулалт</span>

            <p>E-mail-руу тань явуулсан Баталгаажуулах Кодоо Оруулна уу</p>
            <input
              maxlength="6"
              type="number"
              className="form-control mb-4"
              placeholder=""
              required
            />
            <p>Утасруу тань явуулсан Баталгаажуулах Кодоо Оруулна уу</p>
            <input
              maxlength="6"
              type="number"
              className="form-control"
              placeholder=""
              required
            />
            <Link to="/profile">
              <button type="submit" className="btn btn-primary">
                Илгээх
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Id;
