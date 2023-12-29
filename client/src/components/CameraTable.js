import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';

const CameraTable = (props) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const operationStatusBodyTemplate = (rowData) => {
    const color = rowData.operationStatus?.toLowerCase() === 'online' ? 'green' : 'red';
    return (
      <span style={{ color }}>
        {rowData.operationStatus}
      </span>
    );
  };

  const healthStatusBodyTemplate = (rowData) => {
    const color = ['active', 'excellent']?.includes(rowData.healthStatus?.toLowerCase()) ? 'green' : 'red';
    return (
      <span style={{ color }}>
        {rowData.healthStatus}
      </span>
    );
  };

  const alertsBodyTemplate = (rowData) => {
    return (
      <ul>
        {rowData.alerts?.length > 0 ?rowData.alerts.map((alert, index) => (
          <li key={index}>{alert.name}</li>
        )): "No alerts"}
      </ul>
    );
  };

  const liveFeedTemplate = (camera) => {
    const url = `/cameravideo?url=${encodeURIComponent(camera?.rtspMeLink)}&id=${encodeURIComponent(camera?._id)}`;
    return (
      <Link to={url} className="live-feed-link">
        Live Feed
      </Link>
    );
  };

  const header = (
    <div>
      <h1>Camera Table</h1>
      <input
        type="text"
        className="p-inputtext p-component"
        placeholder="Search"
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
    </div>
  );

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="datatable">
      <DataTable value={props.cameras} header={header} globalFilter={globalFilter} first={first} rows={rows}
        onPage={onPageChange} paginator rowsPerPageOptions={[5, 10, 20]}>
        <Column field="name" header="Name" filter filterPlaceholder="Search by name" />
        <Column field="cameraType" header="Type" filter filterPlaceholder="Search by type" />
        <Column field="healthStatus" header="Health" body={healthStatusBodyTemplate} filter filterPlaceholder="Search by health" />
        <Column field="buildingName" header="Building" filter filterPlaceholder="Search by building" />
        <Column field="locationType" header="Location Type" filter filterPlaceholder="Search by location type" />
        <Column field="dataStorage" header="Storage" filter filterPlaceholder="Search by storage" />
        <Column field="timeframes" header="Timeframe" filter filterPlaceholder="Search by timeframe" />
        <Column field="operationStatus" header="Operation Status" body={operationStatusBodyTemplate} filter filterPlaceholder="Search by operation status" />
        <Column field="rtspMeLink" header="Live Feed" body={liveFeedTemplate} />
        <Column field="alerts" header="Alerts" body={alertsBodyTemplate} filter filterPlaceholder="Search by alerts" />
      </DataTable>
    </div>
  );
};

export default CameraTable;
