import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Tunnit from './Tunnit';
import Opiskelija from './Opiskelija';
import Opettaja from './Opettaja';


class Navigaatio extends Component {
  render() {
    return (
      <Router>
        <div className="nav_fix">
          <Navbar bg="nav_nw" variant="dark" expand="lg" className="nav_nw">
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <ul className="navbar-nav">
                  {/* <App /> */}
                  <li className="nav-item"><Link className="nav-link" to={'/'}>Leimaus</Link></li>
                  <li className="nav-item"><Link className="nav-link" to={'/Opiskelija'}>Oppilaat</Link></li>              
                  <li className="nav-item"><Link className="nav-link" to={'/Opettaja'}>Opettaja</Link></li>                   
                </ul>

              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path='/' component={Tunnit} />
            <Route path='/Opiskelija' component={Opiskelija} />
            <Route path='/Opettaja' component={Opettaja} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Navigaatio;