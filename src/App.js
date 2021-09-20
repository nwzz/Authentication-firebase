import React from 'react';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup/Signup';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/signup/"> 
            <Signup></Signup>
          </Route>
          <Route path="/login/">
            <Login></Login>
          </Route>
          <Route exact path="/">
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
