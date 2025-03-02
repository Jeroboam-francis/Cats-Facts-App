document.addEventListener("DOMContentLoaded", () => {
  const factsInput = document.getElementById("facts");
  const photosInput = document.getElementById("photos");
  const factsButton = document.querySelector(".box:first-child button");
  const photosButton = document.querySelector(".box:last-child button");
  const resultsContainer = document.querySelector(".results-container");
  const errorContainer = document.getElementById("error-container");

  const FACTS_API = "https://meowfacts.herokuapp.com/";
  const IMAGES_API = "https://api.thecatapi.com/v1/images/search?limit=";


  function displayError(message) {
    errorContainer.innerHTML = `<p class="error-message">${message}</p>`;
    errorContainer.style.display = "block";
  }

  function removeResults() {
    resultsContainer.innerHTML = "";
    errorContainer.innerHTML = "";
    errorContainer.style.display = "none";
  }

  factsButton.addEventListener("click", async () => {
    let count = Math.min(parseInt(factsInput.value) || 1, 50); 
    removeResults();

    try {
      const response = await fetch(`${FACTS_API}?count=${count}`);
      const data = await response.json();
      
      const ol = document.createElement("ol");
      resultsContainer.appendChild(ol);
      
      data.data.forEach(fact => {
        const li = document.createElement("li");
        li.textContent = fact;
        li.classList.add("fact");
        ol.appendChild(li);
      });
    } catch (error) {
      displayError("Failed to fetch cat facts.");
    }
  });

  photosButton.addEventListener("click", async () => {
    let count = Math.min(parseInt(photosInput.value) || 1, 10); 
    removeResults();

    try {
      const response = await fetch(IMAGES_API + count);
      const data = await response.json();
      
      data.forEach(image => {
        const img = document.createElement("img");
        img.src = image.url;
        img.alt = "Cat";
        img.classList.add("cat-image");
        resultsContainer.appendChild(img);
      });
    } catch (error) {
      displayError("Failed to fetch cat images.");
    }
  });
});