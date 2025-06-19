const form = document.querySelector(".card");
const apiData = document.querySelector("#result");

let animalType;

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());
  console.log(dataObject);
  getAdoptablePets(dataObject);
  form.reset();
}
