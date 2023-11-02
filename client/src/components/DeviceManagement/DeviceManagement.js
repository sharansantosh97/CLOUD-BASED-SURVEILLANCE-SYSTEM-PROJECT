
import Container from "react-bootstrap/Container";
import {Nav, Navbar, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import Login from "../Login/Login/login";
import Dashboard from "../Dashboard";


import Camera from "./Camera/Camera";

import LeftNavBar from "../LeftNavBar/LeftNavBar";

import NavBarLoggedIn from "../Navbar/NavBarLoggedIn";
import DeviceManagmentNavBar from "./DeviceManagmentNavBar";
import {useState} from "react";



const DeviceManagement = ()=>{


const location = useLocation();
const path = location.pathname.split('/')[2];

   



    return (
        <>

            <NavBarLoggedIn/>
            <Row>
                <Col lg={2}> <LeftNavBar/> </Col>
                <Col lg={10}>

                    <DeviceManagmentNavBar/>

                    <Camera/>

                </Col>
            </Row>







        </>

    );

}


export default DeviceManagement;
