import React from "react";
import { Link } from "react-router-dom";
export default function otpVerify() {
  return (
    <>
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          <form>
            <span className="mb-0">OTP Баталгаажуулалт</span>
            <p className="text-center mb-4">
              Таны Email-руу болон Утасруу нэг удаагийн баталгаажуулах код
              илгээсэн
            </p>
            <input
              type="number"
              className="form-control mb-4"
              placeholder="E-mail-руу тань явуулсан Баталгаажуулах Кодоо Оруулна уу"
              required
            />
            <input
              type="number"
              className="form-control"
              placeholder="Утасруу тань явуулсан Баталгаажуулах Кодоо Оруулна уу"
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
