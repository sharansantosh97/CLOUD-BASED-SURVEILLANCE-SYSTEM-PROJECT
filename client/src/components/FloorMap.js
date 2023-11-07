import { Container, Row, Col, Button, Modal, Form} from "react-bootstrap"
import Table from 'react-bootstrap/Table';
import axios from "axios"
import LeftNavBar from "./LeftNavBar/LeftNavBar"
import floorImage from "./floor.jpeg"
import "./CampusViewPage.css"
import { Link } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
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
      buildingId:buildingId
    };
    axios.get(`${baseURL}/camera/filters`, { params: queryParams })
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
  const [newRecord, setNewRecord] = useState({
    name: '',
    buildingId: buildingId,
    cameraType: '',
    resolution: '',
    location: '',
    timeframe: '',
    dataStorage: '',
    locationType: '',
    videoUrl: ''
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
  };
  const handleAddRecord = () => {
    // Add code to add new record to data source
    console.log('Adding new record:', newRecord);
    addCamera(newRecord);
    // // setRecords([...records,newRecord]);
    // // console.log(records);
    handleCloseAddModal();
  };
  const addCamera = (newCamera) => {
    newCamera.location = newCamera.location.split(",");
    axios.post(`${baseURL}/camera`, newCamera)
    .then((response) => {
            console.log("response: ", response.data)
            if (response.status === 201) {
                console.log("success");
                fetchCameras();
            }
        })
        .catch((error) => {
            console.log("error: ", error)
        })
  };

  const deleteCamera = (event) => {
    const reqId = event.target.name
    axios.delete(`${baseURL}/camera/${reqId}`)
    .then((response) => {
            console.log("response: ", response.data)
            if (response.status === 200) {
                console.log("success");
                fetchCameras();
            }
        })
        .catch((error) => {
            console.log("error: ", error)
        })
  };
  // const buildings = [
  //   {
  //     id: 1,
  //     name: "Campus",
  //     cameras: [
  //       {
  //         id: 1,
  //         name: "Camera 1",
  //         operationStatus: "Online",
  //         healthStatus: "Good",
  //         location: [15, 30],
  //       },
  //       {
  //         id: 2,
  //         name: "Camera 2",
  //         operationStatus: "Online",
  //         healthStatus: "Excellent",
  //         location: [45, 45],
  //       },
  //       {
  //         id: 3,
  //         name: "Camera 3",
  //         operationStatus: "Offline",
  //         healthStatus: "Needs Maintenance",
  //         location: [28, 75],
  //       },
  //       {
  //         id: 4,
  //         name: "Camera 4",
  //         operationStatus: "Online",
  //         healthStatus: "Fair",
  //         location: [20, 40],
  //       },
  //       {
  //         id: 5,
  //         name: "Camera 5",
  //         operationStatus: "Offline",
  //         healthStatus: "Needs Maintenance",
  //         location: [34, 60],
  //       },
  //       {
  //         id: 6,
  //         name: "Camera 6",
  //         operationStatus: "Online",
  //         healthStatus: "Fair",
  //         location: [80, 80],
  //       },
  //       {
  //         id: 7,
  //         name: "Camera 7",
  //         operationStatus: "Offline",
  //         healthStatus: "Needs Maintenance",
  //         location: [50, 20],
  //       },
  //       {
  //         id: 8,
  //         name: "Camera 8",
  //         operationStatus: "Online",
  //         healthStatus: "Fair",
  //         location: [80, 15],
  //       },
  //     ],
  //   },
  // ]

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
                    <div className='building-markers'>
                        {cameras.map((camera) => (
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
                  <Col>
                  <Button variant="primary" onClick={handleShowAddModal}>
                  Add Camera
                 </Button>
                    <Table striped bordered hover style={{marginTop:100}}>
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
                                to='/cameravideo'
                                key={camera._id}
                                className=""
                              >
                                {camera.name}
                              </Link>
                  
                            </td>
                            <td>
                            <Button variant="warning" name={camera._id}> Modify Camera</Button>{' '}  
                            </td>
                            <td>
                            <Button variant="danger" onClick={deleteCamera} name={camera._id}> Delete Camera</Button>{' '}
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

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Camera</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
               name='name'
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="cameraType">
              <Form.Label>Camera Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter camera type"
               name='cameraType'
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="resolution">
              <Form.Label>Resolution</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter resolution"
                name='resolution'
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                name='location'
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="timeframe">
              <Form.Label>Time Frame</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter time frame for the video capture"
             name='timeframe'
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="dataStorage">
              <Form.Label>Data Storage</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter data storage location"
             name='dataStorage'
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="locationType">
              <Form.Label>Location Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location type"
                name='locationType'
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="videoUrl">
              <Form.Label>Video Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter video url"
                name='videoUrl'
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddRecord}>
                   Add Record
            </Button>
            </Modal.Footer>
            </Modal>

    </>
  )
}

export default FloorMap
