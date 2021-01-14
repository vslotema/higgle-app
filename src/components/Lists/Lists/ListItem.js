import { AiFillDelete, AiFillCalendar, AiOutlineLeft } from "react-icons/ai";
import { RiCheckLine, RiCheckboxBlankLine } from "react-icons/ri";
import { MdPriorityHigh } from "react-icons/md";
import PriorityForm from "./PriorityForm";
import { handleOpenPriorityForm } from "./PriorityForm";
import Calendar from "../../Calendar/Calendar";
import { icons } from "./Icons";

const handleSlideInBtns = (e) => {
  let item = e.target;

  while (item.classList[0] !== "buttons") {
    item = item.parentElement;
  }

  const buttons = item;

  buttons.classList.toggle("slide");
  buttons.children[1].children[0].classList.toggle("rotate");
  buttons.children[2].classList.toggle("slide");
  buttons.children[3].classList.toggle("slide");
  buttons.children[4].classList.toggle("slide");
};

const handleShowCalendar = (props) => {
  const calendar = document.getElementById(
    "calendar_" + props.onSendListName + "_" + props.onSendItem.item
  );
  calendar.style.display = "block";
};

const handleHoverItem = (id) => {
  console.log("hovering over item");
  document.getElementById(id + "_item-container").style.height = "10rem";
};

const handleMouseLeaveItem = (id) => {
  document.getElementById(id + "_item-container").style.height = "3rem";
};
const ListItem = (props) => {
  const id = props.onSendListName + "_" + props.onSendItem.item;
  return (
    <>
      <li className="item-container" id={id + "_item-container"} onMouseLeave={() => handleMouseLeaveItem(id)}>
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

          <RiCheckLine className="check" />
        </div>

        <div
          className="item-box"
          onMouseOver={() => handleHoverItem(id)}
          
        >
          {props.onSendItem.item}{" "}
        </div>

        <div className="buttons" id="buttons-container">
          <span className="item-icon">{icons[props.onSendItem.icon]}</span>
          <button
            id="slide-left-btn"
            type="button"
            onClick={(e) => handleSlideInBtns(e)}
          >
            <AiOutlineLeft />
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
