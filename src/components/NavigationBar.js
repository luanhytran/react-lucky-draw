import React from "react";
import { useState } from "react";
import Customize from "./Customize/Customize";
import { Button, Modal, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function NavigationBar(props) {
  const [openModal, setOpenModal] = useState(false);

  function cancelModal() {
    setOpenModal(false);
    props.onChange({
      wheelColor: localStorage.getItem("wheelColor"),
      fontColor: localStorage.getItem("fontColor"),
    });
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <h3 className="d-inline ms-2">Lucky Draw</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav.Link onClick={() => setOpenModal(true)}>
            <i className="bi bi-palette-fill me-2"></i>
            Customize
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={openModal} onHide={cancelModal} size="lg">
        <Modal.Body>
          <Customize />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={cancelModal}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NavigationBar;
