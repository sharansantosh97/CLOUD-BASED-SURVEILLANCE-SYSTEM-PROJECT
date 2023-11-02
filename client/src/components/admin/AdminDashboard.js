import NavBarLoggedIn from "../Navbar/NavBarLoggedIn"
import { Container, Row, Col, Card } from "react-bootstrap"
import LeftNavBarAdmin from "./LeftNavBarAdmin/LeftNavBarAdmin"
import axios from "axios"
import React, { useState } from "react"
import NavBarLoggedInAdmin from "./NavbarAdmin/NavBarLoggedInAdmin"
import "./AddUser.css"
// import mapImage from "./map.jpeg"
import { color } from "@mui/system"
// import "./CampusViewPage.css"
import { Link } from "react-router-dom"

function AdminDashboard() {
  const buildings = [
    {
      id: 1,
      name: "Campus",
      cameras: [
        {
          id: 1,
          name: "Building 1",
          operationStatus: "Online",
          healthStatus: "Good",
          location: [50, 50],
        },
        {
          id: 2,
          name: "Building 2",
          operationStatus: "Online",
          healthStatus: "Excellent",
          location: [30, 40],
        },
        {
          id: 3,
          name: "Building 3",
          operationStatus: "Offline",
          healthStatus: "Needs Maintenance",
          location: [40, 30],
        },
        {
          id: 4,
          name: "Building 4",
          operationStatus: "Online",
          healthStatus: "Fair",
          location: [60, 40],
        },
      ],
    },
  ]

  const getOperationStatusColor = (status) => {
    if (status === "Online") {
      return "success"
    } else if (status === "Offline") {
      return "danger"
    } else {
      return "warning"
    }
  }

  return <></>
}

export default AdminDashboard
