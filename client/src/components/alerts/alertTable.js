import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

const AlertTable = ({ alerts }) => {
  const [filterType, setFilterType] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const priorityOptions = [
    { label: 'All', value: '' },
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];

  const typeOptions = [
    { label: 'All', value: '' },
    { label: 'Motion', value: 'Motion' },
    { label: 'Sound', value: 'Sound' },
  ];

  const priorityFilter = (value, filter) => {
    return value === filter || filter === '';
  };

  const typeFilter = (value, filter) => {
    return value === filter || filter === '';
  };

  const priorityFilterElement = (
    <Dropdown
      value={filterPriority}
      options={priorityOptions}
      onChange={(e) => setFilterPriority(e.value)}
      placeholder="All"
    />
  );

  const typeFilterElement = (
    <Dropdown
      value={filterType}
      options={typeOptions}
      onChange={(e) => setFilterType(e.value)}
      placeholder="All"
    />
  );

  const isReadSwitch = (rowData) => {
    return (
      <BootstrapSwitchButton
        checked={rowData.isRead}
        onlabel="Yes"
        offlabel="No"
        size="sm"
        onstyle="success"
        offstyle="danger"
        onChange={() => {}}
      />
    );
  };

  return (
    <div>
      <DataTable value={alerts} paginator rows={10} className="p-datatable-sm">
        <Column field="_id" header="Alert ID" filter filterMatchMode="contains" />
        <Column field="priority" header="Priority" filter  />
        <Column field="type" header="Type" filter  />
        <Column field="timestamp" header="Timestamp" />
        <Column field="description" header="Description" />
        <Column field="isRead" header="Is Read" body={isReadSwitch} />
        <Column field="status" header="Status" filter filterMatchMode="contains" />
      </DataTable>
    </div>
  );
};

export default AlertTable;
