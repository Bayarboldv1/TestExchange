import { message } from "antd";
import { useEffect, useState } from "react";
import { numberToFixed, numberWithCommas } from "../../components/helper/utils";
import Service from "../../service/wallet/index";
function TotalMnt() {
  const [loading, setloading] = useState(false);
  const [data, setData] = useState({ totalMNT: 0 });
  useEffect(() => {
    Service.getBalanceMNT().then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <div className="markets ">
      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-12">
            <div className="markets-pair-list">
              <div className="row">
                <div className="col-md-9 ml-5">
                  <div className=" header col-md mt-3 ml-3">
                    <div className="col mt-5">
                      <h5>Нийт үлдэгдэл</h5>
                      <h2>{data.totalMNT}MNT</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-2  mt-5">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary page-title "
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
  );
}

export default TotalMnt;
