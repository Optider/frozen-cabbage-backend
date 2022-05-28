let apiStatus = document.getElementById("api-status");
let apiContent = document.getElementById("api-content");
let apiURL = "https://api.github.com/users";

fetch(apiURL)
  .then((response) => {
    apiStatus.innerHTML = response.status;
    if (response.status == 200) {
      response.text().then((data) => {
        apiContent.value = data;
      });
    } else {
      apiContent.value = "Failed loading data";
    }
  })
  .catch((e) => {
    apiStatus.innerHTML = "Request Failed";
    apiContent.value = e;
  });
