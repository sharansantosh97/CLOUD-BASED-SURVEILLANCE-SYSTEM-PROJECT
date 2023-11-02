import NavBarLoggedIn from "./Navbar/NavBarLoggedIn"
import { Container, Row, Col, Card } from "react-bootstrap"
import LeftNavBarAdmin from "./admin/LeftNavBarAdmin/LeftNavBarAdmin"
import axios from "axios"
import React, { useState } from "react"
import NavBarLoggedInAdmin from "./admin/NavbarAdmin/NavBarLoggedInAdmin"
import LeftNavBar from "./LeftNavBar/LeftNavBar"
// import "./AddUser.css"
import floorImage from "./floor.jpeg"
import { color } from "@mui/system"
import "./CampusViewPage.css"
import { Link } from "react-router-dom"
import CameraTable from "./CameraTable"

function FloorMap() {
  const buildings = [
    {
      id: 1,
      name: "Campus",
      cameras: [
        {
          id: 1,
          name: "Camera 1",
          operationStatus: "Online",
          healthStatus: "Good",
          location: [15, 30],
        },
        {
          id: 2,
          name: "Camera 2",
          operationStatus: "Online",
          healthStatus: "Excellent",
          location: [45, 45],
        },
        {
          id: 3,
          name: "Camera 3",
          operationStatus: "Offline",
          healthStatus: "Needs Maintenance",
          location: [28, 75],
        },
        {
          id: 4,
          name: "Camera 4",
          operationStatus: "Online",
          healthStatus: "Fair",
          location: [20, 40],
        },
        {
          id: 5,
          name: "Camera 5",
          operationStatus: "Offline",
          healthStatus: "Needs Maintenance",
          location: [34, 60],
        },
        {
          id: 6,
          name: "Camera 6",
          operationStatus: "Online",
          healthStatus: "Fair",
          location: [80, 80],
        },
        {
          id: 7,
          name: "Camera 7",
          operationStatus: "Offline",
          healthStatus: "Needs Maintenance",
          location: [50, 20],
        },
        {
          id: 8,
          name: "Camera 8",
          operationStatus: "Online",
          healthStatus: "Fair",
          location: [80, 15],
        },
      ],
    },
  ]

  const getOperationStatusColor = (status) => {
    if (status === "Online") {
      return "success"
    } else if (status === "Offline") {
      return "danger"
    } else {
      return "warning"
    }
  }

  return (
    <>
      {/* <NavBarLoggedInAdmin /> */}
      <Row>
        <Col lg={2}>
        <LeftNavBar/> 
        </Col>
        <Col lg={10} style={{ paddingLeft: 80, paddingRight: 80 }}>
          <div class='main-body'>
            <div class='page-wrapper'>
              <Container style={{ marginLeft: "20px" }}>
                <Row>
                  <Col>
                    <h1 className='text-center my-5'>Floor View</h1>
                  </Col>
                </Row>
                <Row>
                  <Col sm={8}>
                    <img
                      src={floorImage}
                      style={{ opacity: 0.6 }}
                      alt='Map'
                      className='map-image'
                    />
                    {buildings.map((building) => (
                      <div key={building.id} className='building-markers'>
                        {building.cameras.map((camera) => (
                          <Link
                            to='/cameravideo'
                            key={camera.id}
                            className={`camera-marker text-${getOperationStatusColor(
                              camera.operationStatus
                            )} bg-dark`}
                            style={{
                              left: `${camera.location[0]}%`,
                              top: `${camera.location[1]}%`,
                            }}
                          >
                            {camera.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                    
                  </Col>
                  
                  {/* <Col sm={4}>
                    {buildings.map((building) => (
                      <div key={building.id}>
                        <Card className='building-card'>
                          <Card.Body style={{ paddingTop: 10 }}>
                            {building.cameras.map((camera) => (
                              <Card.Text
                                key={camera.id}
                                className={`mb-2 text-${getOperationStatusColor(
                                  camera.operationStatus
                                )} bg-dark`}
                                id={camera.id}
                              >
                                <strong>{camera.name}</strong>
                                <br />
                                Operation Status: {camera.operationStatus}
                                <br />
                                Health Status: {camera.healthStatus}
                              </Card.Text>
                            ))}
                          </Card.Body>
                        </Card>
                      </div>
                    ))}
                  </Col> */}
                </Row>
                <CameraTable></CameraTable>
              </Container>
            </div>
          </div>
        </Col>
       
      </Row>
    </>
  )
}

export default FloorMap
