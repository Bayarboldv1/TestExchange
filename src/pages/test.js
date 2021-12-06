import React from "react";
import { Link } from "react-router-dom";
export default function test() {
  console.log();
  return (
    <>
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          <form>
            <span className="mb-0">Хэрэглэгч Баталгаажуулалт</span>
            <p className="text-center mb-4">
              Та өөрийн мэдээллээ болон иргэний үнэмлэхний баталгаажуулалт хийж
              арилжаанд ороно уу
            </p>
            <form>
              <div className="custom-file mb-4">
                {/* <input
                  type="file"
                  className="custom-file-input"
                  id="fileUpload"
                /> */}
                <label className="custom-file-label" htmlFor="fileUpload">
                  Иргэний үнэмлэхний урд талын зураг
                </label>
              </div>
              <div className="custom-file  mb-4">
                <input
                  type="file"
                  className="custom-file-input"
                  id="fileUpload"
                />
                <label className="custom-file-label" htmlFor="fileUpload">
                  Иргэний үнэмлэхний ард талын зураг
                </label>
              </div>
              <div className="custom-file mb-4">
                <input
                  type="file"
                  className="custom-file-input"
                  id="fileUpload"
                />
                <label className="custom-file-label" htmlFor="fileUpload">
                  Иргэний үнэмлэхтэй хамт сэлфи зураг
                </label>
              </div>
            </form>
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
