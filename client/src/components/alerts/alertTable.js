import React from 'react';
import { Table } from 'react-bootstrap';

const AlertTable = ({ alerts }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Alert ID</th>
          <th>Priority</th>
          <th>Detection</th>
          <th>Created Time</th>
        </tr>
      </thead>
      <tbody>
        {alerts.map(alert => (
          <tr key={alert.id}>
            <td>{alert.id}</td>
            <td>{alert.priority}</td>
            <td>{alert.detection}</td>
            <td>{alert.createdTime}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AlertTable;
