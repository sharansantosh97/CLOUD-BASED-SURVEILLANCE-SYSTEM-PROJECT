import Container from "react-bootstrap/Container"



import React, { useState } from "react"


import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import LeftNavBar from "../LeftNavBar/LeftNavBar"
import NavBarLoggedIn from "../Navbar/NavBarLoggedIn"
import CameraTable from "../CameraTable"

import { Nav, Navbar } from "react-bootstrap"
import "./MonitorAndTrack.css"



const Monitor = () => {


  return (
    <>
      <NavBarLoggedIn />

      <Row>
        <Col lg={2}>
          {" "}
          <LeftNavBar />{" "}
        </Col>
        <Col lg={10}>
          <Container style={{ marginTop: "%" }}>
            <h3 style={{ textAlign: "center", marginTop: "5%" }}>
              Monitor and Tracking
            </h3>
            <CameraTable></CameraTable>
          </Container>
        </Col>
      </Row>
    </>
  )
}
export default Monitor
