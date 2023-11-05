import React, { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

const AlertTable = ({ alerts }) => {
  const [filterType, setFilterType] = useState(''); // State for the type filter
  const [filterPriority, setFilterPriority] = useState(''); // State for the priority filter

  // Apply filters to the alerts
  const filteredAlerts = alerts.filter((alert) => {
    if (filterType && alert.type !== filterType) {
      return false;
    }
    if (filterPriority && alert.priority !== filterPriority) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Type:</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setFilterType(e.target.value)}
            value={filterType}
          >
            <option value="">All</option>
            <option value="Motion">Motion</option>
            <option value="Sound">Sound</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Priority:</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setFilterPriority(e.target.value)}
            value={filterPriority}
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            {/* Add more priority options as needed */}
          </Form.Control>
        </Form.Group>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Alert ID</th>
            <th>Priority</th>
            <th>Type</th>
            <th>Timestamp</th>
           
            <th>Description</th>
            <th>Is Read</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlerts.map((alert) => (
            <tr key={alert._id}>
              <td>{alert._id}</td>
              <td>{alert.priority}</td>
              <td>{alert.type}</td>
              <td>{alert.timestamp}</td>
             
              <td>{alert.description}</td>
              <td>
                <BootstrapSwitchButton
                  checked={alert.isRead}
                  onlabel="Yes"
                  offlabel="No"
                  size="sm"
                  onstyle="success"
                  offstyle="danger"
                  onChange={() => {}}
                />
              </td>
              <td>{alert.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AlertTable;
