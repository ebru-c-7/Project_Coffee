const backButton = document.getElementById("button-back");
const nextButton = document.getElementById("button-next");
const newsArray = document.querySelectorAll(".news-img");
const baritemsArray = document.querySelectorAll(".bar-item");

let activeNews = 0;
baritemsArray[0].style.backgroundColor = "rgba(0,99,65,1)"; //first bar is colored

backButton.addEventListener("click", newsSlide.bind(null, "back"));
nextButton.addEventListener("click", newsSlide.bind(null, "next"));

for (let item of baritemsArray) {
  item.addEventListener("click", event => {
    barSlide(event.target.attributes[0].value); //id attribute of the selected bar
  });
}

const newsSlideHandler = (arg1, arg2, arg3) => {
  //back and next operation
  let inactiveNews = activeNews;
  if (activeNews == arg1) {//returning to the end of the array for the back, to the start of the array for next
    activeNews = arg2;
    newsArray[arg1].classList.add("hidden");
    newsArray[activeNews].classList.remove("hidden");
  } else {
    if (arg3 == "-") {
      newsArray[activeNews++].classList.add("hidden");
    } else if (arg3 == "+") {
      newsArray[activeNews--].classList.add("hidden");
    }
    newsArray[activeNews].classList.remove("hidden");
  }
  barsHandler(activeNews, inactiveNews);
};

const barsHandler = (newsOpened, newsClosed) => {
  baritemsArray[newsOpened].style.backgroundColor = "rgba(0,99,65,1)";
  baritemsArray[newsClosed].style.backgroundColor = "white";
};

function barSlide(activeNewsID) {
  if (activeNewsID - 1 != activeNews) { //clicking on the same bar, then no operation
    let inactiveNews = activeNews;
    activeNews = activeNewsID - 1; //array count modification
    barsHandler(activeNews, inactiveNews);

    for (let news of newsArray) {
      news.classList.add("hidden");
    }
    newsArray[activeNews].classList.remove("hidden");
  }
}

function newsSlide(action) {
  const totalNews = newsArray.length - 1;
  if (action == "next") {
    newsSlideHandler(totalNews, 0, "-");
  } else if (action == "back") {
    newsSlideHandler(0, totalNews, "+");
  }
}

