import { useState, React } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

function UserModal({ data, handler }) {
  const [show, setShow] = useState(true);

  const [formData, updateFormData] = useState();

  const handleClose = () => setShow(false);
  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  async function UpdateUser() {
    const user = {
      name: formData.username,
      password: formData.password,
      email: formData.email,
    };
    await axios
      .put("http://localhost:4000/users/" + data._id, user, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: process.env.REACT_APP_ACCESS,
        },
      })
      .then((res) => {
        handler();
      });
    console.log(user);
    window.location.reload();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton onClick={handler}>
        <Modal.Title>Room Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <Label for="name">UserName</Label>
            <Input
              name="username"
              type="text"
              defaultValue={data.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              name="email"
              type="text"
              defaultValue={data.email}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handler}>
          Close
        </Button>
        <Button variant="primary" onClick={UpdateUser}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserModal;
