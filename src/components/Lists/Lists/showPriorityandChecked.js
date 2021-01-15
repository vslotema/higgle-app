export const showPriority = (listName, item) => {
  const priority = item.priority;

  const itemContainer = document.getElementById(
    listName + "_" + item.item + "_item-container"
  );
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
      itemContainer.children[1].style.opacity = "0.35";
      itemContainer.children[1].children[1].classList.add("checked");
    } else {
      itemContainer.children[1].style.opacity = "1.0";
      itemContainer.children[1].children[1].classList.remove("checked");
    }
  }
};
