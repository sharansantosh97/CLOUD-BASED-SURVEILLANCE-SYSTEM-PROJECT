import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import axios from "axios";
import DeviceTable from "../DeviceTable";

function DeviceDataTable() {
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  const [cameras, setCameras] = useState([]);
  const [cameraTypeFilter, setCameraTypeFilter] = useState("");
  const [resolutionFilter, setResolutionFilter] = useState("");

  useEffect(() => {
    fetchCameras();
  }, []);

  const fetchCameras = () => {
    axios
      .get(`${baseURL}/camera`)
      .then((response) => {
        if (response.status === 200) {
          setCameras(response.data?.cameras);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const handleSwitchChange = (cameraId) => {
    const updatedCameras = cameras.map((camera) => {
      if (camera.id === cameraId) {
        return { ...camera, isActive: !camera.isActive };
      }
      return camera;
    });
    setCameras(updatedCameras);
  };

  const filterCameras = () => {
    return cameras.filter((camera) => {
      if (cameraTypeFilter && camera.cameraType !== cameraTypeFilter) {
        return false;
      }
      if (resolutionFilter && camera.resolution !== resolutionFilter) {
        return false;
      }
      return true;
    });
  };

  return (
    <>
      <DeviceTable></DeviceTable>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Filter by Camera Type:</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setCameraTypeFilter(e.target.value)}
                  value={cameraTypeFilter}
                >
                  <option value="">All</option>
                  <option value="DSLR">DSLR</option>
                  <option value="Semi Rotating">Semi Rotating</option>
                  {/* Add more camera type options as needed */}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Filter by Resolution:</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setResolutionFilter(e.target.value)}
                  value={resolutionFilter}
                >
                  <option value="">All</option>
                  <option value="1080p">1080p</option>
                  <option value="720p">720p</option>
                  <option value="4k">4k</option>
                  {/* Add more resolution options as needed */}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" onClick={fetchCameras}>
                Apply Filters
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Camera Name</th>
                  <th>Type</th>
                  <th>Health</th>
                  <th>Resolution</th>
                  <th>Storage Location</th>
                  <th>Operation Status</th>
                  <th>Building</th>
                  <th>Location Type</th>
                  <th>Storage</th>
                  <th>Actions</th>
                  <th>Modes</th>
                </tr>
              </thead>
              <tbody>
                {filterCameras().map((camera) => (
                  <tr key={camera._id}>
                    <td>{camera.name}</td>
                    <td>{camera.cameraType}</td>
                    <td>{camera.healthStatus}</td>
                    <td>{camera.resolution}</td>
                    <td>{camera.dataStorage}</td>
                    <td>{camera.operationStatus}</td>
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
                      <a href="{camera.videoUrl}" className="button-link" target="_blank">
                        View
                      </a>{" "}
                      <br />
                      <a href="{camera.videoUrl}" className="button-link" target="_blank">
                        Add
                      </a>
                      <a href="{camera.videoUrl}" className="button-link" target="_blank">
                        Update
                      </a>
                      <a href="{camera.videoUrl}" className="button-link" target="_blank">
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DeviceDataTable;
