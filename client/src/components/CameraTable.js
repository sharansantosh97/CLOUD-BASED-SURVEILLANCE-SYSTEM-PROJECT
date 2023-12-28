// 

import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';

const CameraTable = (props) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const operationStatusBodyTemplate = (rowData) => {
    const color = rowData.operationStatus === 'Online' ? 'green' : 'red';
    return (
      <span style={{ color }}>
        {rowData.operationStatus}
      </span>
    );
  };

  const healthStatusBodyTemplate = (rowData) => {
    const color = rowData.healthStatus === 'Active' ? 'green' : 'red';
    return (
      <span style={{ color }}>
        {rowData.healthStatus}
      </span>
    );
  };

  const alertsBodyTemplate = (rowData) => {
    return (
      <ul>
        {rowData.alerts.map((alert, index) => (
          <li key={index}>{alert.name}</li>
        ))}
      </ul>
    );
  };

  const header = (
    <div>
      <h1>Camera Table</h1>
    </div>
  );

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const filterHeader = (
    <input
      type="text"
      className="p-inputtext p-component"
      placeholder="Search"
      onChange={(e) => setGlobalFilter(e.target.value)}
    />
  );

  return (
    <div className="datatable">
      <DataTable value={props.cameras} header={header} globalFilter={globalFilter} first={first} rows={rows}
        onPage={onPageChange} paginator rowsPerPageOptions={[5, 10, 20]}>
        <Column field="name" header="Name" filter filterPlaceholder="Search by name" filterMatchMode="contains" filterHeader={filterHeader} />
        <Column field="cameraType" header="Type" filter filterPlaceholder="Search by type" filterMatchMode="contains" filterHeader={filterHeader} />
        <Column field="healthStatus" header="Health" body={healthStatusBodyTemplate} filter filterPlaceholder="Search by health" filterMatchMode="contains" filterHeader={filterHeader} />
        <Column field="buildingName" header="Building" filter filterPlaceholder="Search by building" filterMatchMode="contains" filterHeader={filterHeader} />
        <Column field="locationType" header="Location Type" filter filterPlaceholder="Search by location type" filterMatchMode="contains" filterHeader={filterHeader} />
        <Column field="dataStorage" header="Storage" filter filterPlaceholder="Search by storage" filterMatchMode="contains" filterHeader={filterHeader} />
        <Column field="operationStatus" header="Operation Status" body={operationStatusBodyTemplate} filter filterPlaceholder="Search by operation status" filterMatchMode="contains" filterHeader={filterHeader} />
        <Column field="alerts" header="Alerts" body={alertsBodyTemplate} filter filterPlaceholder="Search by alerts" filterMatchMode="contains" filterHeader={filterHeader} />
      </DataTable>
    </div>
  );
};

export default CameraTable;
