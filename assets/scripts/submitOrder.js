const stores = document.querySelectorAll("#store-opt option");
const storeElement = document.querySelector("#mb-store p");
let store = "";

const mb = document.getElementById("message-box");
const mbChartTable = document.getElementById("mb-chart-table");
const mbChartSubTotalInput = document.querySelector("#mb-chart-sub-total");

const submitChartBtn = document.getElementById("button-submit");
submitChartBtn.addEventListener("click", submitChartHandler);

const mbCancelBtn = document.getElementById("mb-button-clear");
mbCancelBtn.addEventListener("click", () => {
  subMenuHandler(false, mb);
});

const mbSendOrderBtn = document.getElementById("mb-button-submit");
mbSendOrderBtn.addEventListener("click", () => {
  clearContent(true, chartTable, mbChartTable);
  subTotalUpdate(0, "", chartSubTotalInput, "textContent");
  alert("Your order is sent to the store " + store);
});

function submitChartHandler() {
  clearContent(false, mbChartTable);
  let selectedStoreIndex = document.getElementById("store-opt").selectedIndex;
  if (selectedStoreIndex == 0) {
    alert("Please select a store!");
    subMenuHandler(false, chartDivElement);
  } else {
    store = stores[selectedStoreIndex].textContent;
    storeElement.textContent = "Store: " + store;
    //handling tempmenu element: closing chart and opening the final order page
    subMenuHandler(false, chartDivElement);
    subMenuHandler(false, mb);
    orderTemplateHandler(false, mbChartTable, mbChartSubTotalInput);
  }
}
