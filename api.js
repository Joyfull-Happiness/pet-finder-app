// 📝 here I'm creating the variables for the form, the api data (to be held below the form), the container for the animal cards that will be displayed to the user and an empty variable to hold the animal type.

const form = document.querySelector("form");
const apiData = document.querySelector("#result");
// const zipCode = document.querySelector(".zipCode");
// const petType = document.querySelector(".typeOfPet");
const cardContainer = document.querySelector(".card-container");

let animalType;

// 📝 now I am attaching an event listener to the form that says when the person clicks submit, activate the on form submit function.

// 📝In the on form submit function, I have the boiler plate code that is creating the variables needed for the form to be registered by the javaScript. It is also console logging the data object and is calling the third function.

// 📝 because this API source uses tokens, we have to set up another function specifically to gather the token using boiler plate code and the client ID and client secret that was given to me when I registered to have access to the API
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

// 📝 In this third function I’m making an APIcall that passes through a parameter (a place holder that I used in function 1 to pass through the dataObject info)
// 📝  I am using boiler plate code to fetch the api link and show the data of the api to the user (first checking if it works via a console.log)

// 📝 I am also using dot notation to specify the data that I want to show from the API to the user activating the fourth function
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
        showData(data.animals);
        // pass through data from API NOT data object
      })
      .catch((error) => console.error("Error:", error));
  });
}
// use dot and bracket notation to find data in API. like in horoscopes

// 📝 this is the fourth function that is showing the data to the user. I'm using inner HTML to contain the for loop that is looping through each animal within the API data and I'm telling the computer to show to the user the name, breed, color, description  and image of each animal that is within the parameters of the user choices of zip code and animal type

const showData = (animals) => {
  cardContainer.innerHTML = "";
  for (let item of animals) {
    cardContainer.innerHTML += `
      <div class="card"> 
      
     <img src="${item.photos[0]?.small}" alt="${item.description}"/>
     <h3>${item.name}</h3>
		<p>${item.breeds.primary}</p>
		<p>${item.colors.primary}</p>
     <p>${item.description}</p> </div>
		`;
  }
};
