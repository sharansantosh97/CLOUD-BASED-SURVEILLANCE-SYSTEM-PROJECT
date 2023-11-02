import { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function DeviceTable() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    name: '',
    buildingId: '',
    cameraType: '',
    resolution: '',
    location: '',
    operationStatus: '',
    healthStatus: ''
  });
  const [records,setRecords] =useState([]);

  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowAddModal = () => setShowAddModal(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
  };

  const handleAddRecord = () => {
    // Add code to add new record to data source
    console.log('Adding new record:', newRecord);
    setRecords([...records,newRecord]);
    console.log(records);
    handleCloseAddModal();
  };

  return (
   <div>
    <Button variant="primary" onClick={handleShowAddModal}>
        Add Record
      </Button>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
               name='name'
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="buildingId">
              <Form.Label>Building ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter building ID"
                name='buildingId'
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="cameraType">
              <Form.Label>Camera Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter camera type"
               name='cameraType'
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="resolution">
              <Form.Label>Resolution</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter resolution"
                name='resolution'
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                name='location'
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="operationStatus">
              <Form.Label>Operation Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter operation status"
             name='operationStatus'
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="healthStatus">
              <Form.Label>Health Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter health status"
                name='healthStatus'
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddRecord}>
                   Add Record
            </Button>
            </Modal.Footer>
            </Modal>
       {/* Table to display added records */}
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Name</th>
        <th>Building ID</th>
        <th>Camera Type</th>
        <th>Resolution</th>
        <th>Location</th>
        <th>Operation Status</th>
        <th>Health Status</th>
      </tr>
    </thead>
    <tbody>
      {records.map((record) => (
        <tr>
          <td>{record.name}</td>
          <td>{record.buildingId}</td>
          <td>{record.cameraType}</td>
          <td>{record.resolution}</td>
          <td>{record.location}</td>
          <td>{record.operationStatus}</td>
          <td>{record.healthStatus}</td>
        </tr>
      ))}
    </tbody>
  </Table>
   </div>
      
)};

export default DeviceTable;
