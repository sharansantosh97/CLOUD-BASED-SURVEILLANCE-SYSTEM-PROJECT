import { Table } from 'react-bootstrap';
import { useState } from 'react';
import {  ToggleButton } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

function ControlTable() {
  const [cameras, setCameras] = useState([
    { id: 1, name: 'Camera 1', isActive: true },
    { id: 2, name: 'Camera 2', isActive: false },
    { id: 3, name: 'Camera 3', isActive: true },
    { id: 4, name: 'Camera 4', isActive: false },
    { id: 5, name: 'Camera 5', isActive: true },
    { id: 6, name: 'Camera 6', isActive: false },
    { id: 7, name: 'Camera 7', isActive: true },
    { id: 8, name: 'Camera 8', isActive: false },
    { id: 9, name: 'Camera 9', isActive: true },
    { id: 10, name: 'Camera 10', isActive: false },
  ]);

  const handleSwitchChange = (cameraId) => {
    const updatedCameras = cameras.map((camera) => {
      if (camera.id === cameraId) {
        return { ...camera, isActive: !camera.isActive };
      }
      return camera;
    });
    setCameras(updatedCameras);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Camera ID</th>
          <th>Camera Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cameras.map((camera) => (
          <tr key={camera.id}>
            <td>{camera.id}</td>
            <td>{camera.name}</td>
            <td>
            <BootstrapSwitchButton
                type="checkbox"
                checked={camera.isActive}
                onChange={() => {
                  camera.action = !camera.isActive;
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ControlTable;
