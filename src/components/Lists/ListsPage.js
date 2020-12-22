import React, { Component } from "react";
import "./styles/Lists.scss";
import SearchBar from "./SearchBar";
import List from "./List";
import NewListForm from "./NewListForm";
import { handleCloseForm } from "./NewListForm";
import { showPriority, showChecked } from "./functions/showPriorityandChecked";
import { IoIosArrowForward } from "react-icons/io";
import { IconContext } from "react-icons";

class ListsPage extends Component {
  state = {
    newName: "",
    focus: "",
    icon: null,
    lists: [],
    x: 0,
    left: false,
    search: "",
  };

  componentDidMount() {
    const lists = JSON.parse(localStorage.getItem("lists"));
    if (lists) this.setState({ lists });
  }

  componentDidUpdate() {
    const input = document.getElementById("input_" + this.state.focus);
    console.log("input ", input);

    if (input) {
      input.value = "";
      input.focus();
    }

    console.log("Component did update", this.state.lists);
    localStorage.setItem("lists", JSON.stringify(this.state.lists));
    this.state.lists.map((list) => {
      list.items.map((item) => {
        showPriority(list.name, item);
        showChecked(list.name, item);
        return item;
      });
      return list;
    });
  }

  handleAddNewList() {
    const lists = this.state.lists;
    const name =
      this.state.newName.charAt(0).toUpperCase() + this.state.newName.slice(1);

    if (lists.every((list) => list.name !== this.state.newName)) {
      const lists = this.state.lists.concat({
        name: name,
        icon: this.state.icon,
        items: [],
      });
      localStorage.setItem("lists", JSON.stringify(lists));
      this.setState({ icon: null });
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
    if (item !== "" && items.every((i) => i.item !== item)) {
      const itemInfo = { item: item, priority: "neutral", checked: false };
      items.push(itemInfo);
      this.setState({ focus: nameList });
      this.setState({ lists });
    }
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
          return i;
        });
      }
      return l;
    });

    this.setState({ lists });
  };
  onAddPriorityToList = (priority, nameItem, nameList) => {
    const lists = this.state.lists;
    lists.map((l) => {
      if (l.name === nameList) {
        l.items.map((i) => {
          if (i.item === nameItem) i.priority = priority;
          return i;
        });
      }
      return l;
    });

    this.setState({ lists });
  };

  goLeft = (e) => {
    const move = 262;
    if (this.state.x < 0) {
      const x = this.state.x + move;
      this.setState({ x });
    }
  };

  goRight = (e) => {
    const move = 262;
    const max = move * (this.state.lists.length - 1);
    if (this.state.x > -max) {
      const x = this.state.x - move;

      this.setState({ x });
    }
  };

  showLists = () => {
    return this.state.lists.map((list) => {
      return (
        <List
          onRef={(ref) => (this.list = ref)}
          key={list.name}
          listName={list.name}
          icon={list.icon}
          items={list.items}
          addItem={this.handleAddItem}
          onDelete={this.handleDeleteList}
          onSendPriority={this.onAddPriorityToList}
          onDeleteLi={this.handleDeleteLi}
          onChecked={this.handleChecked}
          x={this.state.x}
        />
      );
    });
  };

  handleSearchChange = (e) => {
    console.log("handle search change ", e.target.value);
    const search = e.target.value;
    this.setState({ search });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    const find = this.state.search;
    const list = this.state.lists.filter((item) => item.name === find);
    const index = this.state.lists.indexOf(list[0]);
    const x = -(262 * index);
    console.log("index ", index);
    if (index !== -1) this.setState({ x });
  };
  render() {
    return (
      <section className="lists-section">
        <>
          <div className="lists-container">
            <SearchBar
              onChange={this.handleSearchChange}
              onSubmit={this.handleSearchSubmit}
            />

            <div className="lists-box" id="container-lists">
              {this.showLists()}
            </div>
            <IconContext.Provider value={{ className: "arrow-btn" }}>
              <button
                id="right-btn"
                onClick={() => this.goRight()}
                // onMouseMove={() => this.goRight()}
              >
                <IoIosArrowForward />
              </button>
              <button
                id="left-btn"
                onClick={() => this.goLeft()}
                //onMouseMove={(e) => this.goLeft()}
              >
                <IoIosArrowForward />
              </button>
            </IconContext.Provider>
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
