import React from "react";
import { Link } from "react-router-dom";

export default function login() {
  return (
    <>
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          <form>
            <span>Нэвтрэх</span>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email Хаяг"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Нууц Үг"
                required
              />
            </div>
            <div className="text-right">
              <Link to="/reset">Нууц үгээ мартсан?</Link>
            </div>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="form-checkbox"
              />
              <label className="custom-control-label" htmlFor="form-checkbox">
                Намайг сана
              </label>
            </div>
            <Link to="/markets">
              <button type="submit" className="btn btn-primary">
                Нэвтрэх
              </button>
            </Link>
          </form>
          <h2>
            Шинэ хэрэглэгч? <Link to="/signup">Бүртгүүлэх</Link>
          </h2>
        </div>
      </div>
    </>
  );
}
