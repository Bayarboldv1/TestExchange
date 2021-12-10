// import React from "react";
// import "../../assets/scss/module/modal.scss";

// function Modal({ setOpenModal }) {
//   return (
//     <div className="modalBackground  d-flex d-flex align-items-center">
//       <div className="modalContainer">
//         <div className="title">
//           <h1>Орлого </h1>
//         </div>
//         <div className="body">
//           <p>Орлого хийх крипто данс:</p>

//           <div className="copy">
//             <p>bc1qd8z28thjmk6vc546mnxt8xm7x0ykczezl08jq9</p>
//             <button className="btn btn-sm btn-link">Хуулах</button>
//           </div>
//         </div>
//         <div className="lbody">
//           <div className="qrt  col-md-4">
//             <p>QR Code</p>
//             <img
//               className="img-fluid w-100"
//               src={"img/qr-code-dark.svg"}
//               alt="qr-code"
//             />
// //           </div>
// <div className="btext">
//   <h5>Санамж</h5>
//   <li>
//     Энэхүү крипто данс руу {} -с өөр койн илгээж болохгүйг анхаарна
//     уу!
//   </li>
//   <li>
//     Энэхүү крипто данс руу шилжүүлэг хийх нь сүлжээний баталгаажуулалт
//     шаардана
//   </li>
//   <li>
//     Хамгийн бага орлогын хэмжээ: 0.01 {}. Үүнээс бага орлого
//     шилжүүлсэн тохиодолд орохгүй бөгөөд буцаах боломжгүй.
//   </li>
// </div>
//         </div>
//         <div className="footer">
//           <button
//             onClick={() => {
//               setOpenModal(false);
//             }}
//             id="cancelBtn"
//           >
//             Болих
//           </button>
//           <button
//             onClick={() => {
//               setOpenModal(false);
//             }}
//           >
//             Хүлээн Авсан
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Modal;

// import React from "react";
// import "../../assets/scss/module/modal.scss";

// function OutModal({ setOpenOutModal }) {
//   return (
//     <div className="modalBackground">
//       <div className="modalContainer">
//         <div className="title">
//           <h1>Зарлага </h1>
//         </div>
//         <div className="body">
//           <p>Зарлага хийх крипто данс</p>
//         </div>
//         <div className="obody">
//           <div className="form-group">
//             <p>Илгээх хаягаа нягтлана уу!</p>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Хаяг"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Дүн"
//               required
//             />
//           </div>
//           <p>Шимтгэл</p>
//           <p>1400{}</p>
//           <h6>Таны шилжүүлэг хийх боломжит хэмжээ: ₮20,000,000</h6>
//         </div>

//         <div className="footer">
//           <button
//             onClick={() => {
//               setOpenOutModal(false);
//             }}
//             id="cancelBtn"
//           >
//             Болих
//           </button>
//           <button>Зарлага Гарах</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OutModal;

import React from "react";
import { Modal, Button } from "react-bootstrap";
export default function InModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Орлого</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5> Орлого хийх крипто данс:</h5>
        <div className="form-group row">
          <input
            type="text"
            disabled
            readonly
            className="form-control ml-3 col-md-7"
            value="0x6B68c78E766d44B1E304c74941c3B2FA97ac29a5"
            required
          />
          <button className="col-md-2 btn btn-primary ml-2">Хуулах</button>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="col-md-6">
              <p>QR Code</p>
              <img
                className="img-fluid w-100"
                src={"img/qr-code-dark.svg"}
                alt="qr-code"
              />
            </div>
          </div>
          <div className="col-md-5">
            <div className=" mr-5">
              <h5>Санамж</h5>
              <li>
                Энэхүү крипто данс руу {} -с өөр койн илгээж болохгүйг анхаарна
                уу!
              </li>
              <li>
                Энэхүү крипто данс руу шилжүүлэг хийх нь сүлжээний
                баталгаажуулалт шаардана
              </li>
              <li>
                Хамгийн бага орлогын хэмжээ: 0.01 {}. Үүнээс бага орлого
                шилжүүлсэн тохиодолд орохгүй бөгөөд буцаах боломжгүй.
              </li>
            </div>
          </div>
        </div>
        <p className="mt-5">Шимтгэл</p>
        <p>1400{}</p>
        <h6>Таны шилжүүлэг хийх боломжит хэмжээ: ₮20,000,000</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Баталсан</Button>
      </Modal.Footer>
    </Modal>
  );
}
