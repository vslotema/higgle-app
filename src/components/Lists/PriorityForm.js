import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

export function handleOpenPriorityForm(e) {
  let item = e.target;

  while (item.classList[0] !== "item-container") {
    item = item.parentElement;
  }

  const form = item.children[2];

  form.style.display = "flex";
}

const handleClosePriorityForm = (e) => {
  let item = e.target;

  while (item.classList[0] !== "item-container") {
    item = item.parentElement;
  }
  const form = item.children[2];
  form.style.display = "none";
};

const selectPriority = (e, props) => {
  const item = e.target;
  const priority = getPriorityId(item);
  const itembox = getListItem(item);
  removeOtherPriority(itembox);

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
  handleClosePriorityForm(e);
};

const getPriorityId = (item) => {
  if (item.classList[0] === "icon" || item.classList[0] === "priority")
    item = item.parentElement;
  return item.id;
};

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
  return (
    <div className="priority-container" id="priority-form">
      <button
        id="close-btn"
        type="button"
        onClick={(e) => handleClosePriorityForm(e)}
      >
        <IconContext.Provider value={{ className: "close-btn-icon" }}>
          <AiFillCloseCircle />
        </IconContext.Provider>
      </button>

      <p id="high" onClick={(e) => selectPriority(e, props)}>
        <span className="priority">High Priority</span>
        <span className="icon">!!!</span>
      </p>
      <p id="medium" onClick={(e) => selectPriority(e, props)}>
        <span className="priority">Medium Priority</span>
        <span className="icon">!!</span>
      </p>
      <p id="low" onClick={(e) => selectPriority(e, props)}>
        <span className="priority">Low Priority</span>
        <span className="icon">!</span>
      </p>
      <p id="neutral" onClick={(e) => selectPriority(e, props)}>
        <span className="priority">Neutral</span>
      </p>
    </div>
  );
};

export default PriorityForm;
