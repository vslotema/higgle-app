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
    const logoSpan = document.getElementById(`${this.props.listName}_icon`);
    if (this.props.icon) logoSpan.classList.add("list-icon");
  }

  setItem = (e) => {
    e.preventDefault();
    this.setState({ item: e.target.value });
  };

  showItems = (items, listName) => {
    return (
      <div className="listitems-ul">
        <ul className="ul-listitems">
          {items.map((item) => {
            return (
              <ListItem
                key={Math.floor(Math.random() * 1000000)}
                onSendItem={item}
                onSendListName={listName}
                onSendPriority={this.props.onSendPriority}
                onDeleteLi={this.props.onDeleteLi}
                onScheduleLi={this.props.onScheduleLi}
                onChecked={this.props.onChecked}
              />
            );
          })}
        </ul>
      </div>
    );
  };

  scrollList = () => {
    console.log("scroll");
  };
  render() {
    return (
      <div
        className="list-container"
        id={this.props.listName}
        style={{
          transform: `translateX(${this.props.x}px)`,
          transition: "transform 0.5s ease",
        }}
        onWheel={() => this.scrollList()}
      >
        <div className="header-list">
          <p className="list-name">
            <span id={`${this.props.listName}_icon`}>
              {icons[this.props.icon]}
            </span>
            <span>{this.props.listName}</span>
          </p>
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

        {this.showItems(this.props.items, this.props.listName)}
      </div>
    );
  }
}

export default List;
