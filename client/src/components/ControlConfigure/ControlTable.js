import { Table } from "react-bootstrap";
import { ToggleButton } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DeviceTable from "../DeviceTable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Dropdown } from "primereact/dropdown";

function ControlTable() {
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  const [cameras, setCameras] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);

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

  const cameraTypeOptions = [
    { label: "All", value: null },
    // Add your camera type options here
  ];

  const resolutionOptions = [
    { label: "All", value: null },
    // Add your resolution options here
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
      <a href={rowData.videoUrl} className="button-link" target="_blank">
        View
      </a>{" "}
      <br />
      <a href={rowData.videoUrl} className="button-link" target="_blank">
        Add
      </a>{" "}
      <a href={rowData.videoUrl} className="button-link" target="_blank">
        Update
      </a>{" "}
      <a href={rowData.videoUrl} className="button-link" target="_blank">
        Delete
      </a>
    </span>
  );

  const headerFilter = (
    <input
      type="text"
      style={{ width: "100%" }}
      className="p-inputtext p-component"
      placeholder="Search"
      onChange={(e) => setGlobalFilter(e.target.value)}
    />
  );

  return (
    <Container>
      <DeviceTable></DeviceTable>
      <Row>
        <Col>
          <DataTable
            value={cameras}
            globalFilter={globalFilter}
            paginator
            rows={10}
          >
            <Column
              field="name"
              header="Camera Name"
              filter
              filterPlaceholder="Search by name"
            />
            <Column
              field="cameraType"
              header="Type"
              filter
            
            />
            <Column
              field="healthStatus"
              header="Health"
              filter
              filterPlaceholder="Search by health"
            />
            <Column
              field="resolution"
              header="Resolution"
              filter
            
            />
            <Column
              field="dataStorage"
              header="Storage Location"
              filter
              filterPlaceholder="Search by storage location"
            />
            <Column
              field="operationStatus"
              header="Operation Status"
              filter
              filterPlaceholder="Search by operation status"
            />
            <Column
              field="buildingName"
              header="Building"
              filter
              filterPlaceholder="Search by building"
            />
            <Column
              field="locationType"
              header="Location Type"
              filter
              filterPlaceholder="Search by location type"
            />
            <Column
              field="dataStorage"
              header="Storage"
              filter
              filterPlaceholder="Search by storage"
            />
            <Column
              body={operationStatusTemplate}
              header="Actions"
              filter={false}
            />
            {/* <Column body={actionsTemplate} header="Modes" filter={false} /> */}
          </DataTable>
        </Col>
      </Row>
    </Container>
  );
}

export default ControlTable;
