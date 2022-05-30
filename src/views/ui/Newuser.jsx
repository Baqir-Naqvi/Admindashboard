import React from 'react'
import {
    Card,Row,
    Col,CardTitle,
    CardBody,Button,
    Form,FormGroup,
    Label,Input,
  } from "reactstrap";
import axios from 'axios';
function Newuser() {
    
    const initialFormData = Object.freeze({
        username: "",
        emailaddress: "",
        userpass: "",
        role: ""
    
      });
    const [formData, updateFormData] = React.useState(initialFormData);
    const handleChange = (e) => {
      updateFormData({
        ...formData,
  
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim() 
      });
    };
    const isDisabled = !formData.username || !formData.emailaddress || !formData.userpass || !formData.role 

    const handleSubmit = (e) => {
        e.preventDefault()
        const user={
            name: formData.username,
            password: formData.userpass,
            email: formData.emailaddress,
            role: formData.role,
        }
        AddNewUser(user);
      };
      async function AddNewUser(user)
      {
            await axios.post("http://localhost:4000/addnewuser/",user,{
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': process.env.REACT_APP_ACCESS
            }
            }).then((res) => {
              window.location.reload();
            });
      }
  return (
    <Row>
    <Col>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2"> </i>
          Add New User
        </CardTitle>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for="username">Name</Label>
              <Input name="username" type="text" onChange={handleChange} label="Email"/>
            </FormGroup>
            <FormGroup>
              <Label for="emailaddress">Email Address</Label>
              <Input  name="emailaddress" type="text" onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="userpass">Password</Label>
                <Input name="userpass" type="password" onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                <Label for="role">Role</Label>
                <Input name="role" type="select" onChange={handleChange}>
                  <option label='Select'></option>
                  <option>user</option>
                  <option>admin</option>
                </Input>
              </FormGroup>
            <Button onClick={(e) => handleSubmit(e)} disabled={isDisabled}>Add New User</Button>
          </Form>
        </CardBody>
      </Card>
    </Col>
  </Row>
  )
}

export default Newuser