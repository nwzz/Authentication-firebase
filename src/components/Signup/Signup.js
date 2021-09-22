import React, { useState } from 'react';

import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import '../Login/Login.css';
import Login from '../Login/Login';


const Signup = () => {

let history = useHistory();
//let location = useLocation();

//let {form} = location.state || {form: {path:"/"}};

const [newUser, setNewUser] = useState({
    isSignedUp: false,
    name: '',
    email: '',
    photo: '',
    password: '',

});



const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }

    if(e.target.name === 'name'){
        isFieldValid = true;
    }

    if(e.target.name === 'phone'){
        const isPhnValid = e.target.value.length > 6;
        const phoneHasNumber =  /\d{1}/.test(e.target.value);
        isFieldValid = isPhnValid && phoneHasNumber;

    }
    if(isFieldValid){
      const newUserInfo = {...newUser};
      newUserInfo[e.target.name] = e.target.value;
      setNewUser(newUserInfo);
      console.log(newUserInfo);
      console.log(newUser);
    }
  }
        

const handleSubmit = (e) => {
    console.log('clicked');

    const auth = getAuth();
    const email = newUser.email;
    const password = newUser.password;

    createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
        const newUserInfo = {...newUser, isSignedUp: true};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setNewUser(newUserInfo);
        alert('Welcome!! You Successfully Signed Up ');
        history.push('/login');
        //updateUserName(newUser.name);
        //console.log(res.newUser);
    })
    .catch( error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Sorry, ${errorCode} Try again`);
        console.log(errorCode);
        console.log(errorMessage);
    })
    e.preventDefault();
}




    return (
        <div>
            <div className="container">
                <br /><br />
                <div className="text-center">
                    <h4><Link to={'/login/'}><span className="signin-link">SIGN IN </span> </Link>  | <Link to={'/signup/'}><span className="signup-link"> SIGN UP</span> </Link></h4>
                </div><br />
                
                { newUser.success && <h6 style={{color: 'green'}}>User { newUser.email ? 'created' : 'Logged In'} successfully Go to <Link to="/">Sign In</Link> Now</h6> }

                <div className="container d-flex justify-content-center ">
                    <div className="shadow p-3 mb-5 bg-body rounded" style={{ width: '750px', height: '550px', border: '1px solid white', padding: '5px' }}>
                        <div className="row">

                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <Form onSubmit={handleSubmit} >

                                    <div className="justify-content-start">
                                        <p>I am a:</p>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                            <label class="form-check-label" for="inlineRadio1">Student</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                            <label class="form-check-label" for="inlineRadio2">Parent</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                                            <label class="form-check-label" for="inlineRadio3">Tutor</label>
                                        </div>
                                    </div><br />

                                    <Form.Group controlId="formGroupName" onBlur={handleBlur}>
                                        <Form.Control type="name" name="name" placeholder="&#x10f0e0; Enter your Full Name" />
                                    </Form.Group> <br />

                                    <Form.Group controlId="formGroupEmail" onBlur={handleBlur}>
                                        <Form.Control type="email" name="email" placeholder="&#x10f0e0; Enter your email address" />
                                    </Form.Group> <br />

                                    <Form.Group controlId="formGroupPhone" onBlur={handleBlur}>
                                        <Form.Control type="phone" name="phone" placeholder="&#x10f0e0; Enter your Phone Number" />
                                    </Form.Group> <br />

                                    <Form.Group controlId="formGroupPassword" onBlur={handleBlur}>
                                        <Form.Control type="password" name="password" className="form-icon" placeholder="&#xf30d; Enter Your Password" />
                                    </Form.Group> <br />
                                    <div className="justify-content-start"> 

                                    <small>Already Have an Account? <Link to={'/login/'}><span className="signin-link">Sign In</span></Link> </small><br />
                                    <small>By creating an account you are agree to Tutory's user <span className="signin-link"><a href="#">Privacy Policy</a></span> and <span className="signin-link"><a href="#">Terms and Conditions</a></span>.</small>

                                    </div><br /><br />



                                    <Form.Group className="justify-content-end d-flex" >

                                      <input className="submit-btn btn" type="submit" value='Sign Up' />

                                    </Form.Group>
                                </Form>
                              </div>
                            <div className="col-md-3"></div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Signup;