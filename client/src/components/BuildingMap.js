import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import { FaVideo, FaSearchPlus, FaSearchMinus } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

import { FaBuilding } from "react-icons/fa";

const BuildingMap = ({ imageUrl, cameraData, scale }) => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;
  const [iconCoordinates, setIconCoordinates] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(scale); // New state for zoom level
  const { buildingId } = useParams();
  
  const  getRandomElement = function(arr) {
    // if (arr && arr.length) {
    //     const randomIndex = Math.floor(Math.random() * arr.length);
    //     return arr[randomIndex];
    // }
    return [2310, 1300]; // or undefined, or any default value you prefer
}
  const location_data = [
    [785, 1742],
    [689, 629],
    [1506, 682],
    [1903, 707],
    [2310, 1063],
    [2128, 1359],
    [2261, 2069],
    [2011, 2959],
    [1474, 2549]
]

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
    fetchBuildings();
  }, [buildingId]);

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

  const handleImageClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    console.log("offsetX", offsetX);
    setClickedCoords({ x: offsetX, y: offsetY });
    setIconCoordinates([{ x: offsetX, y: offsetY }]);
    setShowAddModal(true);
  };

  const zoomIn = () => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel * 1.2); // Increase zoom by 20%
  };

  const zoomOut = () => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel / 1.2); // Decrease zoom by 20%
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
    if (status === "Online") {
      return "success";
    } else if (status === "Offline") {
      return "danger";
    } else {
      return "warning";
    }
  };

  const renderIcons = () => {
    const buildingsWithOutdoorCamera = buildings.map((building) => {
      // Find the first outdoor camera in this building
      const outdoorCamera = building?.cameras?.find(
        (camera) => camera?.locationType === "Outdoor"
      );

      // Return a new object with all properties of the building, plus the outdoorCamera
      return {
        ...building,
        outdoorCamera: outdoorCamera || null, // Set to null if no outdoor camera is found
      };
    });
    console.log("buildingsWithOutdoorCamera", buildingsWithOutdoorCamera);
    return buildingsWithOutdoorCamera.map((building, index) => {
      const { location } = building;
      const camera = building?.outdoorCamera;
      console.log(building, index);
      const rand = getRandomElement(location_data);
      return (
        <div
          key={index}
          style={{
            position: "absolute",
            left: location?.[0] ?? rand[0] * zoomLevel, // Adjust position based on zoom
            top: location?.[1] ?? rand[1] * zoomLevel, // Adjust position based on zoom
            transform: `scale(${2 * zoomLevel})`, // Keep icon size constant
          }}
        >
          <Link
            to="/cameravideo"
            key={camera?._id}
            className={`camera-marker ${
              camera?.operationStatus?.toLowerCase() === "offline"
                ? "blinking"
                : ""
            } text-${getOperationStatusColor(camera?.operationStatus)} bg-dark`}
            style={{
              scale: `${13 * zoomLevel}`,
              left: `${2310}%`,
              top: `${1063}%`,
            }}
          >
            {camera?.operationStatus?.toLowerCase() === "offline" ? (
              <>
                <FaExclamationTriangle
                  style={{ marginRight: "5px", color: "red" }}
                />
                <FaVideo style={{ marginRight: "5px", color: "red" }} />
              </>
            ) : (
              <FaVideo style={{ marginRight: "5px" }} />
            )}
          </Link>
          <Link
            to={`/floormap/${building._id}`}
            key={camera?._id}
            className={`camera-marker ${
              camera?.operationStatus?.toLowerCase() === "offline"
                ? "blinking"
                : ""
            } text-${getOperationStatusColor(camera?.operationStatus)} bg-dark`}
            style={{
              scale: `${13 * zoomLevel}`,
              left: `${2310}%`,
              top: `${1063}%`,
              marginLeft: "100px",
            }}
          >
            <FaBuilding style={{ marginRight: "5px" }} />
          </Link>
        </div>
      );
    });
  };

  return (
    <div style={{ position: "relative", overflow: "auto" }}>
      <div>
        <Button onClick={zoomIn}>
          <FaSearchPlus />
        </Button>
        <Button onClick={zoomOut}>
          <FaSearchMinus />
        </Button>
      </div>

      <div style={{ maxWidth: "100%" }}>
        <Image
          src={imageUrl}
          alt="main"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top left",
          }}
        />

        {renderIcons()}
      </div>
    </div>
  );
};

export default BuildingMap;
