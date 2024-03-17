
const showMoreBtn = document.getElementById("btn_show_more");
const showMoreInfo = document.getElementById("movie_show_more_container");

showMoreBtn.addEventListener("click", () => {
    console.log("Show more button clicked");
    // Checking if the additional information is currently hidden
    if (showMoreInfo.style.display === "none" || showMoreInfo.style.display === "") {
        showMoreBtn.textContent = "Moins d'informations"; // Change button text to indicate hiding information
        showMoreInfo.style.display = "block"; // Show the additional information
    } else {
        showMoreBtn.textContent = "Plus d'informations"; // Change button text to indicate showing more information
        showMoreInfo.style.display = "none"; // Hide the additional information
    }
});

