const API_BASE_URL = "http://localhost:5678/api";

let allWorks = [];
 
//fonctions pour afficher les travaux// 
function getWorks() {
    fetch(`${API_BASE_URL}/works`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            allWorks = data;
            displayWorksInGallery(allWorks);
            displayWorksInModal(allWorks);
        })
        .catch(error => {
            console.log(error);
        });
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

// Fonctions pour afficher les catégories
function getCategories() {
    fetch(`${API_BASE_URL}/categories`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayCategories(data);
        })
        .catch(error => {
            console.log(error);
        });
}

function displayCategories(categories) {
    console.log(categories);

    const filtersContainer = document.querySelector(".filters");
    let filtersContent = `<button class="buttonActive" data-category-id="all">Tous</button>`;

    categories.forEach(category => {
        filtersContent += `
            <button class="buttonRemove" data-category-id="${category.id}">${category.name}</button>
        `;
    });

    filtersContainer.innerHTML = filtersContent;


    const buttons = document.querySelectorAll(".filters button");
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            filterByCategory(button.dataset.categoryId);
        });
    });
}

// Fonction de filtre
function filterByCategory(categoryId) {
    const filteredMedias = categoryId === 'all' ? allWorks : allWorks.filter(media => media.categoryId == categoryId);
    displayWorksInGallery(filteredMedias);

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
        const selectedButton = document.querySelector(`.filters button[data-category-id="${categoryId}"]`);
        selectedButton.classList.remove("buttonRemove");
        selectedButton.classList.add("buttonActive");
    }
}

getWorks();
getCategories();




function checkTokenAndDisplay() {
    const token = localStorage.getItem('token');

    if (token) {
        document.querySelector('.test span').style.display = 'flex';
        document.querySelector('.logoutHeader').style.display = 'block';
        document.querySelector('.modeEdit').style.display = 'flex';
        document.querySelector('.loginHeader').style.display = 'none';
    } else {
        document.querySelector('.test span').style.display = 'none';
        document.querySelector('.logoutHeader').style.display = 'none';
        document.querySelector('.modeEdit').style.display = 'none';
        document.querySelector('.loginHeader').style.display = 'block';
    }
}

function logout() {
    localStorage.removeItem('token');
    checkTokenAndDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    checkTokenAndDisplay();
    
    const logoutHeader = document.querySelector('.logoutHeader');
    if (logoutHeader) {
        logoutHeader.addEventListener('click', logout);
    }
});




document.addEventListener('DOMContentLoaded', (event) => {
    const testSpan = document.querySelector('.test span');
    const modal = document.getElementById('modal');
    const xmark = document.querySelector('.fa-xmark');
    const ajoutPic = document.querySelector('.ajoutPic');
    const valider = document.querySelector('.valider');
    const contenu = document.querySelector('.modalContent');
    const headerModal = document.querySelector('.headerModal');
    const arrow = document.querySelector('.fa-arrow-left');



    testSpan.addEventListener('click', () => {
        modal.style.display = 'block';
    });
 
    xmark.addEventListener('click', () => {
        modal.style.display = 'none';
        valider.style.display = 'none';
        ajoutPic.style.display = 'block';
        contenu.style.display = 'flex';
        headerModal.style.justifyContent = 'flex-end';
        arrow.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const ajoutPic = document.querySelector('.ajoutPic');
    const valider = document.querySelector('.valider');
    const contenu = document.querySelector('.modalContent');
    const headerModal = document.querySelector('.headerModal');
    const arrow = document.querySelector('.fa-arrow-left');

    ajoutPic.addEventListener('click', () => {
        valider.style.display = 'block';
        ajoutPic.style.display = 'none';
        contenu.style.display = 'none';
        headerModal.style.justifyContent = 'space-between';
        arrow.style.display = 'block';
    });
});






















// fonction d'affiche des travaux dans la modal

function displayWorksInModal(medias) {
    const modalContent = document.querySelector(".modalContent");
    let modalContentHTML = "";

    medias.forEach(media => {
        modalContentHTML += `
            <div class="modalWork">
                <img src="${media.imageUrl}" alt="${media.title}">
                <i class="fa-solid fa-trash-can"></i>
            </div>
        `;
    });

    modalContent.innerHTML = modalContentHTML;
}