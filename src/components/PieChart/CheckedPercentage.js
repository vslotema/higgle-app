export function calculateTotalCheckedPercentage() {
  var itemsChecked = 0;
  var totalItems = 0;
  const lists = JSON.parse(localStorage.getItem("lists"));
  lists.map((list) => {
    list.items.map((item) => {
      if (item.checked) itemsChecked++;
      return item;
    });
    totalItems += list.items.length;
    return list;
  });
  return Math.floor((itemsChecked / totalItems) * 100);
}
