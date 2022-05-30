import { useState, React } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";

function Modals({ data, handler }) {
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

  async function UpdateRoom() {
    const room = {
      roomno: formData.roomno,
      floorno: formData.floorno,
      roomtype: formData.roomtype,
      roomcapacity: formData.roomcapacity,
      roomdescription: formData.roomdescription,
      roomprice: formData.roomprice
    };
    console.log(data._id);
    await axios
      .put("http://localhost:4000/roomslist/" + data._id, room)
      .then((res) => {
        handler();
        window.location.reload();
      });
  
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton onClick={handler}>
        <Modal.Title>Room Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <Label for="roomno">Room No</Label>
            <Input name="roomno" type="text" defaultValue={data.roomno} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="roomno">Room Capacity</Label>
            <Input name="roomcapacity" type="text" defaultValue={data.roomcapacity}  onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <Label for="floorno">Floor No</Label>
            <Input name="floorno" type="select" defaultValue={data.floorno}  onChange={handleChange}>
              <option label="Floor Level"></option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="roomtype">Room Type</Label>
            <Input name="roomtype" type="select" defaultValue={data.roomtype} onChange={handleChange}>
              <option label="Select"></option>
              <option>Delux</option>
              <option>Non-Delux</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="roomdescription">Room Description</Label>
            <Input name="roomdescription" type="text" defaultValue={data.roomdescription} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="roomprice">Room Price</Label>
            <Input name="roomprice" type="text" defaultValue={data.roomprice} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input id="exampleFile" name="file" type="file" />
            <FormText>
              This is some placeholder block-level help text for the above
              input. It's a bit lighter and easily wraps to a new line.
            </FormText>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handler}>
          Close
        </Button>
        <Button variant="primary" onClick={UpdateRoom}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modals;
