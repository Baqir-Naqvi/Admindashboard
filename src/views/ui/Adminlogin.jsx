import React from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

function Adminlogin() {
  const [result, setResult] = useState();
  useEffect(() => {
    if (result) {
      if (localStorage.getItem("token") === "admin")
        window.location.href = "/starter";
    }
  }, [result]);

  function Login(e) {
    e.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var data = {
      email: username,
      password: password,
    };
    axios
      .post("http://localhost:4000/login", data)
      .then((res) => {
        if (res.data.token) {
          console.log("Token generated");
          setResult(res.data);
          localStorage.setItem("token", res.data.user.role);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
        Admin Login
      </h1>
      <Row className="mt-5">
        <Col lg={5} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="Password"
                placeholder="Enter Enter Password"
              />
            </Form.Group>
            <br />
            <Button variant="success btn-block" onClick={(e) => Login(e)}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <h6 className="mt-5 p-5 text-center text-secondary">
        Copyright @ 2022 Hostel Book.All Right Reserved.{" "}
      </h6>
    </div>
  );
}

export default Adminlogin;
