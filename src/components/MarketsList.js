import { isTemplateElement } from "@babel/types";
import React, { useState } from "react";
import TotalMnt from "../pages/wallet/TotalMnt";

export default function MarketsList() {
  const [select, setSelect] = useState(false);
  const [data, setData] = useState(null);
  return (
    <>
      <div className="markets ">
        <div className="container-fluid">
          <div className="row ">
            <div className="col-md-12">
              <div className="markets-pair-list">
                <div className="row">
                  <div className="col-md-9 ml-5">
                    <TotalMnt data={data} />
                  </div>

                  <div className="col-md-2 mt-5">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary page-title"
                    >
                      <img
                        src="/img/time.svg"
                        alt="time"
                        className="retex--wallet--time"
                      />
                      Гүйлгээний түүх
                    </button>
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
