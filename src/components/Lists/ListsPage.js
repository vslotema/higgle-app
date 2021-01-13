import React, { Component } from "react";
import "./styles/Lists.scss";
import SearchBar from "./Lists/SearchBar";
import List from "./Lists/List";
import NewListForm from "./Lists/NewListForm";
import { handleCloseForm } from "./Lists/NewListForm";
import { showPriority, showChecked } from "./Lists/showPriorityandChecked";
import { IoIosArrowForward } from "react-icons/io";
import { IconContext } from "react-icons";
import DonutPieChart from "../PieChart/DonutPieChart";
import { calculateTotalCheckedPercentage } from "../PieChart/CheckedPercentage";

let X = 0;
let startX = 0;

class ListsPage extends Component {
  state = {
    newName: "",
    focus: "",
    icon: null,
    lists: [],
    x: 0,
    left: false,
    search: "",
    checkedPercentage: 0,
  };

  getPercentage() {
    const p = calculateTotalCheckedPercentage();
    if (p !== this.state.checkedPercentage)
      this.setState({ checkedPercentage: p });
    return p;
  }

  componentDidMount() {
    const lists = JSON.parse(localStorage.getItem("lists"));
    if (lists) this.setState({ lists });
    this.setState({ checkedPercentage: calculateTotalCheckedPercentage() });
  }

  componentDidUpdate() {
    const input = document.getElementById("input_" + this.state.focus);

    if (input) {
      input.value = "";
      input.focus();
    }

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

  handleChangeFocus = (focus) => {
    this.setState({ focus });
  };

  /********************* LIST *********************************************************/
  handleAddNewList() {
    const lists = this.state.lists;
    const name =
      this.state.newName.charAt(0).toUpperCase() + this.state.newName.slice(1);

    if (lists.every((list) => list.name !== this.state.newName)) {
      const lists = this.state.lists.concat({
        name: name,
        icon: this.state.icon,
        items: [],
        schedule: "",
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

  /****************** LIST ITEMS ***********************************************************/
  handleAddItem = (e, nameList, item) => {
    e.preventDefault();

    const lists = this.state.lists;
    const items = lists.filter((l) => l.name === nameList)[0].items;
    if (item !== "" && items.every((i) => i.item !== item)) {
      const itemInfo = {
        item: item,
        priority: "neutral",
        checked: false,
        schedule: "",
      };
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

  handleScheduleLi = (date, nameList, nameItem) => {
    if (date) {
      var found = false;
      const transferItem = this.findRightTransferItem(nameList, nameItem);
      var agenda = JSON.parse(localStorage.getItem("agenda"));

      if (agenda) {
        agenda = agenda.map((list) => {
          if (new Date(list.date).toLocaleDateString("en-GB") === new Date(date).toLocaleDateString("en-GB")) {
            found = true;
            list.items.push(transferItem);
          }
          return list;
        });

        if (!found)
          agenda = agenda.concat({ date: date, items: [transferItem] });

        localStorage.setItem("agenda", JSON.stringify(agenda));
      }
    }
  };

  findRightTransferItem = (nameList, nameItem) => {
    const list = this.state.lists.filter((list) => list.name === nameList);
    const icon = list[0].icon;
    const item = list[0].items.filter((i) => i.item === nameItem);
    const transferItem = {
      item: item[0].item,
      priority: item[0].priority,
      checked: item[0].checked,
      icon: icon,
    };

    return transferItem;
  };

  handleChecked = (nameList, nameItem) => {
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

  /***********  SEARCHBAR ******************************************************************/
  handleSearchChange = (e) => {
    const search = e.target.value;
    this.setState({ search });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    const find =
      this.state.search.charAt(0).toUpperCase() + this.state.search.slice(1);
    const list = this.state.lists.filter((item) => item.name === find);
    const index = this.state.lists.indexOf(list[0]);
    const move = document.getElementsByClassName("list-container")[0]
      .offsetWidth;
    const x = -(move * index);
    if (index !== -1) this.setState({ x });
    document.getElementById("searchbar_form").value = "";
  };

  /***************************  SCROLL THROUGH LIST *******************/

  handleStart = (e) => {
    startX = e.touches[0].screenX;
  };

  handleMove = (e) => {
    X = e.touches[0].screenX;
  };

  handleMoveEnd = (e) => {
    if (startX && X) {
      const difference = startX - X;
      switch (true) {
        case difference < -90:
          this.goLeft();
          break;
        case difference > 90:
          this.goRight();
          break;
        default:
          break;
      }
    }
  };

  goLeft = () => {
    const move = document.getElementsByClassName("list-container")[0]
      .offsetWidth;
    if (this.state.x < 0) {
      const x = this.state.x + move;
      this.setState({ x });
    }
  };

  goRight = () => {
    const move = document.getElementsByClassName("list-container")[0]
      .offsetWidth;
    const max = move * (this.state.lists.length - 1);
    if (this.state.x > -max) {
      const x = this.state.x - move;

      this.setState({ x });
    }
  };

  /*******************************************************************************************/

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
          onScheduleLi={this.handleScheduleLi}
          onChecked={this.handleChecked}
          x={this.state.x}
        />
      );
    });
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

            <div
              className="lists-box"
              id="container-lists"
              onTouchStart={(e) => this.handleStart(e)}
              onTouchEnd={(e) => this.handleMoveEnd(e)}
              onTouchMove={(e) => this.handleMove(e)}
            >
              {this.showLists()}
            </div>
            <IconContext.Provider value={{ className: "arrow-btn" }}>
              <button id="right-btn" onClick={() => this.goRight()}>
                <IoIosArrowForward />
              </button>
              <button id="left-btn" onClick={() => this.goLeft()}>
                <IoIosArrowForward />
              </button>
            </IconContext.Provider>
            <NewListForm
              onChangeFocus={this.handleChangeFocus}
              receiveSubmit={this.handleSubmit}
              receiveName={this.handleName}
              onSendIcon={this.handleIcon}
              icon={this.state.icon}
            />
          </div>
        </>
        <>
          <div className="piechart-container">
            <div className="piechart-box">
              <DonutPieChart checkedPercentage={this.getPercentage()} />
            </div>
          </div>
        </>
      </section>
    );
  }
}

export default ListsPage;
