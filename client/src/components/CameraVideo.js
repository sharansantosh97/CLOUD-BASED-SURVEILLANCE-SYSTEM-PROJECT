import NavBarLoggedIn from "./Navbar/NavBarLoggedIn";
import { Container, Row, Col, Card } from "react-bootstrap";
import LeftNavBarAdmin from "./admin/LeftNavBarAdmin/LeftNavBarAdmin";
import axios from "axios";
import React, { useState } from "react";
import NavBarLoggedInAdmin from "./admin/NavbarAdmin/NavBarLoggedInAdmin";
import LeftNavBar from "./LeftNavBar/LeftNavBar";
// import "./AddUser.css"
import floorImage from "./floor.jpeg";
import { color } from "@mui/system";
import "./CampusViewPage.css";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

function CameraVideo({indoor}) {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const videoUrl = queryParams.url;


  return (
    <>
      {/* <NavBarLoggedInAdmin /> */}
      <Row>
        <Col lg={2}>
          <LeftNavBar />
        </Col>
        <Col lg={10} style={{ paddingLeft: 80, paddingRight: 80 }}>
          <div class="main-body">
            <div class="page-wrapper">
              <Container style={{ marginLeft: "20px" }}>
                <Row>
                  <Col>
                    <h1 className="text-center my-5">Camera Video</h1>
                  </Col>
                </Row>
                <Row>
                <Col sm={12}>
    {/* Removed the commented-out code for simplicity */}



 
    <Row>
   <iframe width="640" height="480" src={videoUrl} frameborder="0" allowfullscreen></iframe>
    </Row>
</Col>

            
                </Row>
              </Container>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default CameraVideo;
