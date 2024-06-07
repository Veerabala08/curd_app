/* eslint-disable react/prop-types */
import { Modal, Form, Button } from "react-bootstrap";

const ModalDialog = ({ show, handleClose, handleSubmit, formValues, handleInputChange, errors, mode }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === "create" ? "Create New User" : "Update User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a Name"
              value={formValues.name}
              onChange={handleInputChange}
              required
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={formValues.email}
                onChange={handleInputChange}
                autoFocus
              /> {errors.email && <span className="text-danger">{errors.email}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="mobile_no">
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="Enter the mobile no."
                value={formValues.mobile_no}
                onChange={handleInputChange}
                required
                autoFocus
              />{errors.mobile_no && <span className="text-danger">{errors.mobile_no}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter the Address"
                value={formValues.address}
                onChange={handleInputChange}
                required
              />{errors.address && <span className="text-danger">{errors.address}</span>}
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {mode === "create" ? "Create" : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDialog;
