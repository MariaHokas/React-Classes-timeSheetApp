import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Tunnit from './Tunnit';
import Opiskelija from './Opiskelija';


class Navigaatio extends Component {
  render() {
    return (
      <Router>
        <div className="nav_fix">
          <Navbar bg="dark" variant="dark" expand="lg" className="nav_nw">
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <ul className="navbar-nav">
                  {/* <App /> */}
                  <li className="nav-item"><Link className="nav-link" to={'/'}>Leimaus</Link></li>
                  <li className="nav-item"><Link className="nav-link" to={'/Opiskelija'}>Oppilaat</Link></li>              
                  {/* <li className="nav-item"><Link className="nav-link" to={'/NWProductFetch'}>Tuotteet</Link></li>
                  <li className="nav-item"><Link to={'/NWLoginsFetch'} className="nav-link">Logins</Link></li>
                  <li className="nav-item"><Link className="nav-link" to={'/TypicodeFetch'}>TypicodeFetch</Link></li>
                  <li className="nav-item"><Link className="nav-link" to={'/Viestit'}>Viestit</Link></li>
                  <li className="nav-item"><Link className="nav-link" to={'/Md5Salaus'}>Md5Salaus</Link></li>                     
                  <li className="nav-item"><Link className="nav-link" to={'/Dropdown'}>Dropdown</Link></li>                        */}
                </ul>

              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path='/' component={Tunnit} />
            <Route path='/Opiskelija' component={Opiskelija} />
            {/* <Route path='/TypicodeFetch' component={TypicodeFetch} />
            <Route path='/Viestit' component={Viestit} />
            <Route path='/Md5Salaus' component={Md5Salaus} />
            <Route path='/NWProductFetch' component={NWProductFetch} />          
            <Route path='/NWLoginsFetch' component={NWLoginsFetch} />
            <Route path='/Dropdown' component={Dropdown} />   */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Navigaatio;