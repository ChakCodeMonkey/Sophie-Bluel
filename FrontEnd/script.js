const API_BASE_URL = "http://localhost:5678/api";

function getWorks() {
    fetch (`${API_BASE_URL}/works`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        displayWorksInGallery(data)
    })
    .catch(error => {console.log(error)})
}

function displayWorksInGallery(medias) {
    console.log(medias)
}

getWorks()