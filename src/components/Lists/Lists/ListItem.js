import { AiFillDelete, AiFillCalendar, AiOutlineLeft } from "react-icons/ai";
import { RiCheckLine, RiCheckboxBlankLine } from "react-icons/ri";
import { MdPriorityHigh } from "react-icons/md";
import PriorityForm from "./PriorityForm";
import { IconContext } from "react-icons";
import { handleOpenPriorityForm } from "./PriorityForm";

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

const ListItem = (props) => {
  return (
    <>
      <li
        className="item-container"
        id={props.onSendListName + "_" + props.onSendItem.item}
      >
        <div
          className="checkbox"
          onClick={() =>
            props.onChecked(props.onSendListName, props.onSendItem.item)
          }
        >
          <IconContext.Provider value={{ className: "box" }}>
            <RiCheckboxBlankLine />
          </IconContext.Provider>
          <IconContext.Provider value={{ className: "check" }}>
            <RiCheckLine />
          </IconContext.Provider>
        </div>
        <div className="item-box">{props.onSendItem.item}</div>
        <PriorityForm
          key={Date.now() + Math.floor(Math.random() * 100)}
          onSendPriority={props.onSendPriority}
          onSendItem={props.onSendItem}
          onSendListName={props.onSendListName}
        />
        <div className="buttons slides" id="buttons-container">
          <button
            id="slide-left-btn"
            className="slides"
            type="button"
            onClick={(e) => handleSlideInBtns(e)}
          >
            <AiOutlineLeft />
          </button>

          <button
            className="slides"
            type="button"
            id="li-priority-btn"
            onClick={(e) => handleOpenPriorityForm(e)}
          >
            <MdPriorityHigh />
          </button>
          <button className="slides" type="button" id="li-schedule-btn">
            <AiFillCalendar />
          </button>
          <button
            className="slides"
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