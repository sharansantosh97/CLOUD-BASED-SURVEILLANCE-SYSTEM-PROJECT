import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";



import axios from "axios";
import {useState} from "react";
import {Alert} from "react-bootstrap";


const FormView = ()=> {

    const navigate = useNavigate();

let mes=false;
let errorMessage="";
const [error, setError] = useState(mes);

const [message, setMessage] = useState(errorMessage);

    const submitHandler = async(event)=>{

        event.preventDefault();

        const email = event.target.email.value;
        const pass = event.target.password.value;
        await authenticate(email,pass)

    }

    const authenticate = async(email, pass)=>{
       const response = await axios.post("http://localhost:5001/login",{
            email:email,
            password:pass
        });

       const data = response.data;

       if(data.status===200){
           // go to home

           sessionStorage.setItem('userId', data.userId);
           sessionStorage.setItem('userName', data.name);
           console.log(data.name);
           if(data.isAdmin)
               navigate("/viewAllUsers");
           else
             navigate("/home");
       }else{
           // display error.
            setMessage(response.data.message);
           setError(true);
       }

    }

    const displayError = (flag)=>{
        if(flag)
            return  <Container style={{marginTop:"5%"}}>
                <Alert key='danger' variant='danger'>
                    {message}
                </Alert>
            </Container>
        else <> </>
    }


    return (
        

        <div class="auth-wrapper">
        <div class="auth-content">
            <div class="auth-bg">
                <span class="r"></span>
                <span class="r s"></span>
                <span class="r s"></span>
                <span class="r"></span>
            </div>
            <div class="card">
                <div class="card-body text-center">
                    <div class="mb-4">
                        <i class="feather icon-unlock auth-icon"></i>
                    </div>
                    <h3 class="mb-4">Login</h3>
                    <Form onSubmit={submitHandler}>
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" placeholder="Email" name="email"></input>
                    </div>
                    <div class="input-group mb-4">
                        <input type="password" class="form-control" placeholder="password" name="password"></input>
                    </div>
                    <div class="form-group text-left">
                        <div class="checkbox checkbox-fill d-inline">
                            <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" checked=""></input>
                            <label for="checkbox-fill-a1" class="cr"> Save Details</label>
                        </div>
                    </div>
                  
                    <div class="form-group text-left">
                        <div class="checkbox checkbox-fill d-inline">
                            <select>
                                <option>Campus Admin</option>
                                <option>Campus Security Officer</option>
                            </select>
                            {/* <label for="checkbox-fill-a1" class="cr"> Save Details</label> */}
                        </div>
                    </div>
                    <br/>  <br/>
                    <button class="btn btn-primary shadow-2 mb-4" >Login</button>
                    </Form>
                    <p class="mb-2 text-muted">Forgot password? <a href="#">Reset</a></p>
                    <p class="mb-0 text-muted">Don’t have an account? <a href="#">Signup</a></p>
                </div>
                {displayError(error,message)}
            </div>
        </div>
    </div>

    );
}

export default FormView;
