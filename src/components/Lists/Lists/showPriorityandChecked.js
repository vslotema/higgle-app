export const showPriority = (listName, item) => {
  const priority = item.priority;
  //const listContainer = getRightListContainer(listName);

  /*const itemContainer = listContainer
    ? getRightItemContainer(listContainer.children, item.item)
    : null;*/
  const itemContainer = document.getElementById(listName + "_" + item.item);
  if (itemContainer) {
    switch (priority) {
      case "high":
        itemContainer.classList.add("high-p");
        break;
      case "medium":
        itemContainer.classList.add("medium-p");
        break;
      case "low":
        itemContainer.classList.add("low-p");
        break;

      default:
        break;
    }
  }
};

export const showChecked = (listName, item) => {
  const checked = item.checked;

  const itemContainer = document.getElementById(listName + "_" + item.item);

  if (itemContainer) {
    if (checked) {
      //  itemContainer.classList.add("checked-text");
      itemContainer.children[1].style.opacity = "0.35";
      itemContainer.children[1].children[1].classList.add("checked");
    } else {
      //itemContainer.classList.remove("checked-text");
      itemContainer.children[1].style.opacity = "1.0";
      itemContainer.children[1].children[1].classList.remove("checked");
    }
  }
};
