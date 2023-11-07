import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios, { Axios } from "axios"
import React, { useState, useEffect } from "react"

function DeviceTable() {

  const baseURL = process.env.REACT_APP_BACKEND_URL;

  const [buildings, setBuildings] = useState([]);

  const [newRecord, setNewRecord] = useState({
    name: '',
    buildingId: '',
    cameraType: '',
    resolution: '',
    location: '',
    timeframe: '',
    dataStorage: '',
    locationType: '',
    videoUrl: ''
  });
  
  useEffect(() => {
    fetchBuildings();
  }, []);

  useEffect(() => {
    fetchBuildings();
  }, [newRecord]);

  const fetchBuildings = () => {
    axios.get(`${baseURL}/building`)
    .then((response) => {
            console.log("response: ", response.data)
            if (response.status === 200) {
                console.log("success")
                setBuildings(response.data?.buildings);
            }
        })
        .catch((error) => {
            console.log("error: ", error)
        })
  };

  const addCamera = (newCamera) => {
    newCamera.location = newCamera.location.split(",");
    axios.post(`${baseURL}/camera`, newCamera)
    .then((response) => {
            console.log("response: ", response.data)
            if (response.status === 200) {
                console.log("success")
            }
        })
        .catch((error) => {
            console.log("error: ", error)
        })
  };

  const [showAddModal, setShowAddModal] = useState(false);

  const [records,setRecords] =useState([]);

  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowAddModal = () => setShowAddModal(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
  };

  const handleAddRecord = () => {
    // Add code to add new record to data source
    console.log('Adding new record:', newRecord);
    addCamera(newRecord);
    // setRecords([...records,newRecord]);
    // console.log(records);
    handleCloseAddModal();
  };

  return (
   <div>
    <Button variant="primary" onClick={handleShowAddModal}>
        Add Camera
      </Button>
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
            <Form.Group controlId="buildingId">
              <Form.Label>Building</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter building ID"
                name='buildingId'
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
       {/* Table to display added records */}
  {/* <Table striped bordered hover>
    <thead>
      <tr>
        <th>Name</th>
        <th>Building ID</th>
        <th>Camera Type</th>
        <th>Resolution</th>
        <th>Location</th>
        <th>Operation Status</th>
        <th>Health Status</th>
      </tr>
    </thead>
    <tbody>
      {records.map((record) => (
        <tr>
          <td>{record.name}</td>
          <td>{record.buildingId}</td>
          <td>{record.cameraType}</td>
          <td>{record.resolution}</td>
          <td>{record.location}</td>
          <td>{record.operationStatus}</td>
          <td>{record.healthStatus}</td>
        </tr>
      ))}
    </tbody>
  </Table> */}
   </div>
      
)};

export default DeviceTable;
