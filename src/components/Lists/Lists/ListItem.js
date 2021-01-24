import { AiFillDelete, AiFillCalendar, AiOutlineLeft } from "react-icons/ai";
import { RiCheckLine, RiCheckboxBlankLine } from "react-icons/ri";
import { MdPriorityHigh } from "react-icons/md";
import PriorityForm from "./PriorityForm";
import { handleOpenPriorityForm } from "./PriorityForm";
import Calendar from "../../Calendar/Calendar";
import { icons } from "./Icons";
import { useEffect } from "react";
import { useState } from "react";

const handleSlideInBtns = (e) => {
  let item = e.target;

  while (item.classList[0] !== "buttons") {
    item = item.parentElement;
  }

  const buttons = item;

  buttons.classList.toggle("slide");
  buttons.children[0].children[0].classList.toggle("rotate");
  buttons.children[1].classList.toggle("slide");
  buttons.children[2].classList.toggle("slide");
  buttons.children[3].classList.toggle("slide");
};

const handleShowCalendar = (props) => {
  const calendar = document.getElementById(
    "calendar_" + props.onSendListName + "_" + props.onSendItem.item
  );
  calendar.style.display = "block";
};

const handleHoverItem = (id, item) => {
  var ctx = document.createElement("canvas").getContext("2d");
  ctx.font = "1.5rem Montserrat";
  const width = ctx.measureText(item).width;
  const size = Math.ceil(width / 190) * 3;
  document.getElementById(id + "_item-container").style.height = `${size}rem`;
};

const handleMouseLeaveItem = (id) => {
  document.getElementById(id + "_item-container").style.height = "3.5rem";
};

const ListItem = (props) => {
  const id = props.onSendListName + "_" + props.onSendItem.item;
  const [priority, setPriority] = useState([]);
  const [checked, setChecked] = useState([]);
  const [opacity, setOpacity] = useState([]);

  useEffect(() => {
    switch (props.onSendItem.priority) {
      case "high":
        setPriority("high-p");
        break;
      case "medium":
        setPriority("medium-p");
        break;
      case "low":
        setPriority("low-p");
        break;
      default:
        break;
    }

    if (props.onSendItem.checked) {
      setChecked("checked");
      setOpacity("0.35");
    }
  });

  return (
    <>
      <li
        className={"item-container" + " " + priority}
        id={id + "_item-container"}
        onMouseLeave={() => handleMouseLeaveItem(id)}
      >
        <div>
          <Calendar
            onSendListName={props.onSendListName}
            onSendItem={props.onSendItem}
            onScheduleLi={props.onScheduleLi}
          />
          <PriorityForm
            key={Date.now() + Math.floor(Math.random() * 100)}
            onSendPriority={props.onSendPriority}
            onSendItem={props.onSendItem}
            onSendListName={props.onSendListName}
          />
        </div>

        <div
          className="checkbox"
          onClick={() =>
            props.onChecked(props.onSendListName, props.onSendItem.item)
          }
        >
          <RiCheckboxBlankLine className="box" />

          <RiCheckLine className={"check" + " " + checked} />
        </div>

        <div
          className="item-box"
          id={id + "_item-box"}
          style={{ opacity: opacity }}
          onMouseOver={() => handleHoverItem(id, props.onSendItem.item)}
        >
          {props.onSendItem.item}
        </div>

        <div className="buttons" id="buttons-container">
          <button
            id="slide-left-btn"
            type="button"
            onClick={(e) => handleSlideInBtns(e)}
          >
            {props.onSendItem.icon ? (
              icons[props.onSendItem.icon]
            ) : (
          
              <AiOutlineLeft />
            )}
          </button>

          <button
            type="button"
            id="li-priority-btn"
            onClick={(e) =>
              handleOpenPriorityForm(
                e,
                props.onSendListName + props.onSendItem.item
              )
            }
          >
            <MdPriorityHigh />
          </button>
          <button
            type="button"
            id="li-schedule-btn"
            onClick={() => handleShowCalendar(props)}
          >
            <AiFillCalendar />
          </button>
          <button
            type="button"
            id="li-delete-btn"
            onClick={() =>
              props.onDeleteLi(props.onSendListName, props.onSendItem.item)
            }
          >
            <AiFillDelete />
          </button>
        </div>
      </li>
    </>
  );
};

export default ListItem;
