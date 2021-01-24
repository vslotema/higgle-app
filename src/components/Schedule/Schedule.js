import React, { Component } from "react";
import { getToday, getWeek } from "../Calendar/Calendar";
import { FaPlus } from "react-icons/fa";
import Week from "./Week";
import "./styles/schedule.scss";
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
    console.log("mounted schedule");
    const today = getToday();
    this.setState({ today });
    const agenda = JSON.parse(localStorage.getItem("agenda"));
    if (agenda) this.setState({ agenda });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const input = document.getElementById("input_" + this.state.focus);

    if (input) {
      input.value = "";
      input.focus();
    }

    localStorage.setItem("agenda", JSON.stringify(this.state.agenda));

    this.state.agenda.map((date) => {
      date.items.map((item) => {
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
    var agenda = this.state.agenda;
    agenda.map((item) => {
      if (new Date(item.date).toLocaleDateString("en-GB") === date) {
        const itemsList = item.items.filter((i) => i.item !== nameItem);
        item.items = itemsList;
      }
      return item;
    });

    var agenda = this.removeEmptyDateListFromLocalStorage();
    console.log("AGENDA ", agenda);
    this.setState({ agenda });
  };

  removeEmptyDateListFromLocalStorage = () => {
    return this.state.agenda.filter((item) => item.items.length !== 0);
  };

  handleChecked = (date, nameItem) => {
    console.log("check ", date);
    const agenda = this.state.agenda;
    agenda.map((item) => {
      if (new Date(item.date).toLocaleDateString("en-GB") === date) {
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
      if (new Date(item.date).toLocaleDateString("en-GB") === date) {
        item.items.map((i) => {
          if (i.item === nameItem) i.priority = priority;
          return i;
        });
      }
      return item;
    });

    this.setState({ agenda });
  };

  handleScheduleLi = async (newDate, oldDate, nameItem) => {
    if (newDate) {
      if (new Date(newDate).toLocaleDateString("en-GB") !== oldDate) {
        const transferItem = this.findRightTransferItem(oldDate, nameItem);

        var datelist = await this.findDateList(newDate);

        if (datelist.length === 0) {
          const agenda = this.state.agenda.concat({
            date: newDate,
            items: [transferItem],
          });
          this.setState({ agenda });
        } else {
          datelist[0].items.push(transferItem);
          const agenda = this.state.agenda.map((dateList) => {
            if (
              new Date(dateList.date).toLocaleDateString("en-GB") ===
              new Date(newDate).toLocaleDateString("en-GB")
            ) {
              dateList.items = datelist[0].items;
            }
            return dateList;
          });
          this.setState({ agenda });
        }

        this.handleDeleteLi(oldDate, nameItem);
      }
    }
  };

  findDateList = async (newDate) => {
    return this.state.agenda.filter(
      (dateList) =>
        new Date(dateList.date).toLocaleDateString("en-GB") ===
        new Date(newDate).toLocaleDateString("en-GB")
    );
  };

  findRightTransferItem = (oldDate, nameItem) => {
    const list = this.state.agenda.filter(
      (date) => new Date(date.date).toLocaleDateString("en-GB") === oldDate
    );
    const item = list[0].items.filter((i) => i.item === nameItem);
    return item[0];
  };

  handleReceived = (e) => {
    e.preventDefault();
    const newItem = e.target.value;
    this.setState({ focus: e.target });
    this.setState({ newItem });
  };

  handleAddItem = async (e, date) => {
    e.preventDefault();
    const newItem = {
      item: this.state.newItem,
      priority: "neutral",
      checked: false,
      icon: "",
    };

    var addToDateList = await this.getCorrectDateList(date);

    if (addToDateList) {
      if (addToDateList.items.every((item) => item.item !== newItem.item))
        addToDateList.items.push(newItem);
    } else {
      //If date list has not been stored yet in the localStorage create new date item and
      //add to Agenda.
      let [day, month, year] = date.split("/");
      var d1 = new Date();
      d1.setFullYear(parseInt(year), parseInt(month) - 1, parseInt(day));

      const newDateList = {
        date: d1,
        items: [newItem],
      };
      const agenda = this.state.agenda.concat(newDateList);
      this.setState({ agenda });
    }
    this.setState({ focus: date });
  };

  getCorrectDateList = async (date) => {
    for (let i = 0; i < this.state.agenda.length; i++) {
      if (
        new Date(this.state.agenda[i].date).toLocaleDateString("en-GB") === date
      )
        return this.state.agenda[i];
    }
    return null;
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
    return (
      <>
        <h3 className="view">{`Week  ${getWeek(new Date())}`}</h3>
        <Week
          key={getWeek(new Date()) + "_" + this.state.today}
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
    return (
      <>
        {" "}
        <h3 className="view">January</h3>{" "}
      </>
    );
  };

  render() {
    return (
      <div>
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
            <ListsPage key={"lists-page"} />
            <button className="close-sideLists-btn" type="button">
              <AiOutlineClose
                className="close-btn"
                onClick={() => this.closeSideLists()}
              />
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default Schedule;
