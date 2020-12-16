import React, { Component } from "react";
import "./styles/Lists.scss";
import SearchBar from "./SearchBar";
import List from "./List";
import NewListForm from "./NewListForm/NewListForm";
import { handleCloseForm } from "./NewListForm/NewListForm";

class Lists extends Component {
  state = {
    newName: "",
    icon: null,
    lists: [],
  };

  showLists = () => {
    return this.state.lists.map((item) => {
      return (
        <List
          key={Date.now()}
          listName={item.name}
          icon={item.icon}
          onDelete={this.handleDeleteList}
        />
      );
    });
  };

  handleAddNewList() {
    const lists = this.state.lists.concat({
      name: this.state.newName,
      icon: this.state.icon,
    });
    this.setState({ lists });
  }

  handleDeleteList = (e) => {
    e.preventDefault();
    let item = e.target;
    while (item.classList[0] !== "list-container") {
      item = item.parentElement;
    }
    item.remove();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(`A new list called ${this.state.newName} has been submitted`);
    handleCloseForm();
    this.handleAddNewList();
  };

  handleName = (e) => {
    e.preventDefault();
    console.log("handleName ", e.target.value);
    this.setState({ newName: e.target.value });
  };

  handleIcon = (icon) => {
    console.log("icon has been received by Lists ", icon);
    this.setState({ icon });
    document.getElementById("icons").style.display = "none";
  };

  render() {
    return (
      <section className="lists-section">
        <>
          <div className="lists-container">
            <SearchBar />

            <div className="lists-box">{this.showLists()}</div>

            <NewListForm
              receiveSubmit={this.handleSubmit}
              receiveName={this.handleName}
              onSendIcon={this.handleIcon}
              icon={this.state.icon}
            />
          </div>
        </>
        <>
          <div className="piechart-container"></div>
        </>
      </section>
    );
  }
}

export default Lists;
