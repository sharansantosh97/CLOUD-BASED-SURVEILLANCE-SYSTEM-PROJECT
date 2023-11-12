// import NavBarLoggedIn from "../Navbar/NavBarLoggedIn"
import { Container, Row, Col, Card } from "react-bootstrap";
// import LeftNavBarAdmin from "./LeftNavBarAdmin/LeftNavBarAdmin"
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaVideo } from "react-icons/fa";

// import NavBarLoggedInAdmin from "./NavbarAdmin/NavBarLoggedInAdmin"
// import "./AddUser.css"
import mapImage from "./map.jpeg";
import { color } from "@mui/system";
import "./CampusViewPage.css";
import { Link } from "react-router-dom";

function Home() {
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  const [buildings, setBuildings] = useState([]);
  console.log("process.env.BACKEND_URL", process.env.REACT_APP_BACKEND_URL);

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = () => {
    axios
      .get(`${baseURL}/building`)
      .then((response) => {
        console.log("response: ", response.data);
        if (response.status === 200) {
          console.log("success");
          setBuildings(response.data?.buildings);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const buildings1 = [
    {
      id: "64407a6155d5e66f8b5a69b8",
      name: "Campus",
      cameras: [
        {
          id: 1,
          name: "Building 1",
          operationStatus: "Online",
          healthStatus: "Good",
          location: [50, 100],
        },
        {
          id: 2,
          name: "Building 2",
          operationStatus: "Online",
          healthStatus: "Excellent",
          location: [30, 80],
        },
        {
          id: 3,
          name: "Building 3",
          operationStatus: "Offline",
          healthStatus: "Needs Maintenance",
          location: [40, 120],
        },
        {
          id: 4,
          name: "Building 4",
          operationStatus: "Online",
          healthStatus: "Fair",
          location: [60, 60],
        },
      ],
    },
  ];

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
      {/* <NavBarLoggedInAdmin /> */}
      <Row>
        <Col lg={10} style={{ paddingLeft: 100, paddingRight: 20 }}>
          <div class="main-body">
            <div class="page-wrapper">
              <div class="row">
                <div class="col-md-6 col-xl-4">
                  <div class="card daily-sales">
                    <div class="card-block">
                      <h6 class="mb-4">Number of Cameras</h6>
                      <div class="row d-flex align-items-center">
                        <div class="col-9">
                          <h3 class="f-w-300 d-flex align-items-center m-b-0">
                            <i class="feather icon-arrow-up text-c-green f-30 m-r-10"></i>
                            25
                          </h3>
                        </div>
                        {/* <div class='col-3 text-right'>
                          <p class='m-b-0'>67%</p>
                        </div> */}
                      </div>
                      <div
                        className="progress m-t-30"
                        style={{ height: "7px" }}
                      >
                        <div
                          className="progress-bar progress-c-theme"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-8 col-xl-4">
                  <div class="card daily-sales">
                    <div class="card-block">
                      <h6 class="mb-4">Maintenance Requests Raised</h6>
                      <div class="row d-flex align-items-center">
                        <div class="col-9">
                          <h3 class="f-w-300 d-flex align-items-center m-b-0">
                            <i class="feather icon-arrow-up text-c-green f-30 m-r-10"></i>
                            10
                          </h3>
                        </div>

                        {/* <div class='col-4 text-right'>
                          <p class='m-b-0'>67%</p>
                        </div> */}
                      </div>
                      <div
                        className="progress m-t-30"
                        style={{ height: "7px" }}
                      >
                        <div
                          className="progress-bar progress-c-theme"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 col-xl-4">
                  <div class="card daily-sales">
                    <div class="card-block">
                      <h6 class="mb-4">Pending Maintenance Requests</h6>
                      <div class="row d-flex align-items-center">
                        <div class="col-9">
                          <h3 class="f-w-300 d-flex align-items-center m-b-0">
                            <i class="feather icon-arrow-up text-c-green f-30 m-r-10"></i>
                            6
                          </h3>
                        </div>

                        {/* <div class='col-3 text-right'>
                          <p class='m-b-0'>67%</p>
                        </div> */}
                      </div>
                      <div
                        className="progress m-t-30"
                        style={{ height: "7px" }}
                      >
                        <div
                          className="progress-bar progress-c-theme"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Container style={{ marginLeft: "20px" }}>
                <Row>
                  <Col>
                    <h1 className="text-center my-5">Campus View</h1>
                  </Col>
                </Row>
                <Row>
                  <Col sm={8} style={{ position: "relative" }}>
                    <img
                      src={mapImage}
                      style={{ opacity: 0.6 }}
                      alt="Map"
                      className="map-image"
                    />
                    {buildings1.map((building) => (
                      <div key={building._id} className="building-markers">
                        {building?.cameras?.map((camera) => {
                          const leftPercentage = `${
                            (camera.location[0] % 50) + 30
                          }%`;
                          const topPer = (camera.location[1] % 100) + 240;
                          const topPercentage = `${topPer}px`;
                          return (
                            <Link
                              to={`/floormap/${building.id}`}
                              key={camera._id}
                              className={`camera-marker text-${getOperationStatusColor(
                                camera.operationStatus
                              )} `}
                              style={{
                                fontSize: "17px",
                                position: "absolute",
                                left: leftPercentage,
                                top: topPercentage,
                                backgroundColor: "#eee",
                              }}
                            >
                              <FaVideo style={{ marginRight: "1px" }} />
                              {camera.name}
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                  </Col>
                  <Col sm={4} style={{ maxHeight: "500px", overflowY: "auto" }}>
                    {buildings.map((building) => (
                      <div key={building._id}>
                        <Card className="building-card mb-3">
                          <Card.Body
                            style={{ paddingTop: 10, backgroundColor: "#eee" }}
                          >
                            {building?.cameras?.map((camera) => (
                              <Card.Text
                                style={{ fontSize: "16px" }}
                                key={camera._id}
                                className={`mb-2 text-${getOperationStatusColor(
                                  camera.operationStatus
                                )}`}
                                id={camera._id}
                              >
                                <strong>{camera.name || "Camera Name"}</strong>
                                <br />
                                Operation Status:{" "}
                                {camera.operationStatus || "Status Unavailable"}
                                <br />
                                Health Status:{" "}
                                {camera.healthStatus || "Health Unavailable"}
                              </Card.Text>
                            ))}
                            {(!building?.cameras ||
                              building.cameras.length === 0) && (
                              <Card.Text className="text-muted">
                                No cameras available
                              </Card.Text>
                            )}
                          </Card.Body>
                        </Card>
                      </div>
                    ))}
                  </Col>
                  ;
                </Row>
              </Container>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Home;
