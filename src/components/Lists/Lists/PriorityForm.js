import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

export function handleOpenPriorityForm(e, id) {
  const form = document.getElementById(id + "_priority-form");
  form.style.display = "flex";
  if (e.clientY <= 362) form.style.transform = "translateY(14px)";
  if (e.clientY >= 684) form.style.transform = "translateY(-98px)";
}

const handleClosePriorityForm = (e, id) => {
  document.getElementById(id + "_priority-form").style.display = "none";
};

const selectPriority = (e, props, priority) => {
  const item = document.getElementById(
    props.onSendListName + "_" + props.onSendItem.item + "_item-container"
  );

  removeOtherPriority(item);

  switch (priority) {
    case "high":
      props.onSendPriority("high", props.onSendItem.item, props.onSendListName);
      break;
    case "medium":
      props.onSendPriority(
        "medium",
        props.onSendItem.item,
        props.onSendListName
      );
      break;
    case "low":
      props.onSendPriority("low", props.onSendItem.item, props.onSendListName);
      break;
    default:
      props.onSendPriority(
        "neutral",
        props.onSendItem.item,
        props.onSendListName
      );
      break;
  }
  handleClosePriorityForm(e, props.onSendListName + props.onSendItem.item);
};

/*
const getPriorityId = (item) => {
  if (item.classList[0] === "icon" || item.classList[0] === "priority")
    item = item.parentElement;
  return item.id;
};*/

const getListItem = (item) => {
  while (item.classList[0] !== "item-container") {
    item = item.parentElement;
  }
  return item;
};

const removeOtherPriority = (item) => {
  const classes = item.classList;

  for (var i = 0; i < classes.length; i++)
    if (classes[i] !== "item-container") item.classList.remove(classes[i]);
};

const PriorityForm = (props) => {
  const id = props.onSendListName + props.onSendItem.item;
  return (
    <div className="priority-container" id={id + "_priority-form"}>
      <button
        id="close-btn"
        type="button"
        onClick={(e) => handleClosePriorityForm(e, id)}
      >
        <AiFillCloseCircle className="close-btn-icon" />
      </button>

      <p
        id={id + "high"}
        className="high"
        onClick={(e) => selectPriority(e, props, "high")}
      >
        <span className="priority">High Priority</span>
        <span className="icon">!!!</span>
      </p>
      <p
        id={id + "medium"}
        className="medium"
        onClick={(e) => selectPriority(e, props, "medium")}
      >
        <span className="priority">Medium Priority</span>
        <span className="icon">!!</span>
      </p>
      <p
        id={id + "low"}
        className="low"
        onClick={(e) => selectPriority(e, props, "low")}
      >
        <span className="priority">Low Priority</span>
        <span className="icon">!</span>
      </p>
      <p
        id={id + "neutral"}
        onClick={(e) => selectPriority(e, props, "neutral")}
      >
        <span className="priority">Neutral</span>
      </p>
    </div>
  );
};

export default PriorityForm;
