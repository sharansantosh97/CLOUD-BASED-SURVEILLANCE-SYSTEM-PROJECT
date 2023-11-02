import Login from "./components/Login/Login/login"
import Home from "./components/home"
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Form from "react-bootstrap/Form"
import DeviceManagement from "./components/DeviceManagement/DeviceManagement"
import { Switch } from "antd"
import NavBarLoggedIn from "./components/Navbar/NavBarLoggedIn"
import LeftNavBar from "./components/LeftNavBar/LeftNavBar"
import Col from "react-bootstrap/Col"
import { Nav, Navbar } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import ControlConfigure from "./components/ControlConfigure/ControlConfigure"
import Billing from "./components/Billing/Billing"
import Invoice from "./components/Billing/Invoice"
import React from "react"
import Monitor from "./components/Monitor/Monitor"
import ServiceRequest from "./components/serviceRequest/ServiceRequest"
import Alert from "./components/alerts/alert"
import AddUser from "./components/admin/AddUser"
import ViewAllUsers from "./components/admin/ViewAllUsers"
import ManageUsers from "./components/admin/ManageUsers"
import ViewServiceRequests from "./components/admin/ViewServiceRequests"
import AdminDashboard from "./components/admin/AdminDashboard"
import DataManagement from "./components/DataManagement/DataManagement"
import SurveillanceDashboard from "./components/stats/statsDashboard"
import FloorMap from "./components/FloorMap"
import CameraVideo from "./components/CameraVideo"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />}>
            {" "}
          </Route>

          <Route path='/home' element={<Dashboard />}>
            {" "}
          </Route>
          <Route path='/cameravideo' element={<CameraVideo />}>
            {" "}
          </Route>
          <Route
            path='/deviceManagement'
            element={<DeviceManagement />}
          ></Route>
          <Route
            path='/controlConfigure'
            element={<ControlConfigure />}
          ></Route>
          <Route path='/monitor' element={<Monitor />}></Route>

          <Route path='/service' element={<ServiceRequest />}></Route>
          <Route path='/stats' element={<SurveillanceDashboard />}></Route>
          <Route path='/alert' element={<Alert />}></Route>
          <Route path='/billing' element={<Billing />}></Route>

          <Route path='/invoice' element={<Invoice />}></Route>
          <Route path='/adminDashboard' element={<AdminDashboard />}></Route>
          <Route path='/floormap' element={<FloorMap />}></Route>
          <Route path='/addUser' element={<AddUser />}></Route>
          <Route path='/viewAllUsers' element={<ViewAllUsers />}>
            {" "}
          </Route>

          <Route path='/ManageUsers' element={<ManageUsers />}>
            {" "}
          </Route>

          <Route path='/viewRequests' element={<ViewServiceRequests />}>
            {" "}
          </Route>

          <Route path='/dataManagement' element={<DataManagement />}>
            {" "}
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
