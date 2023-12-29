import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import UpdateDeviceTableModal from "../UpdateDeviceTableModal";

function DeviceDataTable() {
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  const [cameras, setCameras] = useState([]);
  const [cameraTypeFilter, setCameraTypeFilter] = useState(null);
  const [resolutionFilter, setResolutionFilter] = useState(null);

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

  const deleteCamera = (reqId) => {
    axios.delete(`${baseURL}/camera/${reqId}`)
      .then(response => {
        console.log("response: ", response.data);
        if (response.status === 200) {
          console.log("success");
          // Assuming fetchCameras is a function that updates the list of cameras
          fetchCameras(); 
        }
      })
      .catch(error => {
        console.log("error: ", error);
      });
  };
  const cameraTypeOptions = [
    { label: "All", value: null },
    { label: "DSLR", value: "DSLR" },
    { label: "Semi Rotating", value: "Semi Rotating" },
    // Add more camera type options as needed
  ];

  const resolutionOptions = [
    { label: "All", value: null },
    { label: "1080p", value: "1080p" },
    { label: "720p", value: "720p" },
    { label: "4k", value: "4k" },
    // Add more resolution options as needed
  ];

  const operationStatusTemplate = (rowData) => (
    <BootstrapSwitchButton
      type="checkbox"
      checked={rowData.operationStatus?.toLowerCase() === "online"}
      onChange={() => {}}
    />
  );

  const actionsTemplate = (rowData) => (
    <span>
      <Link 
        to={`/cameravideo?url=${encodeURIComponent(rowData.rtspMeLink)}&id=${encodeURIComponent(rowData._id)}`}
        className="button-link"
      >
        View
      </Link>{" "}
      <br />
      {/* The other actions remain as anchor tags if they are meant to navigate outside of the app */}
       <UpdateDeviceTableModal camera={rowData}></UpdateDeviceTableModal>
      <Button onClick={() => deleteCamera(rowData._id)} className="button-link">
        Delete
      </Button>

    </span>
  );

  return (
    <Container>
      <Link to="/controlConfigure">
        <Button variant="primary">Go to Control Configure</Button>
      </Link>
      <Row>
      <Col>
          <DataTable value={cameras} paginator rows={10}>
            <Column field="name" header="Camera Name" filter filterPlaceholder="Search by name" />
            <Column field="cameraType" header="Type" filter filterPlaceholder="Search by type" />
            <Column field="timeframes" header="Timeframes" filter filterPlaceholder="Search by timeframe" />
            <Column field="healthStatus" header="Health" filter filterPlaceholder="Search by health" />
            <Column field="resolution" header="Resolution" filter filterPlaceholder="Search by resolution" />
            {/* <Column field="dataStorage" header="Storage Location" filter filterPlaceholder="Search by storage location" /> */}
            <Column field="operationStatus" header="Operation Status" filter filterPlaceholder="Search by operation status" />
            <Column field="buildingName" header="Building" filter filterPlaceholder="Search by building" />
            <Column field="locationType" header="Location Type" filter filterPlaceholder="Search by location type" />
            <Column field="dataStorage" header="Storage" filter filterPlaceholder="Search by storage" />
            <Column body={actionsTemplate} header="Actions" filter={false} />
          </DataTable>
        </Col>
      </Row>
    </Container>
  );
}

export default DeviceDataTable;
