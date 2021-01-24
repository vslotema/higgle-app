import React, { Component } from "react";
import Day from "./Day";
import { getWeekDates, getToday } from "../Calendar/Calendar";
import { IoIosArrowForward } from "react-icons/io";

class Week extends Component {
  state = {
    week: [],
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    today: "",
    addWeek: 0,
  };

  componentDidMount() {
    const week = getWeekDates(this.state.addWeek);
    const today = getToday();
    this.setState({ week });
    this.setState({ today });
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevState.addWeek != this.state.addWeek) {
      this.updateWeeks();
    }
    if (prevState.week != this.state.week) {
      if (this.state.addWeek === 0) this.selectToday();
      else this.handleSelectDay(this.state.week[0]);
    }
  };

  selectToday = () => {
    const days = document.getElementsByClassName("day");
    const smallDays = document.getElementsByClassName("day-small");
    var date = new Date();
    const today = date.getDay() === 0 ? 6 : date.getDay() - 1;
    days[today].classList.add("selected");
    smallDays[today].classList.add("select-day");
  };

  goForwards = () => {
    const addWeek = this.state.addWeek + 1;
    this.setState({ addWeek });
  };

  goBackwards = () => {
    const addWeek = this.state.addWeek - 1;
    this.setState({ addWeek });
  };

  updateWeeks = () => {
    const week = getWeekDates(this.state.addWeek);
    this.setState({ week });
    this.removeSelected();
  };

  handleSelectDay = (date) => {
    this.removeSelected();
    const selectDay = document.getElementById(date);
    selectDay.classList.add("selected");
    const small = document.getElementById("small_" + date);
    small.classList.add("select-day");
  };

  removeSelected = () => {
    const days = document.getElementsByClassName("day");
    const smallDays = document.getElementsByClassName("day-small");
    for (var i = 0; i < 7; i++) {
      days[i].classList.remove("selected");
      smallDays[i].classList.remove("select-day");
    }
  };

  getRightDateList = (day, agenda) => {
    const date = this.state.week[day];
    const list = agenda.filter(
      (item) => new Date(item.date).toLocaleDateString("en-GB") === date
    );
    if (list.length > 0) {
      return list[0].items;
    }
    return list;
  };

  render() {
    return (
      <>
        <div className="week-container">
          <ul className="day-header-days">
            <li
              className="day-small"
              id={"small_" + this.state.week[0]}
              onClick={() => this.handleSelectDay(this.state.week[0])}
            >
              M
            </li>
            <li
              className="day-small"
              id={"small_" + this.state.week[1]}
              onClick={() => this.handleSelectDay(this.state.week[1])}
            >
              T
            </li>
            <li
              className="day-small"
              id={"small_" + this.state.week[2]}
              onClick={() => this.handleSelectDay(this.state.week[2])}
            >
              W
            </li>
            <li
              className="day-small"
              id={"small_" + this.state.week[3]}
              onClick={() => this.handleSelectDay(this.state.week[3])}
            >
              T
            </li>
            <li
              className="day-small"
              id={"small_" + this.state.week[4]}
              onClick={() => this.handleSelectDay(this.state.week[4])}
            >
              F
            </li>
            <li
              className="day-small"
              id={"small_" + this.state.week[5]}
              onClick={() => this.handleSelectDay(this.state.week[5])}
            >
              S
            </li>
            <li
              className="day-small"
              id={"small_" + this.state.week[6]}
              onClick={() => this.handleSelectDay(this.state.week[6])}
            >
              S
            </li>
          </ul>
          {this.state.week.map((date, i) => (
            <div
              key={"div" + date}
              className="day"
              id={date}
              onClick={() => this.handleSelectDay(date)}
            >
              <Day
                key={date}
                day={this.state.today === date ? "Today" : this.state.days[i]}
                date={date}
                onAddItem={this.props.onAddItem}
                receiveNewItem={this.props.receiveNewItem}
                items={this.getRightDateList(i, this.props.agenda)}
                onSendPriority={this.props.onSendPriority}
                onChecked={this.props.onChecked}
                onDeleteLi={this.props.onDeleteLi}
                onScheduleLi={this.props.onScheduleLi}
              />
            </div>
          ))}
        </div>
        <button className="forward-btn right" onClick={() => this.goForwards()}>
          <IoIosArrowForward id="right-btn" />
        </button>
        <button className="forward-btn left" onClick={() => this.goBackwards()}>
          <IoIosArrowForward id="left-btn" />
        </button>
      </>
    );
  }
}

export default Week;
