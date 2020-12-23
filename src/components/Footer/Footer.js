import React, { Component } from "react";
import "./footer.scss";
import { NavLink } from "react-router-dom";
import { BsCardChecklist } from "react-icons/bs";
import { AiFillCalendar } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";

class Footer extends Component {
  render() {
    return (
      <section className="footer">
        <nav>
          <ul id="nav-list">
            <li>
              <NavLink to="/lists" className="link" activeClassName="selected">
                <BsCardChecklist id="lists-logo" className="footer-logo" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/schedule"
                className="link"
                activeClassName="selected"
              >
                <AiFillCalendar id="calendar-logo" className="footer-logo" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className="link"
                activeClassName="selected"
              >
                <FiSettings id="settings-logo" className="footer-logo" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}

export default Footer;
