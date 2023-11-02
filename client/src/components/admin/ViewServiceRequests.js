


import Col from "react-bootstrap/Col";
import LeftNavBarAdmin from "./LeftNavBarAdmin/LeftNavBarAdmin";
import Row from "react-bootstrap/Row";
import {Form, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import NavBarLoggedIn from "../Navbar/NavBarLoggedIn";
import axios from "axios";
import NavBarLoggedInAdmin from "./NavbarAdmin/NavBarLoggedInAdmin";


function  ViewServiceRequests(){
    const val=[];

    const [data,setData] = useState(val);


    const resolveHandler= async(event)=>{

        // make api call to delete
        const reqId = event.target.name
        console.log(reqId);
        await axios.delete('http://localhost:5001/service/'+reqId);

        const newData = data.filter(d=>{
            if(d._id!=reqId)
                return d;
        });

        setData([...newData])

    }

    React.useEffect( () => {

        const call = async ()=>{


            let serviceData = await axios.get('http://localhost:5001/service');
            console.log(serviceData);

            serviceData = serviceData.data.service;


            setData([...serviceData]);
        }

        call()


    }, []);

return <>
    <NavBarLoggedInAdmin/>

    <Row>
        <Col lg={2}> <LeftNavBarAdmin/> </Col>
        <Col lg={10}>
            <h4 style={{textAlign:'center',marginTop:'5%'}}> Pending Maintenance Requests </h4>
            <Table striped bordered hover style={{marginTop:'5%'}}>
                <thead>
                <tr>
                    <th>Officer ID</th>
                    <th>Description</th>
                    <th>Request Time</th>
                    <th>Location</th>
                    <th>Priority</th>
                    <th>Resolution</th>
                    {/*<th>Created At</th>*/}

                </tr>
                </thead>
                <tbody>

                {
                    data.map(el=>{
                        return <tr id={el._id}>
                            <td>{el.userId}</td>
                            <td>{el.description}</td>
                            <td>{el.dateCreated}</td>
                            <td>{el.location}</td>
                            <td><button type="button" class={el.priority >= 3 ? 'btn btn-square btn-danger' : 'btn btn-square btn-warning'}>{el.priority}</button></td>
                            <td> <Button variant="success" onClick={resolveHandler} name={el._id}> Resolve Request</Button>{' '}  </td>
                        </tr>
                    })
                }
                </tbody>
            </Table>


        </Col>
    </Row>





</>

}


export default ViewServiceRequests;
