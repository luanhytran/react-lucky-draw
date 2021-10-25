import React from "react";
import { useState } from "react";
import Customize from "./Customize";
import { Button, Modal, Navbar, Nav } from "react-bootstrap";

function MyNavBar(props) {
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
          <h3 style={{ display: "inline", marginLeft: "10px" }}>Lucky Draw</h3>
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
          <Button variant="secondary" onClick={cancelModal}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyNavBar;
