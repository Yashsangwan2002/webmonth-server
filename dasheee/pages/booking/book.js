var count = 0;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
var seats = document.getElementsByClassName("seat");
for (var i = 0; i < seats.length; i++) {
  var item = seats[i];

  item.addEventListener("click", (event) => {
    var price = 150;

    if (
      !event.target.classList.contains("occupied") &&
      !event.target.classList.contains("selected")
    ) {
      count++;

      var total = count * price;
      event.target.classList.add("selected");

      document.querySelector(".seats").innerHTML = `No of seats:  ${count}`;
      document.querySelector(".amount").innerHTML = `Bill Amount:  ${total}`;
    }
  });
}
let Date = document.getElementById("date");

Date.addEventListener("change", (event) => {
  var Datee = event.target.value;
  document.querySelector(".dates").innerHTML = `Date:  ${Datee}`;
});

const urlParams = new URLSearchParams(location.search);
let a = [];
let z = 0;
for (const value of urlParams.values()) {
  console.log(value);
  a[z] = value;
  z++;
}
document.getElementById("title").innerHTML = a[0];

document.getElementById("movimg").innerHTML = `
             <img src="${
               a[1] ? IMG_URL + a[1] : "http://via.placeholder.com/1080x1580"
             }" alt=""  height="80%" width="70%">`;

//ticket
document.getElementById("log").addEventListener("click", function () {
  document.querySelector(".Movie-Name").innerHTML = `Movie-Name:  ${a[0]}`;

  document.querySelector("body").style.overflow = "hidden";

  document.querySelector(".BOX").style.display = "flex";
});

document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".BOX").style.display = "none";

  document.querySelector("body").style.overflow = "scroll";
});

var key = localStorage.getItem("email");
console.log(key);

//saving data into database
const apiUrl = "http://localhost:8080 ";

const signInForm = document.querySelector(".button");

signInForm.addEventListener("click", (event) => {
  event.preventDefault();

  const bookdate = document.getElementById("date");

  const date = bookdate.value;
  const email = key;
  const movieName = a[0];

  fetch(`${apiUrl}/booknow/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movieName, email, date }),
  })
    .then(() => (location.href = "/pages/main/main.html"))
    // .then((data) => {
    //   const { token } = data;

    //   if (token) {
    //     localStorage.setItem("jwt", token);
    //     location.href = "/pages/main/main.html";
    //   } else {
    //     alert("SignIn Again");
    //   }
    // })
    .catch((err) => {
      alert("Error booking!!!");
      console.log(err);
    });
});
