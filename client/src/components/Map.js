import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaVideo } from 'react-icons/fa';
import axios from 'axios';
import floorImage from "./floor.jpeg";
import { FaExclamationTriangle } from 'react-icons/fa';
import ImageWithIcons from './ImagewithCamera';

const MapComponent = ({ buildingId }) => {
  const [cameras, setCameras] = useState([]);
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchCameras();
  }, []);

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

  const getOperationStatusColor = (status) => {
    if (status === 'Online') {
      return 'success';
    } else if (status === 'Offline') {
      return 'danger';
    } else {
      return 'warning';
    }
  };

  const limitCameraName = (name) => {
    if (name.length > 7) {
      return name.substring(0, 7) + '...';
    }
    return name;
  };

  return (
    <ImageWithIcons imageUrl={floorImage} indoor={false} scale={0.9 } />
    // <div style={{ position: 'relative' }}>
    //   {/* Your map rendering code */}
   
    //   <img
    //                   src={floorImage}
    //                   style={{ opacity: 0.6 }}
    //                   alt="Map"
    //                   className="map-image"
    //                 />
    //                 <div className="building-markers">
    //                   {cameras.map((camera) => (
    //                     <Link
    //                       to="/cameravideo"
    //                       key={camera._id}
    //                       className={`camera-marker ${
    //                         camera.operationStatus?.toLowerCase() === "offline" ? "blinking" : ""
    //                       } text-${getOperationStatusColor(camera.operationStatus)} bg-dark`}
    //                       style={{
    //                         left: `${camera.location[0]}%`,
    //                         top: `${camera.location[1]}%`,
    //                       }}
    //                     >
    //                       {camera.operationStatus?.toLowerCase() === "offline" ? (
    //                         <>
    //                           <FaExclamationTriangle style={{ marginRight: '5px', color: 'red' }} />
    //                           <FaVideo style={{ marginRight: '5px', color: 'red' }} />
    //                         </>
    //                       ) : (
    //                         <FaVideo style={{ marginRight: '5px' }} />
    //                       )}
    //                       {limitCameraName(camera.name)}
    //                     </Link>
    //                   ))}
    //                 </div>
    // </div>
  );
};

export default MapComponent;
