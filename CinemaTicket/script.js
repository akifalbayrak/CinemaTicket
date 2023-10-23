const container = document.querySelector(".container");
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
const select = document.querySelector("#movie");
const seats = document.querySelectorAll(".seat");

getFromLocalStorage();
calculateTotal();

container.addEventListener("click", function (e) {
  if (select.selectedIndex == 0) {
    alert("choose movie");
  } else {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("reserved")
    ) {
      e.target.classList.toggle("selected");
      calculateTotal();
    }
  }
});

select.addEventListener("change", function () {
  calculateTotal();
});

function calculateTotal() {
  const selectedSeats = container.querySelectorAll(".seat.selected");

  const selectedSeatsArr = [];
  const seatsArr = [];

  selectedSeats.forEach(function (seat) {
    selectedSeatsArr.push(seat);
  });
  seats.forEach(function (seat) {
    seatsArr.push(seat);
  });

  // [1,3,5]

  let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
    return seatsArr.indexOf(seat);
  });

  let selectedSeatCount = selectedSeats.length;
  let price = select.value;
  count.textContent = selectedSeatCount;
  amount.textContent = price * selectedSeatCount;

  saveToLocalStorage(selectedSeatIndexs);
}

function saveToLocalStorage(indexs) {
  localStorage.setItem("selectedSeats", JSON.stringify(indexs));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}

function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = JSON.parse(
    localStorage.getItem("selectedMovieIndex")
  );
  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}
