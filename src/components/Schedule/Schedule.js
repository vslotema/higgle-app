import React, { Component } from "react";
import { getToday, getWeek } from "../Calendar/Calendar";
import { FaPlus } from "react-icons/fa";
import Week from "./Week";
import "./styles/schedule.scss";
import {
  showPriority,
  showChecked,
} from "../Lists/Lists/showPriorityandChecked";
import ListsPage from "../Lists/ListsPage";
import { AiOutlineClose } from "react-icons/ai";

class Schedule extends Component {
  state = {
    view: "week",
    newItem: "",
    agenda: [], //[{date:x, items:{item:, priority, checked}]
    today: "",
    focus: "",
  };

  componentDidMount() {
    console.log("willmount ");
    const today = getToday();
    console.log("today ", today);
    this.setState({ today });
    // const today = getToday();
    const agenda = JSON.parse(localStorage.getItem("agenda"));
    if (agenda) this.setState({ agenda });
    // this.setState({ today });
    // this.setState({ checkedPercentage: calculateTotalCheckedPercentage() });
  }

  componentDidUpdate() {
    // console.log("moves ", this.state.moveX);
    const input = document.getElementById("input_" + this.state.focus);
    console.log("input ", input);

    if (input) {
      input.value = "";
      input.focus();
    }

    localStorage.setItem("agenda", JSON.stringify(this.state.agenda));
    this.state.agenda.map((date) => {
      date.items.map((item) => {
        showPriority(date.date, item);
        showChecked(date.date, item);
        return item;
      });
      return date;
    });
  }

  updateView = (e) => {
    const view = e.target.value;

    if (view !== this.state.view) {
      switch (view) {
        case "month":
          this.setState({ view: "month" });
          break;
        default:
          this.setState({ view: "week" });
      }
    }
  };

  handleDeleteLi = (date, nameItem) => {
    const agenda = this.state.agenda;
    agenda.map((item) => {
      if (item.date === date) {
        const itemsList = item.items.filter((i) => i.item !== nameItem);
        item.items = itemsList;
      }
      return item;
    });

    this.setState({ agenda });
  };

  handleChecked = (date, nameItem) => {
    const agenda = this.state.agenda;
    agenda.map((item) => {
      if (item.date === date) {
        item.items.map((i) => {
          if (i.item === nameItem) i.checked = !i.checked;
          return i;
        });
      }
      return item;
    });

    this.setState({ agenda });
  };

  onAddPriorityToList = (priority, nameItem, date) => {
    const agenda = this.state.agenda;
    agenda.map((item) => {
      if (item.date === date) {
        item.items.map((i) => {
          if (i.item === nameItem) i.priority = priority;
          return i;
        });
      }
      return item;
    });

    this.setState({ agenda });
  };

  handleScheduleLi = (nameList, nameItem) => {
    console.log("handle schedule list item ");
  };


  handleReceived = (e) => {
    e.preventDefault();
    console.log("e ", e.target);
    const newItem = e.target.value;
    this.setState({ focus: e.target });
    this.setState({ newItem });
  };

  handleAddItem = (e, date) => {
    e.preventDefault();

    var addTo = this.state.agenda.filter((item) => item.date === date);

    if (addTo.length > 0) {
      addTo[0].items.push({
        item: this.state.newItem,
        priority: "neutral",
        checked: false,
        icon:"",
      });

      const agenda = this.state.agenda.map((item) => {
        if (item.date === date) item.items = addTo[0].items;
        return item;
      });
      this.setState({ agenda });
    } else {
      const newItem = {
        date: date,
        items: [
          { item: this.state.newItem, priority: "neutral", checked: false,icon:""},
        ],
      };
      const agenda = this.state.agenda.concat(newItem);
      this.setState({ agenda });
    }
    this.setState({ focus: date });
  };

  closeSideLists = () => {
    const lists = document.getElementById("addFromLists");
    lists.style.transform = "translateX(-100%)";
  };

  openSideLists = () => {
    const lists = document.getElementById("addFromLists");
    lists.style.transform = "translateX(0%)";
    const schedule = document.getElementById("schedule-s");
    schedule.style.overflow = "visible";
  };

  showWeekly = () => {
    console.log("weekly");
    return (
      <>
        <h3 className="view">{`Week  ${getWeek(new Date())}`}</h3>
        <Week
          onAddItem={this.handleAddItem}
          receiveNewItem={this.handleReceived}
          onSendPriority={this.onAddPriorityToList}
          onChecked={this.handleChecked}
          onDeleteLi={this.handleDeleteLi}
          onScheduleLi={this.handleScheduleLi}
          agenda={this.state.agenda}
        />
      </>
    );
  };

  showMonthly = () => {
    console.log("monthly");
    return <h3 className="view">January</h3>;
  };

  render() {
    return (
      <>
        <section id="schedule-s" className="schedule-section">
          <form className="select-view-form">
            <select
              name="schedule"
              id="scheduleView"
              onClick={(e) => this.updateView(e)}
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </form>
          <button
            type="button"
            className="add-from-list-btn"
            onClick={() => this.openSideLists()}
          >
            <FaPlus className="add" />
            Add From Lists
          </button>
          {this.state.view === "week" ? this.showWeekly() : this.showMonthly()}
          <div id="addFromLists" className="sideLists">
            <ListsPage />
            <button className="close-sideLists-btn" type="button">
              <AiOutlineClose
                className="close-btn"
                onClick={() => this.closeSideLists()}
              />
            </button>
          </div>
        </section>
      </>
    );
  }
}

export default Schedule;
