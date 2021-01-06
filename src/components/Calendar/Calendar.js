import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./calendar.scss";

export function getWeek(date) {
  //define a date object variable that will take the current system date
  var date1 = new Date(date);

  //find the year of the current date
  var oneJan = new Date(date1.getFullYear(), 0, 1);

  // calculating number of days in given year before a given date
  var numberOfDays = Math.floor((date1 - oneJan) / (24 * 60 * 60 * 1000));

  // adding 1 since to current date and returns value starting from 0
  var result = Math.ceil((date1.getDay() + 1 + numberOfDays) / 7);

  return result;
}

export function getToday() {
  var today = new Date();
  /* const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = `${day}/${month}/${year}`;*/
  return today.toLocaleDateString("eu-EU");
}

export function getWeekDates(addWeek) {
  var today = new Date();
  var week = ["", "", "", "", "", "", ""];

  const weekday = today.getDay() - 1;
  const add = addWeek * 7;
  for (let i = 0; i < week.length; i++) {
    const days = i + add - weekday;
    var d = new Date();
    d.setDate(d.getDate() + days);
    /* const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = `${day}/${month}/${year}`;
    console.log("date ", date);*/
    week[i] = d.toLocaleDateString("eu-EU");
  }
  return week;
}

const Calendar = (props) => {
  const [selectedDay, setSelectedDay] = useState(null);
  useEffect(() => closeCalender(), [selectedDay]);

  const closeCalender = () => {
    props.onScheduleLi(
      selectedDay,
      props.onSendListName,
      props.onSendItem.item
    );
    const calendar = document.getElementById(
      "calendar_" + props.onSendListName + "_" + props.onSendItem.item
    );
    calendar.style.display = "none";
  };

  return (
    <>
      <div
        id={"calendar_" + props.onSendListName + "_" + props.onSendItem.item}
        className="calendar-container"
      >
        <DayPicker onDayClick={setSelectedDay} selectedDays={selectedDay} />
      </div>
    </>
  );
};

export default Calendar;
