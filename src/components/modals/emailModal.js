import React from "react";
import { Modal, Button } from "react-bootstrap";
export default function EmailModal(props) {
  const inputHandler = (e) => {
    const { value, maxLength } = e.target;
    if (String(value).length >= maxLength) {
      e.preventDefault();
      return;
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Имэйл солих
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Имэйл хаягаа оруулна уу</h5>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email Хаяг"
            required
          />
        </div>
        <h5>Имэйл хаягруу илгээсэн 6 оронт баталгаажуулах код</h5>
        <input
          maxlength="6"
          type="number"
          className="form-control mb-4"
          placeholder="code"
          onKeyPress={inputHandler}
          required
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Солих</Button>
      </Modal.Footer>
    </Modal>
  );
}
