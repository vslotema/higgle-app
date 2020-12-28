import React, { Component } from "react";
import { getWeek } from "../Calendar/Calendar";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Week from "./Week";
import "./styles/schedule.scss";

class Schedule extends Component {
  state = {
    view: "week",
  };

  updateView = (e) => {
    const view = e.target.value;
    console.log("e target value ", e.target.value);

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

  showWeekly = () => {
    console.log("weekly");
    return (
      <>
        <h3 className="view">{`Week  ${getWeek(new Date())}`}</h3>
        <Week />
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
        <section className="schedule-section">
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
          <button type="button" className="add-from-list-btn">
            <FaPlus className="add" />
            Add From Lists
          </button>
          {this.state.view === "week" ? this.showWeekly() : this.showMonthly()}
          <button className="forward-btn right" onClick={() => this.goRight()}>
            <IoIosArrowForward id="right-btn" />
          </button>
          <button className="forward-btn left" onClick={() => this.goLeft()}>
            <IoIosArrowForward id="left-btn" />
          </button>
        </section>
      </>
    );
  }
}

export default Schedule;
