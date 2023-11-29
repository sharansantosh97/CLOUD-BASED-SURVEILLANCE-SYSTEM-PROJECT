
import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import { FaVideo, FaSearchPlus, FaSearchMinus } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const ImageWithIcons = ({ imageUrl , cameraData , scale}) => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;
  const [iconCoordinates, setIconCoordinates] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(scale); // New state for zoom level
  const { buildingId } = useParams();
  const [newCamera, setNewCamera] = useState({
    name: "",
    buildingId: buildingId,
    cameraType: "",
    resolution: "",
    locationType: "",
    latitude: "",
    longitude: "",
    videoUrl: "",
    dataStorage: "",
    timeframe: "",
  });
  const [clickedCoords, setClickedCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
   fetchCameras();
    setBuildings(cameraData);

  }, [buildingId]);

  const fetchCameras = () => {
    axios.get(`${baseURL}/camera/filters`, { params: { buildingId } })
      .then((response) => {
        if (response.status === 200) {
          setCameras(response.data?.cameras);
        }
      })
      .catch((error) => {
        console.log('Error fetching cameras:', error);
      });
  };





  const handleImageClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    console.log("offsetX", offsetX);
    setClickedCoords({ x: offsetX, y: offsetY });
    setIconCoordinates([{ x: offsetX, y: offsetY }]);
    setShowAddModal(true);
  };

  const zoomIn = () => {
    setZoomLevel(prevZoomLevel => prevZoomLevel * 1.2); // Increase zoom by 20%
  };

  const zoomOut = () => {
    setZoomLevel(prevZoomLevel => prevZoomLevel / 1.2); // Decrease zoom by 20%
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCamera((prevCamera) => ({ ...prevCamera, [name]: value }));
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setIconCoordinates([]);
  };

  const getOperationStatusColor = (status) => {
    if (status === 'Online') {
      return 'success';
    } else if (status === 'Offline') {
      return 'danger';
    } else {
      return 'warning';
    }
  };

  const handleAddCamera = () => {
    setNewCamera((prevCamera) => ({
      ...prevCamera,
      location: [clickedCoords.x, clickedCoords.y],
    }));
    newCamera.location = [clickedCoords.x, clickedCoords.y];
     console.log(newCamera);
    axios
      .post(`${baseURL}/camera`, newCamera)
      .then((response) => {
        console.log("Success:", response.data);
        setCameras([...cameras, response.data]);
        setIconCoordinates([
          ...iconCoordinates,
          { x: clickedCoords.x, y: clickedCoords.y },
        ]);
      })
      .catch((error) => {
        console.error("Error adding camera:", error);
      });
    handleCloseAddModal();
  };

  const renderIcons = () => {
    return cameras.map((camera, index) => {
      const { location } = camera;
      return (
        <div
          key={index}
          style={{
            position: "absolute",
            left: location[0] * zoomLevel, // Adjust position based on zoom
            top: location[1] * zoomLevel, // Adjust position based on zoom
            transform: `scale(${2 *  zoomLevel})` // Keep icon size constant
          }}
        >
          <Link
                          to="/cameravideo/indoor"
                          key={camera._id}
                          className={`camera-marker ${
                            camera.operationStatus?.toLowerCase() === "offline" ? "blinking" : ""
                          } text-${getOperationStatusColor(camera.operationStatus)} bg-dark`}
                          style={{
                            left: `${camera.location[0]}%`,
                            top: `${camera.location[1]}%`,
                          }}
                        >
                          {camera.operationStatus?.toLowerCase() === "offline" ? (
                            <>
                              <FaExclamationTriangle style={{ marginRight: '5px', color: 'red' }} />
                              <FaVideo style={{ marginRight: '5px', color: 'red' }} />
                            </>
                          ) : (
                            <FaVideo style={{ marginRight: '5px' }} />
                          )}
                        
                        </Link>
        </div>
      );
    });
  };

  const cameraModal = <Modal show={showAddModal} onHide={handleCloseAddModal}>
    <Modal.Header closeButton>
      <Modal.Title>Add Camera</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="latitude">
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Latitude"
            name="latitude"
            value={clickedCoords.y}
            readOnly
            onChange={handleInputChange}
            required />
        </Form.Group>
        <Form.Group controlId="longitude">
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Longitude"
            name="longitude"
            value={clickedCoords.x}
            readOnly
            onChange={handleInputChange}
            required />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Camera Name"
            name="name"
            onChange={handleInputChange}
            required />
        </Form.Group>
        {/* <Form.Group controlId="buildingId">
      <Form.Label>Building</Form.Label>
      <Form.Control
        as="select"
        name="buildingId"
        onChange={handleInputChange}
        required
      >
        <option value="">Select Building</option>
        {buildings.map((building) => (
          <option key={building.id} value={building._id}>
            {building.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group> */}
        <Form.Group controlId="cameraType">
          <Form.Label>Camera Type</Form.Label>
          <Form.Control
            as="select"
            name="cameraType"
            onChange={handleInputChange}
            required
          >
            <option value="">Select Camera Type</option>
            <option value="Type A">Type A</option>
            <option value="Type B">Type B</option>
            {/* Add more camera types */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="resolution">
          <Form.Label>Resolution</Form.Label>
          <Form.Control
            as="select"
            name="resolution"
            onChange={handleInputChange}
            required
          >
            <option value="">Select Resolution</option>
            <option value="4K">4K</option>
            <option value="1080P">1080P</option>
            <option value="720P">720P</option>
            {/* Add more resolution options */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="locationType">
          <Form.Label>Location Type</Form.Label>
          <Form.Control
            as="select"
            name="locationType"
            onChange={handleInputChange}
            required
          >
            <option value="">Select Location Type</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            {/* Add more location type options */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="videoUrl">
          <Form.Label>Video URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Video URL"
            name="videoUrl"
            onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="dataStorage">
          <Form.Label>Data Storage</Form.Label>
          <Form.Control
            as="select"
            name="dataStorage"
            onChange={handleInputChange}
            required
          >
            <option value="">Select Data Storage</option>
            <option value="Local">Local</option>
            <option value="Cloud">Cloud</option>
            {/* Add more data storage options */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="timeframe">
          <Form.Label>Time Frame</Form.Label>
          <Form.Control
            as="select"
            name="timeframe"
            onChange={handleInputChange}
            required
          >
            <option value="">Select Time Frame</option>
            <option value="30s">30s</option>
            <option value="60s">60s</option>
            <option value="90s">90s</option>
            {/* Add more timeframe options */}
          </Form.Control>
        </Form.Group>
        {/* Other camera details */}
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseAddModal}>
        Close
      </Button>
      <Button variant="primary" onClick={handleAddCamera}>
        Add Camera
      </Button>
    </Modal.Footer>
  </Modal>;
  return (
    <div style={{ position: "relative",overflow: "auto"}}>
      <div>
        <Button onClick={zoomIn}><FaSearchPlus /></Button>
        <Button onClick={zoomOut}><FaSearchMinus /></Button>
      </div>
      {cameraModal}

      <div style={{ maxWidth: "100%"}}>
        <Image
          src={imageUrl}
          alt="main"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
          onClick={handleImageClick}
        />

        {renderIcons()}
      </div>
      
    </div>
  );
};

export default ImageWithIcons;
