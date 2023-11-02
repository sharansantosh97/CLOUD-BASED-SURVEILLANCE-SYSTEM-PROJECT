import React, { useState, useEffect } from "react"
import Row from "react-bootstrap/Row"
import Form from "react-bootstrap/Form"
import NavBarLoggedIn from "../Navbar/NavBarLoggedIn"
import Col from "react-bootstrap/Col"
import LeftNavBar from "../LeftNavBar/LeftNavBar"
import Button from "react-bootstrap/Button"
import axios from "axios"
import { Modal } from "react-bootstrap"
import AlertTable from './alertTable';
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit"


function Alert() {

  const dummyAlerts = [
    {
      id: 1,
      priority: 'High',
      detection: 'Intrusion',
      createdTime: '2022-05-01T14:30:00Z',
    },
    {
      id: 2,
      priority: 'Medium',
      detection: 'Intrusion',
      createdTime: '2022-05-02T08:15:00Z',
    },
    {
      id: 3,
      priority: 'Low',
      detection: 'Motion',
      createdTime: '2022-05-03T16:45:00Z',
    },
    {
      id: 4,
      priority: 'High',
      detection: 'Illegal Dumping',
      createdTime: '2022-05-04T21:20:00Z',
    },
    {
      id: 5,
      priority: 'Low',
      detection: 'Intrusion',
      createdTime: '2022-05-05T12:00:00Z',
    },
    {
      id: 6,
      priority: 'Medium',
      detection: 'Illegal Dumping',
      createdTime: '2022-05-06T17:30:00Z',
    },
  ];
  

  const [locations, setLocations] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [cameraId, setCameraId] = useState("")
  const [buildingName, setBuildingName] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchLocations() {
      const response = await axios.get("http://localhost:5001/building/getList")
      //console.log(response.data.buildingNames);
      setLocations(response.data.buildingNames)
    }
    fetchLocations()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .get("http://localhost:5001/videoData", {
        params: {
          startDate: startDate,
          endDate: endDate,
          cameraId: cameraId,
          buildingName: buildingName,
        },
      })
      .then((response) => setData(response.data.videoData))
      .catch((error) => console.log(error))
  }
  return (
    <>
      <NavBarLoggedIn />
      <Row>
        <Col lg={2}>
          {" "}
          <LeftNavBar />{" "}
        </Col>
        <Col
          lg={10}
          style={{
            width: 800,
            // marginLeft: 100,
            paddingLeft: 60,
            paddingRight: 60,
          }}
        >
          <Row>
            <Col lg={3}></Col>
            <Col lg={4} style={{ marginTop: "2%" }}>
              {" "}
              <h4>Alert Dashboard</h4>
            </Col>
          </Row>  
          <AlertTable alerts={dummyAlerts}/>
        </Col>
      </Row>
    </>
  )
}

export default Alert;
