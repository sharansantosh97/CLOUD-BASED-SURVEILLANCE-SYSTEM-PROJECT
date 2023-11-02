
import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import Form from 'react-bootstrap/Form';
import NavBarLoggedIn from "../Navbar/NavBarLoggedIn";
import Col from "react-bootstrap/Col";
import LeftNavBar from "../LeftNavBar/LeftNavBar";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {Modal} from "react-bootstrap";


function ServiceRequest() {
    const [show, setShow] = useState(false);

    const handleClose = () => {

        setShow(false);
    }
    const handleShow = () => setShow(true);

    const submitHandler = async(event)=>{

        event.preventDefault();

        const device = "camera";
        const description = event.target.description.value;
        const location = event.target.location.value;
        const priority = event.target.priority.value;
        //unsetting value


      await submit(device,description, location, priority);
        event.target.description.value="";
        event.target.location.value="";
        event.target.priority.value="";

    }
    const submit = async(device, description, location, priority)=>{
        const response = await axios.post("http://localhost:5001/service",{
            device:"camera",
            userId:sessionStorage.getItem("userId"),
            description:description,
            location:location,
            priority:priority
        });

        handleShow();




    }
    return (<>
        <NavBarLoggedIn/>
        <Row>
            <Col lg={2}> <LeftNavBar/> </Col>
            <Col lg={10}>
                <Row>
                    <Col lg={4}></Col>
                    <Col lg={4} style={{marginTop:'2%'}} > <h4>Raise Maintenance Request</h4></Col>
                </Row>




            <Form onSubmit={submitHandler} style={{marginLeft:'30%'}}>

                {}
                <br/>
                {}


                <Row>
                    <Col lg={8}>
                       <Form.Label  style={{marginTop:'5%'}}>Please type the problem you are facing</Form.Label>
                        <Form.Control as="textarea"
                                      required
                                      type="text"
                                      name="description"
                                      placeholder="Type in problem here"
                                      style={{marginTop:'7%',aspectRatio:'16:9'}}


                        />
                        <Form.Label  style={{marginTop:'5%'}}>Please Enter Location</Form.Label>
                        <Form.Control as="textarea"
                                      required
                                      type="text"
                                      name="location"
                                      placeholder="Type in location here"
                                      style={{marginTop:'7%',aspectRatio:'16:9'}}


                        />
                        <Form.Label  style={{marginTop:'5%'}}>Please Enter Priority of the Request on a Scale of 1 - 5</Form.Label>
                        <Form.Control as="textarea"
                                      required
                                      type="text"
                                      name="priority"
                                      placeholder="Priority"
                                      style={{marginTop:'7%',aspectRatio:'16:9'}}


                        />
                    </Col>
                </Row>

                <Button variant="primary" type="submit" style={{marginTop:'7%'}} >
                    Submit
                </Button>


            </Form>






            </Col>
        </Row>




        <Modal show={show} onHide={handleClose}>
            <Modal.Header style={{ backgroundColor: "#3f4e67", color: "white" }}>
                <Modal.Title>Submitted</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontSize: "1.2rem", lineHeight: "1.5" }}>Thanks for submitting the service request. Please wait for it to be resolved</Modal.Body>
            <Modal.Footer style={{ backgroundColor: "#3f4e67", color: "#white" }}>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>





    </>);


}

export default ServiceRequest;
