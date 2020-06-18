const chartDivElement = document.getElementById("chart");
const chartIcon = document.querySelector("i");
chartIcon.addEventListener(
  "click",
  subMenuHandler.bind(null, true, chartDivElement)
);
const clearChartBtn = document.getElementById("button-clear");
clearChartBtn.addEventListener("click", () => {
  if (window.confirm("Do you want to delete all the products on the chart?")) {
    clearContent(true, chartTable);
    subTotalUpdate(0, "", chartSubTotalInput, "textContent");
  }
  return;
});

const menu = [...drinkMenu, ...foodMenu, ...merchMenu, ...beansMenu];
const chartIconCount = document.querySelector("#chart-icon span");

const chartTable = document.getElementById("chart-table");
const tableElement = document.querySelector("#chart table");
const finalOrderList = [
  // {
  //   name: "Caffe Americano",
  //   price: "5.00",
  //   quantity: "1",
  //   size: "short"
  // }
];

function updateChart(onlyCountUpdate) {
  if (finalOrderList.length > 0) {
    chartIconCount.className = "";
    chartIconCount.textContent = finalOrderList
      .map(item => item.quantity)
      .reduce((pre, cur) => pre + cur, 0);
    if (!onlyCountUpdate) {
      orderTemplateHandler(true, chartTable, chartSubTotalInput);
    }
  } else {
    chartIconCount.className = "invisible";
    backdropHandler(false);
  }
}

function orderTemplateHandler(addCancelOpt, container, subTotalElement) {
  const tempRowElement = document.getElementById("order-template");
  let i = 1;
  subTotalUpdate(0, "", subTotalElement, "textContent");
  for (let item of finalOrderList) {
    let cloneItem = tempRowElement.content.cloneNode(true);
    let tableContentArr = cloneItem.querySelectorAll("td");
    tableContentArr[0].textContent = i++; //cl no
    tableContentArr[1].firstElementChild.src = menu
      .filter(product => product.name.toLowerCase() == item.name.toLowerCase())
      .map(product => product.img); //cl img
    tableContentArr[2].textContent = item.name; //cl name
    tableContentArr[3].textContent = item.size; //cl size
    tableContentArr[4].textContent = item.quantity; //cl q
    let unitP = item.price;
    tableContentArr[5].textContent = unitP + " $"; //cl unit p
    let totalP = item.price * item.quantity;
    tableContentArr[6].textContent = totalP.toFixed(2) + " $"; //cl total p

    if (addCancelOpt) {
      tableContentArr[7].addEventListener("click", e => {
        let index = e.target.parentElement.rowIndex;
        let itemTotalP =
          finalOrderList[index - 1].price * finalOrderList[index - 1].quantity;
        finalOrderList.splice(index - 1, 1); //order list is updated
        e.target.parentElement.remove(); //row is removed
        subTotalUpdate(itemTotalP, "cancel", subTotalElement, "textContent"); //subtotal is updated
        let chartItemsNoArray = document.querySelectorAll(".order-no");
        let i = 1;
        for (let item of chartItemsNoArray) {
          //cl no is updated
          item.textContent = i++;
        }
        updateChart(true); //only count update
      });
    } else {
      tableContentArr[7].className = "hidden";
    }

    container.appendChild(cloneItem);
    subTotalUpdate(totalP, "add", subTotalElement, "textContent");
  }
}
