import NavBarLoggedIn from "./Navbar/NavBarLoggedIn"
import { Container, Row, Col, Card } from "react-bootstrap"
import LeftNavBarAdmin from "./admin/LeftNavBarAdmin/LeftNavBarAdmin"
import axios from "axios"
import React, { useState, useEffect } from "react"
import NavBarLoggedInAdmin from "./admin/NavbarAdmin/NavBarLoggedInAdmin"
import LeftNavBar from "./LeftNavBar/LeftNavBar"
// import "./AddUser.css"
import floorImage from "./floor.jpeg"
import { color } from "@mui/system"
import "./CampusViewPage.css"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import queryString from "query-string"

function CameraVideo({ indoor }) {
  const baseURL = process.env.REACT_APP_BACKEND_URL
  const location = useLocation()
  const queryParams = queryString.parse(location.search)
  const videoUrl = queryParams.url
  const id = queryParams.id

  const [cameras, setCameras] = useState([])
  const [selectedCamera, setSelectedCamera] = useState(null)

  useEffect(() => {
    const fetchCameras = () => {
      axios
        .get(`${baseURL}/camera`)
        .then((response) => {
          if (response.status === 200) {
            setCameras(response.data?.cameras)
          }
        })
        .catch((error) => {
          console.log("error: ", error)
        })
    }

    fetchCameras()
  }, [])

  useEffect(() => {
    if (id && cameras.length > 0) {
      // Filter the cameras array to find the one with the matching id
      const selected = cameras.find((camera) => camera._id === id)
      setSelectedCamera(selected)
    }
  }, [id, cameras])

  return (
    <>
      {/* <NavBarLoggedInAdmin /> */}
      <Row>
        <Col lg={2}>
          <LeftNavBar />
        </Col>
        <Col lg={10} style={{ paddingLeft: 80, paddingRight: 80 }}>
          <div class='main-body'>
            <div class='page-wrapper'>
              <Container style={{ marginLeft: "20px" }}>
                <Row>
                  <Col>
                    <h1 className='text-center my-5'>Camera Video</h1>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    {/* Removed the commented-out code for simplicity */}

                    <Row>
                      <Col lg={8}>
                        <iframe
                          width='940'
                          height='680'
                          src={videoUrl}
                          frFameborder='0'
                          allowfullscreen
                        ></iframe>
                      </Col>
                      <Col lg={4}>
                        {selectedCamera && (
                          <Container style={{ marginLeft: "20px" }}>
                            <Row>
                              <Col sm={12}>
                                {/* Display details of the selected camera */}
                                <Card style={{ padding: 0 }}>
                                  <Card.Body>
                                    <Row>
                                      <Col>
                                        <h3>Camera Details</h3>
                                      </Col>
                                    </Row>
                                    <br />
                                    <h5>
                                      {" "}
                                      <i
                                        style={{
                                          fontWeight: "lighter",
                                          fontSize: 14,
                                        }}
                                      >
                                        Camera Name:{" "}
                                      </i>{" "}
                                      {selectedCamera.name}
                                    </h5>
                                    <h5>
                                      {" "}
                                      <i
                                        style={{
                                          fontWeight: "lighter",
                                          fontSize: 14,
                                        }}
                                      >
                                        Camera Id:{" "}
                                      </i>{" "}
                                      {selectedCamera._id}
                                    </h5>
                                    <h5>
                                      {" "}
                                      <i
                                        style={{
                                          fontWeight: "lighter",
                                          fontSize: 14,
                                        }}
                                      >
                                        Camera Type:{" "}
                                      </i>{" "}
                                      {selectedCamera.cameraType}
                                    </h5>
                                    <h5>
                                      {" "}
                                      <i
                                        style={{
                                          fontWeight: "lighter",
                                          fontSize: 14,
                                        }}
                                      >
                                        Operation Status:{" "}
                                      </i>{" "}
                                      {selectedCamera.operationStatus}
                                    </h5>
                                    <h5>
                                      {" "}
                                      <i
                                        style={{
                                          fontWeight: "lighter",
                                          fontSize: 14,
                                        }}
                                      >
                                        Health Status:{" "}
                                      </i>{" "}
                                      {selectedCamera.healthStatus}
                                    </h5>
                                  </Card.Body>
                                </Card>
                              </Col>
                            </Row>
                          </Container>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default CameraVideo
