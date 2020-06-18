const orderListItem = document.getElementById("order-list"); //pre-view of the chart
const completeButton = document.getElementById("button-complete"); //send to chart button
completeButton.addEventListener("click", createOrderList);

const subTotalInput = document.querySelector("#sub-total-area input"); //submenu subtotal input
const chartSubTotalInput = document.querySelector("#chart-sub-total");//chart subtotal input

let temporaryOrderList = [];

function order() {
  let itemPropertiesArr = this.parentElement.children;
  let orderQ = +itemPropertiesArr[4].value; //get selected item quantity
  let orderPrice = itemPropertiesArr[3].value.split(" ")[0]; //get price shown on the screen
  let orderProduct = itemPropertiesArr[1].innerText; // get the product name
  let orderSize = itemPropertiesArr[2].classList.contains("hidden") 
    ? null
    : itemPropertiesArr[2].value; // get the product size if applicable

  //if item is already on the preview, then just increase quantity. Else update screen.
  let index = checkDoubleEntry(orderProduct, orderSize ? orderSize : "N/A");
  if (index >= 0) {
    temporaryOrderList[index].quantity += orderQ;
    updateOrderScreen(index, orderQ);
  } else {
    orderScreen(orderProduct, orderQ, orderPrice, orderSize);
  }
}

function checkDoubleEntry(name, size) {
  for (let [i, item] of temporaryOrderList.entries()) {
    if (item.name == name && item.size == size) {
      return i;
    }
  }
  return -1;
}

function updateOrderScreen(i, q) { //increase q of the item for the double entry instead of adding new line
  let itemDOM = document.querySelectorAll("#order-list div li")[i];
  let item = temporaryOrderList[i];
  itemDOM.textContent =
    item.size != "N/A"
      ? `${item.name}, ${item.size} - ${item.quantity} x ${item.price} $ = ${(
          item.quantity * item.price
        ).toFixed(2)} $`
      : `${item.name} - ${item.quantity} x ${item.price} $ = ${(
          item.quantity * item.price
        ).toFixed(2)} $`;
  itemDOM.style.backgroundColor = "lightgray";
  setTimeout(function() {
    itemDOM.style.backgroundColor = "transparent";
  }, 500);
  itemDOM.scrollIntoView({ behavior: "smooth" });
  subTotalUpdate(item.price*q, "add", subTotalInput, "value"); //update subtotal of the order screen
}

function orderScreen(pro, q, p, size) {
  temporaryOrderList.push({ //add to the temporary list before sending to the chart
    name: pro,
    quantity: q,
    price: p,
    size: size ? size : "N/A"
  });

  let text = size
    ? `${pro}, ${size} - ${q} x ${p} $ = ${(q * p).toFixed(2)} $`
    : `${pro} - ${q} x ${p} $ = ${(q * p).toFixed(2)} $`;
  
  let divElement = document.createElement("div"); // line li together with its cancel button
  let newItem = document.createElement("li");
  newItem.textContent = text;
  divElement.appendChild(newItem);

  let cancelItemBtn = document.createElement("button");
  cancelItemBtn.textContent = "X";
  cancelItemBtn.classList.add("button-inline");
  cancelItemBtn.addEventListener("click", deleteItem);
  cancelItemBtn.addEventListener("mouseover", function() {
    this.parentElement.style.backgroundColor = "lightgray";
  });
  cancelItemBtn.addEventListener("mouseleave", function() {
    this.parentElement.style.backgroundColor = "transparent";
  });

  divElement.appendChild(cancelItemBtn);
  divElement.classList.add("div-inline");
  orderListItem.appendChild(divElement);
  divElement.scrollIntoView({ behavior: "smooth" });

  subTotalUpdate(p*q, "add", subTotalInput, "value");
}

function subTotalUpdate(newValue, op, target, property) {
  let curValue = +target[property].match(/\d+\.\d+/)[0]; //Current value
  if (op == "add") {
    curValue += +newValue;
    target[property] = curValue.toFixed(2) + " $";
  } else if (op == "cancel") {
    curValue -= +newValue;
    target[property] = curValue.toFixed(2) + " $";
  } else {
    target[property] = "0.00 $";
  }
}

function createOrderList() {
  if (temporaryOrderList.length == 0) { //in case no product is selected
    alert("Please use Add buttons to send products to the chart!");
  } else {
    finalOrderList.push(...temporaryOrderList);
    subMenuHandler(true, null); //handle backdrop and submenu window; clear submenu and preview screen; clean temporary list
    clearContent(
      false,
      chartTable,
      mbChartTable
    );
    updateChart(); //handle chart element
  }
}

function deleteItem() { //getting the deleted item info from the DOM
  let btnItem = this;
  let liItem = this.previousElementSibling;
  btnItem.remove();
  liItem.remove();
  let removedItem = liItem.textContent.includes(",") //getting product name
    ? liItem.textContent.split(",") //for drink products
    : liItem.textContent.split("-"); //other products
  let removedItemName = removedItem[0].trim();
  removedItem = liItem.textContent.split("x ");
  let removedItemQ = removedItem[0].match(/\d+/)[0];
  let removedItemP = removedItem[1].split(" ")[0];

  subTotalUpdate(removedItemP*removedItemQ, "cancel", subTotalInput, "value"); //decrease the subtotal for the removed item

  let itemIndex = null;
  for (let item of temporaryOrderList) { //removing the deleted item from the order list before sending the chart
    if (
      item.name == removedItemName &&
      item.quantity == removedItemQ &&
      item.price == removedItemP
    ) {
      itemIndex = temporaryOrderList.indexOf(item);
    }
  }
  temporaryOrderList.splice(itemIndex, 1);
}
