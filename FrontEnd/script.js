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