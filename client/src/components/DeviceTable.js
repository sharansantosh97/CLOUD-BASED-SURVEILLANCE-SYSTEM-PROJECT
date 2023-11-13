import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";

function DeviceTable() {
  const baseURL = process.env.REACT_APP_BACKEND_URL;
  const [cameras, setCameras] = useState([]); // Data for dropdown - list of cameras
  const [buildings, setBuildings] = useState([]); // Data for dropdown - list of buildings
  const [newRecord, setNewRecord] = useState({
    name: "",
    buildingId: "",
    cameraType: "",
    resolution: "",
    location: "",
    latitude: "", // New state for latitude
    longitude: "", // New state for longitude
    timeframe: "",
    dataStorage: "",
    locationType: "",
    videoUrl: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchCamerasData();
    fetchBuildingsData();
  }, []);

  const fetchCamerasData = () => {
    axios
      .get(`${baseURL}/camera`)
      .then((response) => {
        setCameras(response.data.cameras);
      })
      .catch((error) => {
        console.error("Error fetching cameras:", error);
      });
  };

  const fetchBuildingsData = () => {
    axios
      .get(`${baseURL}/building`)
      .then((response) => {
        setBuildings(response.data.buildings);
      })
      .catch((error) => {
        console.error("Error fetching buildings:", error);
      });
  };

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
  };
  const latitudes = Array.from({ length: 31 }, (_, i) => 30 + i);
  const longitudes = Array.from({ length: 31 }, (_, i) => 30 + i);

  const handleAddRecord = () => {
    const { latitude, longitude, ...recordWithoutLocation } = newRecord;
    const location = [parseFloat(latitude), parseFloat(longitude)];
    axios
      .post(`${baseURL}/camera`,  { ...recordWithoutLocation, location })
      .then((response) => {
        console.log("Success:", response.data);
        fetchCamerasData();
      })
      .catch((error) => {
        console.error("Error adding camera:", error);
      });

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
                name="name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="buildingId">
              <Form.Label>Building</Form.Label>
              <Form.Control
                as="select"
                name="buildingId"
                onChange={handleInputChange}
              >
                <option value="">Select Building</option>
                {buildings.map((building) => (
                  <option key={building.id} value={building._id}>
                    {building.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="cameraType">
              <Form.Label>Camera Type</Form.Label>
              <Form.Control
                as="select"
                name="cameraType"
                onChange={handleInputChange}
              >
                <option value="">Select Camera Type</option>
                <option value="DSLR">DSLR</option>
                <option value="Mirrorless">Mirrorless</option>
                <option value="Compact">Compact</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="resolution">
              <Form.Label>Resolution</Form.Label>
              <Form.Control
                as="select"
                name="resolution"
                onChange={handleInputChange}
              >
                <option value="">Select Resolution</option>
                <option value="4K">4K</option>
                <option value="1080P">1080P</option>
                <option value="720P">720P</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="location">
            <Form.Group controlId="latitude">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                as="select"
                name="latitude"
                onChange={handleInputChange}
                required
              >
                <option value="">Select Latitude</option>
                {latitudes.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="longitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                as="select"
                name="longitude"
                onChange={handleInputChange}
                required
              >
                <option value="">Select Longitude</option>
                {longitudes.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            </Form.Group>
            <Form.Group controlId="locationType">
              <Form.Label>Location Type</Form.Label>
              <Form.Control
                as="select"
                name="locationType"
                onChange={handleInputChange}
              >
                <option value="">Select Location Type</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                {/* Add other location type options */}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="timeframe">
              <Form.Label>Time Frame</Form.Label>
              <Form.Control
                as="select"
                name="timeframe"
                onChange={handleInputChange}
              >
                <option value="">Select Time Frame</option>
                <option value="30s">30s</option>
                <option value="60s">60s</option>
                <option value="90s">90s</option>
                {/* Add other timeframe options */}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="dataStorage">
              <Form.Label>Data Storage</Form.Label>
              <Form.Control
                as="select"
                name="dataStorage"
                onChange={handleInputChange}
              >
                <option value="">Select Data Storage</option>
                <option value="Local">Local</option>
                <option value="Cloud">Cloud</option>
                {/* Add other data storage options */}
              </Form.Control>
            </Form.Group>
            {/* Other form fields */}
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
    </div>
  );
}

export default DeviceTable;
