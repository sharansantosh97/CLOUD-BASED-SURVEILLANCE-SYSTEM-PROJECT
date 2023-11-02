import Container from "react-bootstrap/Container";
import {Modal, Nav, Navbar, Spinner, Table} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import ControlConfigureRow from "./ControlConfigureRow";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import NavBarLoggedIn from "../Navbar/NavBarLoggedIn";
import LeftNavBar from "../LeftNavBar/LeftNavBar";
import Home from "../home";
import ControlTable from "./ControlTable";


const ControlConfigure = ()=> {





    return <>

        <NavBarLoggedIn/>
        <Row>
            <Col lg={2}> <LeftNavBar/> </Col>
            <Col lg={10}>
                {}

                <Container style={{marginTop:"5%"}}>

                   <ControlTable></ControlTable>
                </Container>

            </Col>
        </Row>
        </>




}

export default ControlConfigure;




