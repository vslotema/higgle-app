import React, { Component } from "react";
import { IoMdAddCircle } from "react-icons/io";
import ListItem from "../Lists/Lists/ListItem";

class Day extends Component {
  state = {};

  componentDidMount() {
    this.setHeaderColor();
  }

  setHeaderColor = () => {
    const header = document.getElementById("header_" + this.props.date);
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
      default:
        break;
    }
  };

  showItems = (items, id) => {
    return (
      <ul>
        {items.map((item) => {
          return (
            <ListItem
              key={Math.floor(Math.random() * 1000000)}
              onSendItem={item}
              onSendListName={id}
              onSendPriority={this.props.onSendPriority}
              onDeleteLi={this.props.onDeleteLi}
              onScheduleLi={this.props.onScheduleLi}
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
        <div className="day-header" id={"header_" + this.props.date}>
          <p className="day-week">{this.props.day}</p>
          <p>{this.props.date}</p>
        </div>
        <div className="list-items">
          {this.showItems(this.props.items, this.props.date)}
        </div>

        <div className="day-footer">
          <form>
            <input
              id={"input_" + this.props.date}
              type="text"
              placeholder="Add your to do.."
              onChange={(e) => this.props.receiveNewItem(e)}
            />

            <button
              className="add-i-btn"
              id="add-item-btn"
              type="submit"
              onClick={(e) => this.props.onAddItem(e, this.props.date)}
            >
              <IoMdAddCircle className="add-item-icon" />
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Day;
