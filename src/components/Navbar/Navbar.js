import React from 'react';
import '../Login/Login.css';
import { Link } from 'react-router-dom';

const Navbar = () => {

const handleNavSignIn = () =>{
    return(
        <Link to="/login/"></Link>
    )
}

const handleNavSignUp =() =>{
    <Link to='/signup'></Link>
}


    return (
        <div className="container">
            <div class="navbar navbar-expand-lg navbar-light bg-light height-nav">
                <div class="container-fluid row ">
                    <div className="col-md-2"><a class="navbar-brand" href="/">Online Coaching</a></div>
                    
                    <div class="collapse navbar-collapse col-md-7 justify-content-around" id="navbarText">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active signin-link" href="#"><h5 className="signin-link">CLASSES</h5></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active signin-link" href="#"><h5 className="signin-link">SUBJECTS</h5></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active signin-link" href="#"><h5 className="signin-link">TUTOR</h5></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" href="#"><h5 className="signin-link">STUDENTS</h5></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active signin-link" href="#"><h5 className="signin-link">PARENTS</h5></a>
                            </li>
                        </ul>
                        
                    </div>
                    <div className="col-md-3 d-flex gap-3">
                    <Link to="/"><span className="btn nav-btn">Sign In</span></Link>
                    <Link to="/signup/"><span className="btn nav-btn">Sign Up</span></Link>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Navbar;