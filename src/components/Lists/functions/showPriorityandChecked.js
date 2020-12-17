export const showPriority = (listName, item) => {
  const priority = item.priority;
  const listContainer = getRightListContainer(listName);

  const itemContainer = listContainer
    ? getRightItemContainer(listContainer.children, item.item)
    : null;
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

      case "neutral":
        break;
    }
  }
};

export const showChecked = (listName, item) => {
  const checked = item.checked;
  const listContainer = getRightListContainer(listName);

  const itemContainer = listContainer
    ? getRightItemContainer(listContainer.children, item.item)
    : null;

  if (checked) {
    itemContainer.classList.add("checked-text");
    itemContainer.children[0].children[1].classList.add("checked");
  } else {
    itemContainer.classList.remove("checked-text");
    itemContainer.children[0].children[1].classList.remove("checked");
  }
};

const getRightListContainer = (listName) => {
  const listContainers = document.getElementsByClassName("list-container");
  for (let i = 0; i < listContainers.length; i++) {
    let intext = listContainers[i].children[0].innerText;
    if (intext === listName) {
      return listContainers[i];
    }
  }
  return null;
};

const getRightItemContainer = (listContainer, itemName) => {
  for (let i = 1; i < listContainer.length - 1; i++) {
    if (listContainer[i].children[1].innerHTML === itemName) {
      return listContainer[i];
    }
  }
  return null;
};
