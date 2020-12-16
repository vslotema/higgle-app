import React, { Component } from "react";
import { AiOutlineClose, AiFillDelete, AiFillCalendar } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";

import { IconContext } from "react-icons";

import ListItem from "./ListItem";

class List extends Component {
  state = {
    item: "",
    items: [],
    id: 0,
  };

  addItem = (e) => {
    e.preventDefault();

    if (this.state.item !== "") {
      const items = this.state.items.concat(this.state.item);
      this.setState({ items });
      this.refreshInput();
    }
  };

  refreshInput = () => {
    console.log("new item class ", document.getElementsByClassName("new-item"));
    const input = document.getElementsByClassName("new-item");
    for (var i = 0; i < input.length; i++) {
      input[i].value = null;
    }
    this.setState({ item: "" });
  };

  setItem = (e) => {
    e.preventDefault();
    this.setState({ item: e.target.value });
  };

  showItems = () => {
    return this.state.items.map((item) => {
      return <ListItem onSendItem={item} />;
    });
  };

  render() {
    console.log("Items ", this.state.items);
    return (
      <div className="list-container">
        <div className="header-list">
          <span className="list-icon">{this.props.icon}</span>
          <span className="list-name">{this.props.listName}</span>
          <button
            className="lc-btn "
            id="delete-btn-list"
            type="submit"
            onClick={(e) => this.props.onDelete(e)}
          >
            <IconContext.Provider value={{ className: "delete-list-icon" }}>
              <AiOutlineClose />
            </IconContext.Provider>
          </button>
        </div>
        {this.showItems()}
        <form className="add-item-form">
          <input
            className="new-item"
            type="text"
            placeholder="Add new item.."
            onChange={(e) => this.setItem(e)}
          ></input>
          <button
            className="lc-btn"
            id="add-item-btn"
            type="submit"
            onClick={(e) => this.addItem(e)}
          >
            <IconContext.Provider value={{ className: "add-item-icon" }}>
              <IoMdAddCircle />
            </IconContext.Provider>
          </button>
        </form>
      </div>
    );
  }
}

export default List;
