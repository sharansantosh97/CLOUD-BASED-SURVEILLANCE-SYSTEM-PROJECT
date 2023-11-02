import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom"

  


function CameraTable() {
  const getOperationStatusColor = (status) => {
    if (status === "Online") {
      return "success"
    } else if (status === "Offline") {
      return "danger"
    } else {
      return "warning"
    }
  }
    const cameras = [
        {
          id: 1,
          camera_name: 'Camera 1',
          operation_status: 'Online',
          health_status: 'Healthy',
          building_name: 'SREC',
        },
        {
          id: 2,
          camera_name: 'Camera 2',
          operation_status: 'Offline',
          health_status: 'Unhealthy',
          building_name: 'Student Union',
        },
        {
          id: 3,
          camera_name: 'Camera 3',
          operation_status: 'Online',
          health_status: 'Healthy',
          building_name: 'Martin Luther King Library',
        },
        {
          id: 4,
          camera_name: 'Camera 4',
          operation_status: 'Offline',
          health_status: 'Unhealthy',
          building_name: 'Clark Building',
        },
        {
          id: 5,
          camera_name: 'Camera 5',
          operation_status: 'Online',
          health_status: 'Healthy',
          building_name: 'Spartan Complex',
        },
        {
          id: 6,
          camera_name: 'Camera 6',
          operation_status: 'Online',
          health_status: 'Unhealthy',
          building_name: 'MacQuarrie Hall',
        },
        {
          id: 7,
          camera_name: 'Camera 7',
          operation_status: 'Offline',
          health_status: 'Healthy',
          building_name: 'Duncan Hall',
        },
        {
          id: 8,
          camera_name: 'Camera 8',
          operation_status: 'Online',
          health_status: 'Healthy',
          building_name: 'Engineering Building',
        },
        {
          id: 9,
          camera_name: 'Camera 9',
          operation_status: 'Offline',
          health_status: 'Unhealthy',
          building_name: 'Business Tower',
        },
        {
          id: 10,
          camera_name: 'Camera 10',
          operation_status: 'Online',
          health_status: 'Healthy',
          building_name: 'Joe west Hall',
        },
      ];
      
      
  return (
    <Table striped bordered hover style={{marginTop:100}}>
      <thead>
        <tr>
          <th>camera_name</th>
          <th>operation_status</th>
          <th>health_status</th>
          <th>building_name</th>
        </tr>
      </thead>
      <tbody>
        {cameras.map((camera) => (
          <tr key={camera.id}>
              
            <td>
            <Link
                to='/cameravideo'
                key={camera.id}
                className=""
               
              >
                {camera.camera_name}
              </Link>
  
             </td>
            <td>{camera.operation_status}</td>
            <td>{camera.health_status}</td>
            <td>{camera.building_name}</td>
            
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default CameraTable;
