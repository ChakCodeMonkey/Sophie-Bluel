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

    const gallery = document.querySelector(".gallery");

    medias.forEach( media => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = media.imageUrl;
        img.alt = media.title;
        figcaption.textContent = media.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);

        gallery.appendChild(figure);
    })
}

function getCategories() {
    fetch (`${API_BASE_URL}/categories`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        displayCategories(data)
    })
    .catch(error => {console.log(error)})
}

function displayCategories(categorie) {
    console.log(categorie)
}

getWorks()
getCategories()

