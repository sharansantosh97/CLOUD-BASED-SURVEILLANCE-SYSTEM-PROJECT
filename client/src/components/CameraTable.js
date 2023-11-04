import React, { useState, useEffect } from "react"
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom"

  


const CameraTable = (props) => {
  const getOperationStatusColor = (status) => {
    if (status === "Online") {
      return "success"
    } else if (status === "Offline") {
      return "danger"
    } else {
      return "warning"
    }
  }

  console.log("CameraTable props: ", props.cameras)

    // const cameras = [
    //     {
    //       id: 1,
    //       camera_name: 'Camera 1',
    //       operation_status: 'Online',
    //       health_status: 'Healthy',
    //       building_name: 'SREC',
    //     },
    //     {
    //       id: 2,
    //       camera_name: 'Camera 2',
    //       operation_status: 'Offline',
    //       health_status: 'Unhealthy',
    //       building_name: 'Student Union',
    //     },
    //     {
    //       id: 3,
    //       camera_name: 'Camera 3',
    //       operation_status: 'Online',
    //       health_status: 'Healthy',
    //       building_name: 'Martin Luther King Library',
    //     },
    //     {
    //       id: 4,
    //       camera_name: 'Camera 4',
    //       operation_status: 'Offline',
    //       health_status: 'Unhealthy',
    //       building_name: 'Clark Building',
    //     },
    //     {
    //       id: 5,
    //       camera_name: 'Camera 5',
    //       operation_status: 'Online',
    //       health_status: 'Healthy',
    //       building_name: 'Spartan Complex',
    //     },
    //     {
    //       id: 6,
    //       camera_name: 'Camera 6',
    //       operation_status: 'Online',
    //       health_status: 'Unhealthy',
    //       building_name: 'MacQuarrie Hall',
    //     },
    //     {
    //       id: 7,
    //       camera_name: 'Camera 7',
    //       operation_status: 'Offline',
    //       health_status: 'Healthy',
    //       building_name: 'Duncan Hall',
    //     },
    //     {
    //       id: 8,
    //       camera_name: 'Camera 8',
    //       operation_status: 'Online',
    //       health_status: 'Healthy',
    //       building_name: 'Engineering Building',
    //     },
    //     {
    //       id: 9,
    //       camera_name: 'Camera 9',
    //       operation_status: 'Offline',
    //       health_status: 'Unhealthy',
    //       building_name: 'Business Tower',
    //     },
    //     {
    //       id: 10,
    //       camera_name: 'Camera 10',
    //       operation_status: 'Online',
    //       health_status: 'Healthy',
    //       building_name: 'Joe west Hall',
    //     },
    //   ];
      
      
  return (
    <Table striped bordered hover style={{marginTop:100}}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Health</th>
          <th>Building</th>
          <th>Location Type</th>
          <th>Storage</th>
          <th>Alerts</th>
        </tr>
      </thead>
      <tbody>
        {props.cameras.map((camera) => (
          <tr key={camera._id}>
              
            <td>
            <Link
                to='/cameravideo'
                key={camera._id}
                className=""
               
              >
                {camera.name}
              </Link>
  
             </td>
             <td>{camera.cameraType}</td>
            <td>{camera.healthStatus}</td>
            <td>{camera.buildingName}</td>
            <td>{camera.locationType}</td>
            <td>{camera.dataStorage}</td>
            <td>{camera?.alerts?.map((alert) => alert?.name)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default CameraTable;
