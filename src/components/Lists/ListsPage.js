import React, { Component } from "react";
import "./styles/Lists.scss";
import SearchBar from "./SearchBar";
import List from "./List";
import NewListForm from "./NewListForm/NewListForm";
import { handleCloseForm } from "./NewListForm/NewListForm";
import { showPriority, showChecked } from "./functions/showPriorityandChecked";

class ListsPage extends Component {
  state = {
    newName: "",
    icon: null,
    lists: [],
  };

  componentDidMount() {
    const lists = JSON.parse(localStorage.getItem("lists"));
    if (lists) this.setState({ lists });
  }

  componentDidUpdate() {
    console.log("Component did update", this.state.lists);
    localStorage.setItem("lists", JSON.stringify(this.state.lists));
    this.state.lists.map((list) => {
      list.items.map((item) => {
        showPriority(list.name, item);
        showChecked(list.name, item);
      });
    });
  }

  handleAddNewList() {
    const lists = this.state.lists;
    if (lists.every((list) => list.name !== this.state.newName)) {
      const lists = this.state.lists.concat({
        name: this.state.newName,
        icon: this.state.icon,
        items: [],
      });
      localStorage.setItem("lists", JSON.stringify(lists));
      this.setState({ lists });
    }
  }

  handleDeleteList = (e, nameList) => {
    const lists = this.state.lists.filter((l) => l.name !== nameList);

    this.setState({ lists });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    handleCloseForm();
    this.handleAddNewList();
  };

  handleName = (e) => {
    e.preventDefault();
    this.setState({ newName: e.target.value });
  };

  handleIcon = (icon) => {
    this.setState({ icon });
    document.getElementById("icons").style.display = "none";
  };

  handleAddItem = (e, nameList, item) => {
    e.preventDefault();
    const lists = this.state.lists;
    const items = lists.filter((l) => l.name === nameList)[0].items;
    console.log("items ", items);
    if (item !== "" && items.every((i) => i.item !== item)) {
      const itemInfo = { item: item, priority: "neutral", checked: false };
      items.push(itemInfo);
      this.setState({ lists });
    }
    this.refs.list.refreshInput();
  };

  handleDeleteLi = (nameList, nameItem) => {
    const lists = this.state.lists;
    lists.map((l) => {
      if (l.name === nameList) {
        const itemsList = l.items.filter((item) => item.item !== nameItem);
        l.items = itemsList;
      }
      return l;
    });

    this.setState({ lists });
  };

  handleChecked = (nameList, nameItem) => {
    console.log("handle check");
    console.log(`nameList: ${nameList} nameItem: ${nameItem}`);
    const lists = this.state.lists;
    lists.map((l) => {
      if (l.name === nameList) {
        l.items.map((i) => {
          if (i.item === nameItem) i.checked = !i.checked;
        });
      }
      return l;
    });

    this.setState({ lists });
    /* let item = e.target;
    let check;
    while (item.classList[0] !== "item-container") {
      if (item.classList[0] === "checkbox") check = item.children[1];
      item = item.parentElement;
    }
    const text = item.children[1];

    //item.checked = !item.checked;
    check.classList.toggle("checked");
    text.classList.toggle("checked-text");

    console.log("item.checked ", check);
    console.log("text ", text);*/
  };
  onAddPriorityToList = (priority, nameItem, nameList) => {
    const lists = this.state.lists;
    lists.map((l) => {
      if (l.name === nameList) {
        l.items.map((i) => {
          if (i.item === nameItem) i.priority = priority;
        });
      }
      return l;
    });

    this.setState({ lists });
  };

  showLists = () => {
    return this.state.lists.map((list) => {
      return (
        <List
          ref="list"
          key={Math.floor(Math.random() * 1000000)}
          listName={list.name}
          icon={list.icon}
          items={list.items}
          addItem={this.handleAddItem}
          onDelete={this.handleDeleteList}
          onSendPriority={this.onAddPriorityToList}
          onDeleteLi={this.handleDeleteLi}
          onChecked={this.handleChecked}
        />
      );
    });
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

export default ListsPage;
