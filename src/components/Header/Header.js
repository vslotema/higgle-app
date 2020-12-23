import React, { Component } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import Logo from "../../icons/Logo";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

class Header extends Component {
  openMenu = () => {
    const navlist = document.getElementById("nav-list");
    navlist.classList.toggle("menu");
    const burger = document.getElementById("burger-menu");
    burger.style.display = "block";
  };

  closeMenu = () => {
    const navlist = document.getElementById("nav-list");
    navlist.classList.toggle("menu");
    const burger = document.getElementById("burger-menu");
    burger.style.display = "none";
  };

  checkIfMenu = () => {
    const navlist = document.getElementById("nav-list");
    if (navlist.classList.contains("menu")) this.closeMenu();
  };

  render() {
    return (
      <section className="header">
        <nav>
          <div className="logo">
            <Logo className="icon" />
            <h1>Higgle</h1>
          </div>
          <ul id="nav-list">
            <li>
              <NavLink
                to="/lists"
                className="link"
                activeClassName="selected"
                onClick={() => this.checkIfMenu()}
              >
                Lists
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/schedule"
                className="link"
                activeClassName="selected"
                onClick={() => this.checkIfMenu()}
              >
                Schedule
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className="link"
                activeClassName="selected"
                onClick={() => this.checkIfMenu()}
              >
                Settings
              </NavLink>
            </li>
          </ul>
          <GiHamburgerMenu className="burger" onClick={() => this.openMenu()} />
          <AiOutlineClose
            id="burger-menu"
            className="close-menu-btn"
            onClick={() => this.closeMenu()}
          />
        </nav>
      </section>
    );
  }
}

export default Header;
