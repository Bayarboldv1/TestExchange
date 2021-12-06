import React from "react";
import { Link } from "react-router-dom";

export default function reset() {
  return (
    <>
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          <form>
            <span>Нууц Үг Сэргээх</span>
            <input
              type="email"
              className="form-control"
              placeholder="Email хаягаа оруулна уу"
            />
            <button type="submit" className="btn btn-primary">
              Сэргээх
            </button>
            <h2>
              Нууц үгээ санасан?
              <Link to="/login"> Нэвтрэх</Link>
            </h2>
          </form>
        </div>
      </div>
    </>
  );
}
