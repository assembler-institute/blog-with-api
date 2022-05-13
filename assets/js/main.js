const dataContainer = document.getElementById("data");
const url = "http://localhost:3000/";

fetchData
.then(response => response.json())
.then(data => {
    const dataContainer = document.getElementById("data");
    const title = data[1].title;
    dataContainer.append(title);
    console.log(dataContainer)
});