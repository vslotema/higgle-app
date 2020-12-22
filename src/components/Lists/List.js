import React, { Component } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { IconContext } from "react-icons";
import { icons } from "./Icons";

import ListItem from "./ListItem";

class List extends Component {
  state = {
    item: "",
  };

  componentDidMount() {
    this.props.onRef(this);
    //this.focusOnInputField();
  }

  /*
  focusOnInputField = () => {
    console.log("listname ", this.props.listName);
    const input = document.getElementById("input_" + this.props.listName);
    console.log("input ", input);
    input.value = "";
    input.focus();
  };

  refreshInput = () => {
    this.focusOnInputField();
    this.setState({ item: "" });
  };*/

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
    console.log("x ", this.props.x);
    return (
      <div
        className="list-container"
        id={this.props.listName}
        style={{
          transform: `translateX(${this.props.x}px)`,
          transition: "transform 0.5s ease",
        }}
      >
        <div className="header-list">
          <span className="list-icon">{icons[this.props.icon]}</span>
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
            id={"input_" + this.props.listName}
            className="new-item"
            type="text"
            placeholder="Add new to do.."
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
