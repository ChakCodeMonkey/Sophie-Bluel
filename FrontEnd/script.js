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
    let filtersContent = `<button class = "buttonActive" onclick="filterByCategory('all')">Tous</button>`;

    categories.forEach(category => {
        filtersContent += `
            <button class = "buttonRemove" onclick="filterByCategory(${category.id})">${category.name}</button>
        `;
    });

    filtersContainer.innerHTML = filtersContent;
}



function filterByCategory(categoryId) {
    console.log(categoryId);

    const buttons = document.querySelectorAll(".filters button");
    buttons.forEach(button => {
        button.classList.remove("buttonActive");
        button.classList.add("buttonRemove");
    });

    if (categoryId === 'all') {
        const allButton = document.querySelector(".filters button:first-child");
        allButton.classList.remove("buttonRemove");
        allButton.classList.add("buttonActive");
    } else {
        const selectedButton = document.querySelector(`.filters button:nth-child(${categoryId + 1})`);
        selectedButton.classList.remove("buttonRemove");
        selectedButton.classList.add("buttonActive");
    }
}




//appel des fonctions//
getWorks()
getCategories()