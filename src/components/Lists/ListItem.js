import { AiFillDelete, AiFillCalendar, AiOutlineLeft } from "react-icons/ai";
import { RiCheckLine, RiCheckboxBlankLine } from "react-icons/ri";
import { MdPriorityHigh } from "react-icons/md";
import PriorityForm from "./PriorityForm";
import { IconContext } from "react-icons";
import { handleOpenPriorityForm } from "./PriorityForm";

const handleDeleteLi = (e) => {
  let item = e.target;
  while (item.classList[0] !== "item-container") {
    item = item.parentElement;
  }
  item.remove();
};

const handleChecked = (e) => {
  console.log("handle check");

  let item = e.target;
  let check;
  while (item.classList[0] !== "item-container") {
    if (item.classList[0] === "checkbox") check = item.children[1];
    item = item.parentElement;
  }
  const text = item.children[1];

  //item.checked = !item.checked;
  check.classList.toggle("checked");
  text.classList.toggle("checked-text");

  console.log("item.checked ", check);
  console.log("text ", text);
  //item.nextElementSibling.classList.toggle("checked");
};

const handleSlideInBtns = (e) => {
  let item = e.target;

  while (item.classList[0] !== "buttons") {
    item = item.parentElement;
  }

  const buttons = item;
  console.log("children ", buttons.children);
  console.log("childe 1 ", buttons.children[0].children);

  buttons.classList.toggle("slide");
  buttons.children[0].children[0].classList.toggle("rotate");
  buttons.children[1].classList.toggle("slide");
  buttons.children[2].classList.toggle("slide");
  buttons.children[3].classList.toggle("slide");
};

const ListItem = (props) => {
  return (
    <>
      <div className="item-container">
        <div className="checkbox" onClick={(e) => handleChecked(e)}>
          <IconContext.Provider value={{ className: "box" }}>
            <RiCheckboxBlankLine />
          </IconContext.Provider>
          <IconContext.Provider value={{ className: "check" }}>
            <RiCheckLine />
          </IconContext.Provider>
        </div>
        <div className="item-box">{props.onSendItem}</div>
        <PriorityForm />
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
            onClick={(e) => handleDeleteLi(e)}
          >
            <AiFillDelete />
          </button>
        </div>
      </div>
    </>
  );
};

export default ListItem;
