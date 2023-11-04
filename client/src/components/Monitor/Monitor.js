import Container from "react-bootstrap/Container"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import LeftNavBar from "../LeftNavBar/LeftNavBar"
import NavBarLoggedIn from "../Navbar/NavBarLoggedIn"
import CameraTable from "../CameraTable"

import { Nav, Navbar } from "react-bootstrap"
import "./MonitorAndTrack.css"
import axios from "axios"
import React, { useState, useEffect } from "react"



const Monitor = () => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    fetchCameras();
  }, []);

  const fetchCameras = () => {
    axios.get(`${baseURL}/camera`)
    .then((response) => {
            console.log("response: ", response.data)
            if (response.status === 200) {
                console.log("success")
                setCameras(response.data?.cameras);
            }
        })
        .catch((error) => {
            console.log("error: ", error)
        })
  };

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
            <CameraTable cameras = {cameras}/>
          </Container>
        </Col>
      </Row>
    </>
  )
}
export default Monitor
