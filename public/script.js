"use strict";

(function () {

  const BASE_URL = "/jokebook";

  window.addEventListener("load", init);

  function init() {

    getRandomJoke();

    id("view-categories-btn").addEventListener("click", fetchCategories);

    id("new-random-btn").addEventListener("click", getRandomJoke);

    id("add-joke-form").addEventListener("submit", function (e) {
      e.preventDefault();
      submitJoke();
    });


    id("search-btn").addEventListener("click", () => {
      const category = id("category-input").value;
      getJokesByCategory(category);
    });
  }


  function getRandomJoke() {
    fetch(BASE_URL + "/random")
      .then(checkStatus)
      .then(displayRandomJoke)
      .catch(console.error);
  }


  function submitJoke() {

    let formData = new FormData(id("add-joke-form"));
    let jsonBody = JSON.stringify(Object.fromEntries(formData));

    fetch(BASE_URL + "/joke/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonBody,
    })
      .then(checkStatus)
      .then((updatedJokes) => {
        id("add-joke-form").reset();
        displayCategoryJokes(updatedJokes);
      })
      .catch(alert);
  }


  function getJokesByCategory(category) {
    if (!category) return;
    fetch(BASE_URL + "/category/" + category)
      .then(checkStatus)
      .then(displayCategoryJokes)
      .catch((err) => {
        id("jokes-display").textContent = "Category not found.";
      });
  }



  function displayRandomJoke(joke) {
    id("random-setup").textContent = joke.setup;
    id("random-delivery").textContent = joke.delivery;
  }

  function displayCategoryJokes(jokes) {
    const container = id("jokes-display");
    container.innerHTML = "";

    jokes.forEach(joke => {
      let div = document.createElement("div");
      div.classList.add("joke-item");
      div.innerHTML = `<p><strong>${joke.setup}</strong></p><p><em>${joke.delivery}</em></p>`;
      container.appendChild(div);
    });
  }

  function fetchCategories() {
    fetch(BASE_URL + "/categories")
      .then(checkStatus)
      .then((categories) => {
        const list = id("categories-list");
        list.innerHTML = ""; 
        categories.forEach(cat => {
          let li = document.createElement("li");
          li.textContent = cat;
          list.appendChild(li);
        });
      })
      .catch(console.error);
  }



  function id(idName) {
    return document.getElementById(idName);
  }

  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response.json();
  }
})();