import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FaVideo } from 'react-icons/fa';
import { FaExclamationTriangle } from 'react-icons/fa';

import Table from "react-bootstrap/Table";
import axios from "axios";
import LeftNavBar from "./LeftNavBar/LeftNavBar";
import floorImage from "./floor.jpeg";
import "./CampusViewPage.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function FloorMap() {
  const baseURL = process.env.REACT_APP_BACKEND_URL;
  const [cameras, setCameras] = useState([]);
  console.log("process.env.BACKEND_URL", process.env.REACT_APP_BACKEND_URL);

  const { buildingId } = useParams();
  useEffect(() => {
    fetchCameras();
  }, []);

  const fetchCameras = () => {
    const queryParams = {
      buildingId: buildingId,
    };
    axios
      .get(`${baseURL}/camera/filters`, { params: queryParams })
      .then((response) => {
        console.log("response: ", response.data);
        if (response.status === 200) {
          console.log("success");
          setCameras(response.data?.cameras);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };
  const blinkingStyle = `
  @keyframes blinking {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
  
  .blink {
    animation: blinking 1s infinite;
  }
`;

  const [newRecord, setNewRecord] = useState({
    name: "",
    buildingId: buildingId,
    cameraType: "",
    resolution: "",
    location: "",
    timeframe: "",
    dataStorage: "",
    locationType: "",
    videoUrl: "",
  });
  const dangerBuildings = [
    { id: 1, status: "danger" },
    { id: 2, status: "normal" },
    // Add buildings and their status as needed
  ];

  const limitCameraName = (name) => {
    if (name.length > 7) {
      return name.substring(0, 7) + "...";
    }
    return name;
  };
  const [showAddModal, setShowAddModal] = useState(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
  };
  const handleAddRecord = () => {
    // Add code to add new record to data source
    console.log("Adding new record:", newRecord);
    addCamera(newRecord);
    // // setRecords([...records,newRecord]);
    // // console.log(records);
    handleCloseAddModal();
  };
  const addCamera = (newCamera) => {
    newCamera.location = newCamera.location.split(",");
    axios
      .post(`${baseURL}/camera`, newCamera)
      .then((response) => {
        console.log("response: ", response.data);
        if (response.status === 201) {
          console.log("success");
          fetchCameras();
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const deleteCamera = (event) => {
    const reqId = event.target.name;
    axios
      .delete(`${baseURL}/camera/${reqId}`)
      .then((response) => {
        console.log("response: ", response.data);
        if (response.status === 200) {
          console.log("success");
          fetchCameras();
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const getOperationStatusColor = (status) => {
    if (status === "Online") {
      return "success";
    } else if (status === "Offline") {
      return "danger";
    } else {
      return "warning";
    }
  };
  return (
    <>
      <style>{blinkingStyle}</style>
      <Row>
        <Col lg={2}>
          <LeftNavBar />
        </Col>
        <Col lg={10}>
          <div class="main-body">
            <div class="page-wrapper">
              <Container style={{ marginLeft: "20px" }}>
                <Row>
                  <Col>
                    <h1 className="text-center my-5">Floor View</h1>
                  </Col>
                </Row>
                <Row>
                  <Col sm={8}>
                    <img
                      src={floorImage}
                      style={{ opacity: 0.6 }}
                      alt="Map"
                      className="map-image"
                    />
                    <div className="building-markers">
                      {cameras.map((camera) => (
                        <Link
                          to="/cameravideo"
                          key={camera.id}
                          className={`camera-marker ${
                            camera.operationStatus?.toLowerCase() === "Offline" ? "blinking" : ""
                          } text-${getOperationStatusColor(camera.operationStatus)} bg-dark`}
                          style={{
                            left: `${camera.location[0]}%`,
                            top: `${camera.location[1]}%`,
                          }}
                        >
                          {camera.operationStatus?.toLowerCase() === "Offline" ? (
                            <>
                              <FaExclamationTriangle style={{ marginRight: '5px', color: 'red' }} />
                              <FaVideo style={{ marginRight: '5px', color: 'red' }} />
                            </>
                          ) : (
                            <FaVideo style={{ marginRight: '5px' }} />
                          )}
                          {limitCameraName(camera.name)}
                        </Link>
                      ))}
                    </div>
                  </Col>
                  <Col>
                    <Button variant="primary" onClick={handleShowAddModal}>
                      Add Camera
                    </Button>
                    <Table striped bordered hover style={{ marginTop: 100 }}>
                      <thead>
                        <tr>
                          <th>Camera Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cameras.map((camera) => (
                          <tr key={camera._id}>
                            <td>
                              <Link
                                to="/cameravideo"
                                key={camera._id}
                                className=""
                              >
                                {camera.name}
                              </Link>
                            </td>
                            <td>
                              <Button variant="warning" name={camera._id}>
                                {" "}
                                Modify Camera
                              </Button>{" "}
                            </td>
                            <td>
                              <Button
                                variant="danger"
                                onClick={deleteCamera}
                                name={camera._id}
                              >
                                {" "}
                                Delete Camera
                              </Button>{" "}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </Col>
      </Row>
      {/* Modal component remains the same */}
    </>
  );
}

export default FloorMap;