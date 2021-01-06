import React, { Component } from "react";
import Day from "./Day";
import { getWeekDates, getToday } from "../Calendar/Calendar";
import { IoIosArrowForward } from "react-icons/io";

let addWeek = 0;

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
  };

  componentWillMount() {
    const week = getWeekDates(addWeek);
    const today = getToday();
    this.setState({ week });
    this.setState({ today });
  }

  componentDidMount() {
    this.selectToday();
  }

  componentDidUpdate = () => {};

  selectToday = () => {
    const days = document.getElementsByClassName("day");
    var date = new Date();
    const today = date.getDay() - 1;
    days[today].classList.add("selected");
  };

  goForwards = () => {
    addWeek++;
    this.updateWeeks();
  };

  goBackwards = () => {
    addWeek--;
    this.updateWeeks();
  };

  updateWeeks = () => {
    const week = getWeekDates(addWeek);
    this.setState({ week });
    this.removeSelected();
    if (addWeek === 0) this.selectToday();
    else this.handleSelectDay(this.state.week[0]);
  };

  handleSelectDay = (date) => {
    this.removeSelected();
    const selectDay = document.getElementById(date);
    selectDay.classList.add("selected");
  };

  removeSelected = () => {
    const days = document.getElementsByClassName("day");
    for (var i = 0; i < 7; i++) days[i].classList.remove("selected");
  };

  getRightDateList = (day, agenda) => {
    const date = this.state.week[day];
    const list = agenda.filter((item) => item.date === date);
    if (list.length > 0) {
      return list[0].items;
    }
    return list;
  };
  render() {
    console.log("this props today ", this.props.today);
    return (
      <>
        <div className="week-container">
          {this.state.week.map((date, i) => (
            <div
              className="day"
              id={date}
              onClick={() => this.handleSelectDay(date)}
            >
              <Day
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
