import React, { useState, useEffect } from "react"
import Row from "react-bootstrap/Row"
import Form from "react-bootstrap/Form"
import NavBarLoggedIn from "../Navbar/NavBarLoggedIn"
import Col from "react-bootstrap/Col"
import LeftNavBar from "../LeftNavBar/LeftNavBar"
import Button from "react-bootstrap/Button"
import axios from "axios"
import { Modal } from "react-bootstrap"
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit"
import { Link } from "react-router-dom"

function DataManagement() {
  const [locations, setLocations] = useState([])
  const [cameraLocations, setCameraLocations] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [cameraId, setCameraId] = useState("")
  const [buildingName, setBuildingName] = useState("")
  const [cameraName, setCameraName] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchLocations() {
      const response = await axios.get("http://localhost:5001/building/getList")
      //console.log(response.data.buildingNames);
      setLocations(response.data.buildingNames)
    }
    fetchLocations()
  }, [])
  
  useEffect(() => {
    async function defaultVideoData() {
      await axios.get("http://localhost:5001/videoData").then((response) => setData(response.data.videoData))
    }
    defaultVideoData()
  }, [])

  useEffect(() => {
    async function fetchCamLocations() {
      const response = await axios.get("http://localhost:5001/camera/getList")
      //console.log(response.data.buildingNames);
      setCameraLocations(response.data.cameraNames)
    }
    fetchCamLocations()
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
          cameraName: cameraName,
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
              <h4>Retreive Video Data</h4>
            </Col>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Label style={{ marginTop: "5%" }}>
                  Please select the start date:
                </Form.Label>
                <Form.Control
                  type='date'
                  name='startDate'
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  style={{ marginTop: "7%" }}
                />
              </Col>
              <Col>
                <Form.Label style={{ marginTop: "5%" }}>
                  Please select the end date:
                </Form.Label>
                <Form.Control
                  type='date'
                  name='endDate'
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  style={{ marginTop: "7%" }}
                />
              </Col>
              {/* <Col>
                <Form.Label style={{ marginTop: "5%" }}>
                  Please enter the Camera ID you want feed from
                </Form.Label>
                <Form.Control
                  type='text'
                  name='description'
                  placeholder='Type in Camera ID'
                  value={cameraId}
                  onChange={(event) => setCameraId(event.target.value)}
                  style={{ marginTop: "7%", aspectRatio: "16:9" }}
                />
              </Col> */}
              <Col>
                <Form.Label style={{ marginTop: "5%" }}>
                  Please select the Camera Name
                </Form.Label>
                <Form.Control
                  as='select'
                  name='location'
                  value={cameraName}
                  onChange={(event) => setCameraName(event.target.value)}
                >
                  <option value=''>Select Camera Name</option>
                  {cameraLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col>
                <Form.Label style={{ marginTop: "5%" }}>
                  Please select the Building Name
                </Form.Label>
                <Form.Control
                  as='select'
                  name='location'
                  value={buildingName}
                  onChange={(event) => setBuildingName(event.target.value)}
                >
                  <option value=''>Select Building Name</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
            <Button variant='primary' type='submit' style={{ marginTop: "7%" }}>
              Submit
            </Button>
            <br />
            <br />
            <br />
          </Form>
          <MDBTable align='middle'>
            <MDBTableHead>
              <tr>
                {/* <th scope='col'>Camera ID</th>
                <th scope='col'>Building ID</th> */}
                 <th scope='col'>Camera Name</th>
                <th scope='col'>Building Name</th>
                <th scope='col'>Start Time</th>
                <th scope='col'>End Time</th>
                <th scope='col'>Date </th>
                <th scope='col'>Video </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {data.map((item) => (
                <tr>
                  {/* <td>
                    <p className='fw-normal mb-1'>{item.cameraId}</p>
                  </td>
                  <td>
                    <p className='fw-normal mb-1'>{item.buildingId}</p>
                  </td> */}
                  <td>
                    <p className='fw-normal mb-1'>{item.cameraName}</p>
                  </td>
                  <td>
                    <p className='fw-normal mb-1'>{item.buildingName}</p>
                  </td>
                  <td>
                    <p className='fw-normal mb-1'>{item.startTime}</p>
                  </td>
                  <td>
                    <p className='fw-normal mb-1'>{item.endTime}</p>
                  </td>
                  <td>
                    <p className='fw-normal mb-1'>{item.date}</p>
                  </td>
                  
                  <td>
  <MDBBadge className='rounded-pill' pill bg='primary' text='dark'>
    <a href={item.videoLink} target="_blank" rel="noopener noreferrer">
      <MDBBtn>View Video Feed</MDBBtn>
    </a>
  </MDBBadge>
</td>

                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </Col>
      </Row>
    </>
  )
}

export default DataManagement
