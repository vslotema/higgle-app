import React, { Component } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";

import { IconContext } from "react-icons";

import ListItem from "./ListItem";

class List extends Component {
  state = {
    item: "",
  };

  refreshInput = () => {
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

  showItems = (items, listName) => {
    return items.map((item) => {
      return (
        <ListItem
          key={Math.floor(Math.random() * 1000000)}
          onSendItem={item}
          onSendListName={listName}
          onSendPriority={this.props.onSendPriority}
          onDeleteLi={this.props.onDeleteLi}
          onChecked={this.props.onChecked}
        />
      );
    });
  };

  render() {
    return (
      <div className="list-container">
        <div className="header-list">
          <span className="list-icon">{this.props.icon}</span>
          <span className="list-name">{this.props.listName}</span>
          <button
            className="lc-btn "
            id="delete-btn-list"
            type="submit"
            onClick={(e) => this.props.onDelete(e, this.props.listName)}
          >
            <IconContext.Provider value={{ className: "delete-list-icon" }}>
              <AiOutlineClose />
            </IconContext.Provider>
          </button>
        </div>
        {this.showItems(this.props.items, this.props.listName)}
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
            onClick={(e) =>
              this.props.addItem(e, this.props.listName, this.state.item)
            }
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
