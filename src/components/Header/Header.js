import React, { Component } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import Logo from "../../icons/Logo";

class Header extends Component {
  render() {
    return (
      <section className="header">
        <nav>
          <div className="logo">
            <Logo className="icon"/>
            <h1>Higgle</h1>
          </div>
          <ul>
            <li>
              <NavLink to="/lists" className="link" activeClassName="selected">Lists</NavLink>
            </li>
            <li>
              <NavLink to="/schedule" className="link" activeClassName="selected">Schedule</NavLink>
            </li>
            <li>
              <NavLink to="/settings" className="link" activeClassName="selected">Settings</NavLink>
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}

export default Header;
