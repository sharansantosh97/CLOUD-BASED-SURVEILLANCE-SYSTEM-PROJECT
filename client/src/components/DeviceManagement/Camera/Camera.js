import {Modal, Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {useState} from "react";
import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DeviceManagement from "../DeviceManagement";
import Form from "react-bootstrap/Form";
import DeviceTable from "../../DeviceTable";



const Camera=()=>{


    return <Container style={{marginTop:"5%"}}>
{}

<DeviceTable></DeviceTable>
    </Container>
}




export default Camera;
