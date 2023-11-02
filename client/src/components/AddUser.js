import { Form, Modal } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import NavBarLoggedIn from "../Navbar/NavBarLoggedIn"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import LeftNavBar from "../LeftNavBar/LeftNavBar"
import Home from "../home"
import LeftNavBarAdmin from "./LeftNavBarAdmin/LeftNavBarAdmin"

import axios from "axios"
import React, { useState } from "react"
import NavBarLoggedInAdmin from "./NavbarAdmin/NavBarLoggedInAdmin"
// import "./AddUser.css"

function AddUser() {
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => setShow(true)

  const submitHandler = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const firstName = event.target.firstName.value
    const lastName = event.target.lastName.value
    const campusName = event.target.campusName.value
    const phoneNumber = event.target.phoneNumber.value

    await apiCall(email, firstName, lastName, password, campusName, phoneNumber)

    event.target.email.value = ""
    event.target.firstName.value = ""
    event.target.lastName.value = ""
    event.target.password.value = ""
    event.target.phoneNumber.value = ""
    event.target.campusName.value = ""
  }

  const apiCall = async (
    email,
    firstName,
    lastName,
    password,
    campusName,
    phoneNumber
  ) => {
    const response = await axios.post("http://localhost:4000/addUser", {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      isAdmin: false,
      campusName: campusName,
      phoneNumber: phoneNumber,
    })
    handleShow()
  }

  return (
    <>
      <NavBarLoggedInAdmin />
      <Row>
        <Col lg={2}>
          {" "}
          <LeftNavBarAdmin />{" "}
        </Col>
        <Col lg={10}>
          <Row>
            <Col lg={2}></Col>
            <Col lg={8} style={{ marginTop: "5%" }}>
              <h4 style={{ marginTop: "5%", textAlign: "center" }}>
                {" "}
                Onboard a New Campus Security Officer{" "}
              </h4>
              <Form onSubmit={submitHandler}>
                <Form.Label style={{ marginTop: "2%" }}>First Name</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Enter First Name'
                  name='firstName'
                />

                <Form.Label style={{ marginTop: "2%" }}>Last Name</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Enter Last Name'
                  name='lastName'
                />

                <Form.Label style={{ marginTop: "2%" }}>
                  Email address
                </Form.Label>
                <Form.Control
                  required
                  type='email'
                  placeholder='Enter email'
                  name='email'
                />

                {/* <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text> */}

                <Form.Label style={{ marginTop: "2%" }}>Password</Form.Label>
                <Form.Control
                  required
                  type='password'
                  placeholder='Password'
                  name='password'
                />
                <Form.Label style={{ marginTop: "2%" }}>
                  Phone Number
                </Form.Label>
                <Form.Control
                  required
                  type='phoneNumber'
                  placeholder='Phone Number'
                  name='phoneNumber'
                />
                <Form.Label style={{ marginTop: "2%" }}>Campus Name</Form.Label>
                <Form.Control
                  required
                  type='campusName'
                  placeholder='Campus Name'
                  name='campusName'
                />

                <Button
                  variant='primary'
                  type='submit'
                  style={{ marginTop: "2%" }}
                >
                  Submit
                </Button>
              </Form>
            </Col>
            <Col lg={2}></Col>
          </Row>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>User Added Successfully!.</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddUser
