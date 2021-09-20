import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import '../Login/Login.css';


const Signup = () => {

const [newUser, setNewUser] = useState(false);



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
    if(isFieldValid){
      const newUserInfo = {...newUser};
      newUserInfo[e.target.name] = e.target.value;
      setNewUser(newUserInfo);
    }
  }
        

    const handleSubmit = (e) => {
     const email = newUser.email;
     const password = newUser.password;
     const fullName = newUser.fullName;
     const phone = newUser.phone;


    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password, phone, fullName)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    }




    return (
        <div>
            <div className="container">
                <br /><br />
                <div className="text-center">
                    <h4><Link to={'/login/'}><span className="signin-link">SIGN IN </span> </Link>  | <Link to={'/signup/'}><span className="signup-link"> SIGN UP</span> </Link></h4>
                </div><br />

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
                                        <Form.Control type="name" placeholder="&#x10f0e0; Enter your Full Name" />
                                    </Form.Group> <br />

                                    <Form.Group controlId="formGroupEmail" onBlur={handleBlur}>
                                        <Form.Control type="email" placeholder="&#x10f0e0; Enter your email address" />
                                    </Form.Group> <br />

                                    <Form.Group controlId="formGroupPhone" onBlur={handleBlur}>
                                        <Form.Control type="phone" placeholder="&#x10f0e0; Enter your Phone Number" />
                                    </Form.Group> <br />

                                    <Form.Group controlId="formGroupPassword" onBlur={handleBlur}>
                                        <Form.Control type="password" className="form-icon" placeholder="&#xf30d; Enter Your Password" />
                                    </Form.Group> <br />
                                    <div className="justify-content-start"> 

                                    <small>Already Have an Account? <Link to={'/login/'}><span className="signin-link">Sign In</span></Link> </small><br />
                                    <small>By creating an account you are agree to Tutory's user <span className="signin-link">Privacy Policy</span> and <span className="signin-link">Terms and Conditions</span>.</small>

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