import React from "react";
import { Link } from "react-router-dom";

export default function signup() {
  return (
    <>
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          <div className="settings-profile">
            <form>
              <span>Бүртгүүлэх</span>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Овог"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Нэр"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Регистэр"
                  required
                />
              </div>
              <div className="form-group">
                <select id="selectBank" className="custom-select">
                  <option defaultValue>Банкаа Сонгоно уу</option>
                  <option value="Khan">Хаан Банк</option>
                  <option value="Xac">Хас Банк</option>
                  <option value="TDB">Худалдаа Хөгжилийн Банк</option>
                  <option value="Golomt">Голомт Банк</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Дансны Дугаар"
                  required
                />
              </div>
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
                  type="number"
                  className="form-control"
                  placeholder="Утас"
                  required
                />
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="form-checkbox"
                  required
                />
                <label className="custom-control-label" htmlFor="form-checkbox">
                  Үйлчилгээний нөхцөл зөвшөөрөх{" "}
                  <Link to="/terms-and-conditions">Нөхцөл</Link>
                </label>
              </div>
              <Link to="/otp-verify">
                <button type="submit" className="btn btn-primary">
                  Бүртгүүлэх
                </button>{" "}
              </Link>
            </form>
            <h2>
              Хаяг байгаа бол?
              <Link to="/login"> Нэвтрэх</Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
