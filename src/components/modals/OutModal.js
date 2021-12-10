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
export default function OutModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Зарлага</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5> Зарлага хийх крипто данс</h5>
        <p>Илгээх хаягаа нягтлана уу!</p>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Хаяг"
            required
          />
        </div>
        <h5>Зарлага гаргах дүн</h5>
        <input
          type="number"
          className="form-control mb-4"
          placeholder="Дүн"
          required
        />
        <p>Шимтгэл</p>
        <p>1400{}</p>
        <h6>Таны шилжүүлэг хийх боломжит хэмжээ: ₮20,000,000</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Зарлага Гарах</Button>
      </Modal.Footer>
    </Modal>
  );
}
