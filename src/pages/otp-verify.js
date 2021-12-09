import React, { useState } from "react";
import { Link } from "react-router-dom";

function OtpVerify() {
  const inputHandler = (e) => {
    const { value, maxLength } = e.target;
    if (String(value).length >= maxLength) {
      e.preventDefault();
      return;
    }
  };
  return (
    <>
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          <form>
            <span className="mb-2">OTP Баталгаажуулалт</span>
            {/* <p className="text-center mb-4">
              Таны Email-руу болон Утасруу нэг удаагийн баталгаажуулах код
              илгээсэн
            </p> */}
            <p>E-mail-руу тань явуулсан Баталгаажуулах Кодоо Оруулна уу</p>
            <input
              maxlength="6"
              type="number"
              className="form-control mb-4"
              placeholder=""
              onKeyPress={inputHandler}
              required
            />
            <p>Утасруу тань явуулсан Баталгаажуулах Кодоо Оруулна уу</p>
            <input
              maxlength="6"
              type="number"
              className="form-control"
              placeholder=""
              required
              onKeyPress={inputHandler}
            />
            <Link to="/markets">
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

export default OtpVerify;
