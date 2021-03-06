import React, { useState } from 'react';
import './Login.css';
import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Login.css';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import { Link } from 'react-router-dom';
import firebaseConfig from '../Firebase/firebase.config';
import { initializeApp } from "firebase/app";
import { faFacebookF, faGithub, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';






// Initialize Firebase
initializeApp(firebaseConfig);


const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
const gitProvider = new GithubAuthProvider();

const Login = () => {

  //const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })






  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        console.log(res.user)
        setUser(signedInUser);

      })
      .catch((error) => { console.log(error.message); });

  }








  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user};
     // console.log(newUserInfo);
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);

    }
  }





  const handleSubmit = (e) => {
    const auth = getAuth();
    const email = user.email;
    const password = user.password;
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        //console.log(res);
        //const { displayName, photoURL, email } = res.user;
        const newUserInfo = { ...user, isSignedIn: true };
        console.log(newUserInfo);
        setUser(newUserInfo);
        //console.log('sign in user info', res.user);
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
      });
      e.preventDefault(); 
  }





  const handleFbSignIn = () => {

    const auth = getAuth();
    signInWithPopup(auth, fbProvider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }

        console.log(res.user)
        setUser(signedInUser);

      })
      .catch((error) => { console.log(error.message); });
  }




  const handleGitSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, gitProvider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        console.log(res.user)
        setUser(signedInUser);

      })
      .catch((error) => { console.log(error.message); });
  }








  return (
    <div className="container">
      <br /><br />
      <div className="text-center">
        <h4><Link to={'/login/'}><span className="signup-link">SIGN IN </span> </Link>  | <Link to={'/signup/'}><span className="signin-link"> SIGN UP</span> </Link></h4>
      </div><br />
      {
        user.isSignedIn && <div>
          <h5>Welcome, {user.name}!</h5>
          <h6>Your email: <span className="text-primary">{user.email}</span></h6>
          <img src={user.photo} width='100px' alt="" />
        </div>
      }
      <br />
      <div className="container d-flex justify-content-center ">
        <div className="shadow p-3 mb-5 bg-body rounded" style={{ width: '750px', height: '450px', border: '1px solid white', padding: '10px' }}>
          <div className="row p-5 pt-15px">
            <div className="d-grid gap-3 justify-content-start col-md-5 mx-auto">
              <p className="">Sign in With Social Accounts</p>

              <button className="btn btn-font" onClick={handleGoogleSignIn} style={{ color: 'white', backgroundColor: 'rgb(211, 44, 14)', borderRadius: '20px' }}><FontAwesomeIcon className="font-awesome" icon={faGooglePlusG} size='2x'  /> Continue With Google</button>

              <button className="btn btn-font" onClick={handleFbSignIn} style={{ color: 'white', backgroundColor: 'blue', borderRadius: '20px'}}><FontAwesomeIcon className="font-awesome" icon={faFacebookF} size='2x'  /> Continue With Facebook</button>

              <button className="btn btn-font" onClick={handleGitSignIn} style={{ color: 'white', backgroundColor: 'rgb(14, 136, 136)', borderRadius: '20px', paddingLeft:'0px' }}><FontAwesomeIcon className="font-awesome" icon={faGithub} size='2x' /> Continue With GitHub</button><br />

              <p>Are You New? <Link to={'/signup/'}><span className="signin-link">Sign Up</span> </Link></p>
            </div>

            <div className="col-md-1">
              <div className="vl ms-3"></div><br />
              <p className="or">OR</p>
              <div className="vl ms-3"></div>
            </div>

            <div className="col-md-6 justify-content-start ">
              <Form onSubmit={handleSubmit} >
                <p className="">Sign In With Your Email and Password</p>
                <Form.Group controlId="formGroupEmail" onBlur={handleBlur}>
                  <Form.Control type="email" name="email" style={{ fontFamily: 'FontAwesome' }} placeholder="&#x10f0e0; Enter your email address" />
                </Form.Group> <br />
                <Form.Group controlId="formGroupPassword" onBlur={handleBlur}>
                  <Form.Control type="password" name="password" className="form-icon" placeholder="&#xf30d; Enter Your Password" />
                </Form.Group> <br />

                <div className="row ">
                  <div className="col-md-5 d-flex justify-content-start align-content-center my-auto">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label class="form-check-label" for="flexCheckDefault"><small className="checkbox">Remeber me</small>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-7 d-flex justify-content-end my-auto">
                    <a href="#"><span className="signin-link">Forgot Password</span></a>
                  </div>
                </div>


                <br /> <br /> <br />
                <Form.Group className="justify-content-end d-flex" >

                  <input className="submit-btn btn" type="submit" value='Sign In' />

                </Form.Group>
              </Form>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Login;