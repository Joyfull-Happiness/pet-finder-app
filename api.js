const form = document.querySelector("form");
const apiData = document.querySelector("#result");
// const zipCode = document.querySelector(".zipCode");
// const petType = document.querySelector(".typeOfPet");
const cardContainer = document.querySelector(".card-container");
const card = document.querySelector(".card");

let animalType;

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());
  console.log("dataObj:", dataObject);
  getAdoptablePets(dataObject);
  form.reset();
}

function getToken() {
  return fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "RKFr0AkbT3ZzFaREGLt448gV8Cu8sfD8e8ddpnAHGVF7FB417r",
      client_secret: "8QzPlRlXHY5dSAl5Q5yNHDvCK0afstKJoyWttXzM",
    }),
  })
    .then((res) => res.json())
    .then((data) => data.access_token);
}

function getAdoptablePets(formData) {
  //first need to call the getToken function, then once that value is returned, you can use the token in the API call
  //they will have to research how to build their link

  getToken().then((token) => {
    fetch(
      `https://api.petfinder.com/v2/animals?type=${formData.typeOfPet}&location=${formData.zipCode}`,
      //note the token is being used in the header, which they will learn more about in backend
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // showData(zipCode, petType); pass through data from API NOT data object
      })
      .catch((error) => console.error("Error:", error));
  });
}
// use dot and bracket notation to find data in API. like in horoscopes

// const showData = (zipCode, petType) => {
//   for (let item of formData.typeOfPet  ) {
// 			cardContainer.innerHTML += `<div class="card"> <h3>${item.title}</h3>
// 		<h2>${item.author}</h2>
// 		<h3>${item.rank}</h3>
// 		<img src="${item.book_image}" alt="${item.description}"/></div>`;
