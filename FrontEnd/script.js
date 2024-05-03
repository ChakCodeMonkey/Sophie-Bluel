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
    let currentButton = null;

    const handleButtonClick = (event) => {
        const clickedButton = event.target;
        if (clickedButton !== currentButton) {
            currentButton.classList.remove("buttonActive");
            currentButton.classList.add("buttonRemove");
            clickedButton.classList.remove("buttonRemove");
            clickedButton.classList.add("buttonActive");
            currentButton = clickedButton;
            console.log(`categorie : ${clickedButton.textContent}`);
        }
    };

    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.classList.add("buttonActive");
    allButton.addEventListener("click", handleButtonClick);
    filtersContainer.appendChild(allButton);
    currentButton = allButton;

    categories.forEach(category => {
        const categoryButton = document.createElement("button");
        categoryButton.textContent = category.name;
        categoryButton.classList.add("buttonRemove");
        categoryButton.addEventListener("click", handleButtonClick);
        filtersContainer.appendChild(categoryButton);
    });
}


//appel des fonctions//
getWorks()
getCategories()

