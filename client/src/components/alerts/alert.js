import React, { useState, useEffect } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import LeftNavBar from "../LeftNavBar/LeftNavBar"
import AlertTable from "./alertTable"
import axios from "axios"
import NavBarLoggedIn from "../Navbar/NavBarLoggedIn"

function Alert() {
  const [alerts, setAlerts] = useState([])
  const [locations, setLocations] = useState("")

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await axios.get(
          "http://localhost:5001/building/getList"
        )
        setLocations(response.data.buildingNames)
      } catch (error) {
        console.error("Error fetching locations:", error)
      }
    }

    async function fetchAlerts() {
      try {
        const response = await axios.get("http://localhost:5001/alert") // Updated to the new alert endpoint
        setAlerts(response.data.alerts)
      } catch (error) {
        console.error("Error fetching alerts:", error)
      }
    }

    fetchLocations()
    fetchAlerts()
  }, [])

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
          <AlertTable alerts={alerts} />
        </Col>
      </Row>
    </>
  )
}

export default Alert
