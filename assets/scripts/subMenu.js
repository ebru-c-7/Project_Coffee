const drinkMenu = [
  {
    name: "caffe americano",
    img: "assets/img/Coffee/caffe-americano.jpg",
    price: [5, 6, 7.5, 8]
  },
  {
    name: "caffee latte",
    img: "assets/img/Coffee/caffee-latte.jpg",
    price: [5.25, 6.25, 7.5, 8.5]
  },
  {
    name: "caffe mocha",
    img: "assets/img/Coffee/caffe-mocha.jpg",
    price: [5.5, 6.5, 8, 8.25]
  },
  {
    name: "Cappuccino",
    img: "assets/img/Coffee/Cappuccino.jpg",
    price: [5.25, 6.75, 7.75, 8]
  },
  {
    name: "caramel macchiato",
    img: "assets/img/Coffee/caramel-macchiato.jpg",
    price: [5.5, 6, 7.5, 8]
  },
  {
    name: "espresso",
    img: "assets/img/Coffee/espresso.jpg",
    price: [5.5, 6.5, 8, 8.25]
  },
  {
    name: "espresso con panna",
    img: "assets/img/Coffee/espresso-con-panna.jpg",
    price: [5.25, 6.75, 7.75, 8]
  },
  {
    name: "espresso macchiato",
    img: "assets/img/Coffee/espresso-macchiato.jpg",
    price: [5, 6, 7.5, 8]
  },
  {
    name: "flat white",
    img: "assets/img/Coffee/flat-white.jpg",
    price: [5.5, 6.75, 7.5, 8.25]
  },
  {
    name: "iced caffe americano",
    img: "assets/img/Coffee/iced-caffe-americano.jpg",
    price: [5.5, 6.5, 8, 8.25]
  },
  {
    name: "iced caffee late",
    img: "assets/img/Coffee/iced-caffee-late.jpg",
    price: [5.5, 6.75, 7.5, 8.25]
  },
  {
    name: "iced caffee mocha",
    img: "assets/img/Coffee/iced-caffee-mocha.jpg",
    price: [5, 6, 7.5, 8]
  },
  {
    name: "iced caramel macchiato",
    img: "assets/img/Coffee/iced-caramel-macchiato.jpg",
    price: [5, 6, 7.5, 8]
  },
  {
    name: "iced white chocolate mocha",
    img: "assets/img/Coffee/iced-white-chocolate-mocha.jpg",
    price: [5.5, 6.75, 7.5, 8.25]
  },
  {
    name: "ristretto bianco",
    img: "assets/img/Coffee/ristretto-bianco.jpg",
    price: [6, 6.75, 7.5, 8.5]
  },
  {
    name: "white chocolate mocha",
    img: "assets/img/Coffee/white-chocolate-mocha.jpg",
    price: [6, 6.5, 7.5, 8.5]
  }
];
const foodMenu = [
  {
    name: "blueberry muffin",
    img: "assets/img/Food/blueberry-muffin.jpg",
    price: 5
  },
  {
    name: "chocolate chip cookie",
    img: "assets/img/Food/chocolate-chip-cookie.jpg",
    price: 8
  },
  {
    name: "chocolate croissant",
    img: "assets/img/Food/chocolate-croissant.jpg",
    price: 4
  },
  {
    name: "glazed doughnut",
    img: "assets/img/Food/glazed-doughnut.jpg",
    price: 8
  },
  {
    name: "plain bagel",
    img: "assets/img/Food/plain-bagel.jpg",
    price: 4
  }
];
const merchMenu = [
  {
    name: "coffee press",
    img: "assets/img/Merch/coffee-press.jpg",
    price: 55
  },
  {
    name: "drinkware tumbler",
    img: "assets/img/Merch/drinkware-tumbler.jpg",
    price: 25
  },
  {
    name: "drinkware tumbler black",
    img: "assets/img/Merch/drinkware-tumbler-black.jpg",
    price: 30
  },
  {
    name: "mug glass",
    img: "assets/img/Merch/mug-glass.jpg",
    price: 35
  }
];
const beansMenu = [
  {
    name: "jamaica blue mountain",
    img: "assets/img/Beans/jamaica-blue-mountain.jpg",
    price: 50
  },
  {
    name: "papua new guinea ulya",
    img: "assets/img/Beans/papua-new-guinea-ulya.jpg",
    price: 55
  },
  {
    name: "rainshine blend",
    img: "assets/img/Beans/rainshine-blend.jpg",
    price: 35
  },
  {
    name: "rwanda abakundakawa",
    img: "assets/img/Beans/rwanda-abakundakawa.jpg",
    price: 40
  }
];

const menuCombined = [drinkMenu, foodMenu, beansMenu, merchMenu];

const tempDivElement = document.querySelector("template"); //sub-menu template
const subMenu = document.getElementById("sub-menu");
let subMenuElement = document.getElementById("menu-items");

const backdropElement = document.getElementById("backdrop");
backdropElement.addEventListener("click", backdropHandler.bind(null, true));

const btnCancel = document.getElementById("button-cancel");
btnCancel.addEventListener("click", backdropHandler.bind(null, true));

//submenus's event handlers for the menu section
const menuDrink = document.getElementById("drink");
const menuFood = document.getElementById("food");
const menuBeans = document.getElementById("beans");
const menuMerch = document.getElementById("merchandise");
let countMenu = 0;
for (let item of [menuDrink, menuFood, menuBeans, menuMerch]) {
  if (item == menuDrink) {
    item.addEventListener(
      "click",
      subMenuItemsHandler.bind(null, menuCombined[countMenu++], true)
    );
  } else {
    item.addEventListener(
      "click",
      subMenuItemsHandler.bind(null, menuCombined[countMenu++], false)
    );
  }
}

function subMenuItemsHandler(productsList, isCupSize) {
  subMenuHandler(false, subMenu); //open submenu and backdrop; send the submenu as temp element

  for (let item of productsList) {
    let cloneItem = tempDivElement.content.cloneNode(true);
    let selectItem = cloneItem.querySelector("select");
    if (isCupSize) {
      //adding the cupsize option for drinks
      selectItem.classList.remove("hidden");
    } else {
      selectItem.classList.add("hidden");
    }
    selectItem.addEventListener("change", selectPriceHandler); //acc to cupsize the price will change

    let imgItem = cloneItem.querySelector("img");
    imgItem.src = item.img; //src attribute
    imgItem.alt = item.name; //alt attribute
    let pItem = cloneItem.querySelector("p");
    pItem.textContent = item.name; //product name
    let priceItem = cloneItem.querySelector("input");
    let price = item.price[0] ? item.price[0] : item.price; //to check for array of prices
    priceItem.value = price.toFixed(2) + " $";
    let buttonItem = cloneItem.querySelector("button");
    buttonItem.addEventListener("click", order);

    subMenuElement.appendChild(cloneItem);
  }
}

function selectPriceHandler() {
  //acc to the selected cup size, the price will be altered.

  let priceArray = [];
  for (let drink of drinkMenu) {
    //get the price array from the menu for the drink by using DOM
    if (this.previousElementSibling.textContent == drink.name) {
      priceArray = drink.price;
      break;
    }
  }

  switch (
    this.value //this = selectElement
  ) {
    case "short":
      this.nextElementSibling.value = priceArray[0].toFixed(2) + " $";
      break;
    case "tall":
      this.nextElementSibling.value = priceArray[1].toFixed(2) + " $";
      break;
    case "grande":
      this.nextElementSibling.value = priceArray[2].toFixed(2) + " $";
      break;
    case "venti":
      this.nextElementSibling.value = priceArray[3].toFixed(2) + " $";
      break;
  }
}

let tempSubMenu;
function subMenuHandler(isEmpty, menuElement) {
  if (finalOrderList.length == 0 && menuElement.id == "chart") {
    return alert("Please first add product to the chart!");
  }

  if (menuElement) {
    tempSubMenu = menuElement;
  }

  backdropHandler(isEmpty);
}

function backdropHandler(isEmpty) {
  backdropElement.classList.toggle("hidden");
  tempSubMenu.classList.toggle("hidden");
  if (isEmpty && tempSubMenu.id != "chart") {
    //clean all the items from the sub-menu excluding chart
    clearContent(false, subMenuElement, orderListItem); //clean both submenu and preview, but not the order list already sent to the chart
  }
}

function clearContent(isClearAll, ...items) {
  for (item of items) {
    while (item.hasChildNodes()) {
      item.removeChild(item.lastChild);
    }
  }
  if (isClearAll) {
    finalOrderList.splice(0, finalOrderList.length);
    updateChart();
  }

  temporaryOrderList = []; //clear the order list not sent to the chart or sent to the chart

  subTotalUpdate(0, "", subTotalInput, "value"); //clean the subtotal section of the submenu
}
