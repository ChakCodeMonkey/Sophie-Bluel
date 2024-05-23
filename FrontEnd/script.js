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


function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let data = {
        email: email
        password: password
    };

    fetch(`${API_BASE_URL}/users/login` , {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-type' : 'application/json'
        },
    })
}

document.querySelector('#login form').addEventListener('submit', function(e) {
    e.preventDefault();
    login()
})

.then (data => {
    localStorage.setItem('token', data.token)
    window.location.href = 'index.html'
})



