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

    const filterButtons = document.querySelectorAll('.filters button');

    filterButtons[0].classList.add('buttonActive');
    filterButtons.forEach((button, index) => {
        if (index !== 0) {
            button.classList.add('buttonRemove');
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('buttonActive');
            filterButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.classList.remove('buttonActive');
                }
            });

            filterButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.classList.add('buttonRemove');
                }
            });
        });
    });
}

//appel des fonctions//
getWorks()
getCategories()