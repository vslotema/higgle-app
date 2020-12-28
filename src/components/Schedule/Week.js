import React, { Component } from "react";
import Day from "./Day";

class Week extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="week-container">
          <div className="day ">
            <Day day="Monday" />
          </div>
          <div className="day">
            <Day day="Tuesday" />
          </div>
          <div className="day selected">
            <Day day="Wednesday" />
          </div>
          <div className="day">
            <Day day="Thursday" />
          </div>
          <div className="day">
            <Day day="Friday" />
          </div>
          <div className="day">
            <Day day="Saturday" />
          </div>
          <div className="day ">
            <Day day="Sunday" />
          </div>
        </div>
      </>
    );
  }
}

export default Week;
