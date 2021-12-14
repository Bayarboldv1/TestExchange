// import React from "react";
// import { Modal, Button } from "react-bootstrap";
// export default function InModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">Орлого</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h5> Орлого хийх крипто данс:</h5>
//         <div className="form-group row">
//           <input
//             type="text"
//             disabled
//             readonly
//             className="form-control ml-3 col-md-7"
//             value="0x6B68c78E766d44B1E304c74941c3B2FA97ac29a5"
//             required
//           />
//           <button className="col-md-2 btn btn-primary ml-2">Хуулах</button>
//         </div>
//         <div className="row">
//           <div className="col-md-5">
//             <div className="col-md-6">
//               <p>QR Code</p>
//               <img
//                 className="img-fluid w-100"
//                 src={"img/qr-code-dark.svg"}
//                 alt="qr-code"
//               />
//             </div>
//           </div>
//           <div className="col-md-5">
//             <div className=" mr-5">
//               <h5>Санамж</h5>
//               <li>
//                 Энэхүү крипто данс руу {} -с өөр койн илгээж болохгүйг анхаарна
//                 уу!
//               </li>
//               <li>
//                 Энэхүү крипто данс руу шилжүүлэг хийх нь сүлжээний
//                 баталгаажуулалт шаардана
//               </li>
//               <li>
//                 Хамгийн бага орлогын хэмжээ: 0.01 {}. Үүнээс бага орлого
//                 шилжүүлсэн тохиодолд орохгүй бөгөөд буцаах боломжгүй.
//               </li>
//             </div>
//           </div>
//         </div>
//         <p className="mt-5">Шимтгэл</p>
//         <p>1400{}</p>
//         <h6>Таны шилжүүлэг хийх боломжит хэмжээ: ₮20,000,000</h6>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Баталсан</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

import React, { useState, useEffect } from "react";
// import { Modal, Button } from "react-bootstrap";
import { Modal, message } from "antd";
import Service from "../../service/deposit/index";

const Title = () => {
  return <span style={{ fontWeight: "bold" }}>Крипто цэнэглэлт</span>;
};
function InModal({ hide, show, data }) {
  const [address, setaddress] = useState(null);

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = () => {
    try {
      Service.getDepositTokenAddress(data.id)
        .then((res) => {
          if (res) {
            if (res) {
              setaddress(res.data.address);
            }
          }
        })
        .catch((e) => {
          return message.error("Хаяг татаж чадсангүй");
        });
    } catch (e) {
      return message.error("Хаяг татаж чадсангүй");
    }
  };

  const copyToClipBoard = (...str) => {
    try {
      const el = document.createElement("textarea");
      el.value = str;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.textTransform = "unset";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      message.success("Амжилттай хуулагдлаа");
    } catch (e) {
      return;
    }
  };

  return (
    <Modal
      title={<Title />}
      visible={show}
      footer={null}
      onCancel={() => hide()}
    >
      <div className="w-100">
        {address !== null && (
          <>
            <label>
              <b>{data.name} хаяг</b>
            </label>
            <div className="d-flex align-items-center">
              {address}
              <i
                className="ri-file-copy-line pointer ml-2"
                style={{ color: "#007bff" }}
                onClick={() => copyToClipBoard(address)}
              />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default InModal;
