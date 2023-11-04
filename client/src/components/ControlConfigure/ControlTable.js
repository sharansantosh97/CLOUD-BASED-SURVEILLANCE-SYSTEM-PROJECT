import { Table } from "react-bootstrap";
import { ToggleButton } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DeviceTable from "../DeviceTable";

function ControlTable() {
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    fetchCameras();
  }, []);

  const fetchCameras = () => {
    axios
      .get(`${baseURL}/camera`)
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

  const updateCamera = () => {};

  const deleteCamera = () => {};

  const addCamera = () => {};

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
    <>
    <DeviceTable></DeviceTable>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Camera Name</th>
          <th>Type</th>
          <th>Health</th>
          <th>Building</th>
          <th>Location Type</th>
          <th>Storage</th>
          <th>Actions</th>
          <th>Modes</th>
        </tr>
      </thead>
      <tbody>
        {cameras.map((camera) => (
          <tr key={camera._id}>
            <td>{camera.name}</td>
            <td>{camera.cameraType}</td>
            <td>{camera.healthStatus}</td>
            <td>{camera.buildingName}</td>
            <td>{camera.locationType}</td>
            <td>{camera.dataStorage}</td>
            <td>
              <BootstrapSwitchButton
                type="checkbox"
                checked={
                  camera.operationStatus?.toLowerCase() == "online"
                    ? true
                    : false
                }
                onChange={() => {
                  camera.action = !camera.isActive;
                }}
              />
            </td>
            <td>
              <a href="{camera.videoUrl}" class="button-link" target="_blank">
                View
              </a>{" "}
              <br></br>
              <a href="{camera.videoUrl}" class="button-link" target="_blank">
                Add
              </a>
              <a href="{camera.videoUrl}" class="button-link" target="_blank">
                Update
              </a>
              <a href="{camera.videoUrl}" class="button-link" target="_blank">
                Delete
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  );
}

export default ControlTable;
