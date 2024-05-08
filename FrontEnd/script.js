const API_BASE_URL = "http://localhost:5678/api";

//fonctions pour afficher les travaux//
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
    const gallery = document.querySelector(".gallery");
    let galleryContent = "";

    medias.forEach(media => {
        galleryContent += `
            <figure>
                <img src="${media.imageUrl}" alt="${media.title}">
                <figcaption>${media.title}</figcaption>
            </figure>
        `;
    });

    gallery.innerHTML = galleryContent;
}





//fonctions pour afficher les catégories//
function getCategories() {
    fetch (`${API_BASE_URL}/categories`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        displayCategories(data)
    })
    .catch(error => {console.log(error)})
}

function displayCategories(categories) {
    console.log(categories)

    const filtersContainer = document.querySelector(".filters");
    let filtersContent = `<button onclick="filterByCategory('all')">Tous</button>`;

    categories.forEach(category => {
        filtersContent += `
            <button onclick="filterByCategory(${category.id})">${category.name}</button>
        `;
    });

    filtersContainer.innerHTML = filtersContent;
}







//appel des fonctions//
getWorks()
getCategories()