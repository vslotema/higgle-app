import React, { Component } from "react";
import { IoMdAddCircle } from "react-icons/io";
import ListItem from "../Lists/Lists/ListItem";

class Day extends Component {
  state = {};

  componentDidMount() {
    this.setHeaderColor();
  }

  setHeaderColor = () => {
    const header = document.getElementById(this.props.day + "_header");
    console.log("header ", header);
    switch (this.props.day) {
      case "Monday":
        header.classList.add("mon");
        break;
      case "Tuesday":
        header.classList.add("tue");
        break;
      case "Wednesday":
        header.classList.add("wed");
        break;
      case "Thursday":
        header.classList.add("thu");
        break;
      case "Friday":
        header.classList.add("fri");
        break;
      case "Saturday":
        header.classList.add("sat");
        break;
      case "Sunday":
        header.classList.add("sun");
    }
  };

  showItems = (items, listName) => {
    return (
      <ul>
        {items.map((item) => {
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
        })}
      </ul>
    );
  };

  render() {
    return (
      <>
        <div className="day-header" id={this.props.day + "_header"}>
          <p className="day-week">{this.props.day}</p>
          <p>{"28/12/2020"}</p>
        </div>
        <ul className="list-items"></ul>
        <div className="day-footer">
          <form>
            <input type="text" placeholder="Add your to do.."></input>

            <button className="add-i-btn" id="add-item-btn" type="submit">
              <IoMdAddCircle className="add-item-icon" />
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Day;
