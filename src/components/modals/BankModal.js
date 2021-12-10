// import React from "react";
// import "../../assets/scss/module/modal.scss";

// function BankModal({ setBankModalOpen }) {
//   return (
//     <div className="bankModal">
//       <div className="modalContainer">
//         <div className="title">
//           <h1></h1>
//         </div>
//         <div className="body">
//           <p></p>
//         </div>
//         <div className="obody">
//           <div className="form-group">
//             <p>Дансны дугаар</p>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Хаяг"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <p>Дансны дугаар</p>
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Дүн"
//               required
//             />
//           </div>

import React from "react";
import { Modal, Button } from "react-bootstrap";
export default function BankModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Банкны данс солих
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Банк Сонгох</h5>
        <div className="form-group">
          <select id="selectBank" className="custom-select">
            <option value="Khan">Хаан Банк</option>
            <option value="Xac">Хас Банк</option>
            <option value="TDB">Худалдаа Хөгжилийн Банк</option>
            <option value="Golomt">Голомт Банк</option>
          </select>
        </div>
        <h5>Дансны дугаар</h5>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Дансны Дугаар"
            required
          />
        </div>{" "}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Нэр"
            required
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Солих</Button>
      </Modal.Footer>
    </Modal>
  );
}
