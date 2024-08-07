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
            displayCatInSelect(data);
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























// fonction affichage mode admin

function checkTokenAndDisplay() {
    const token = localStorage.getItem('token');

    if (token) {
        document.querySelector('.test span').style.display = 'flex';
        document.querySelector('.logoutHeader').style.display = 'block';
        document.querySelector('.modeEdit').style.display = 'flex';
        document.querySelector('.loginHeader').style.display = 'none';
        document.querySelector('.filters').style.display = 'none';
    } else {
        document.querySelector('.test span').style.display = 'none';
        document.querySelector('.logoutHeader').style.display = 'none';
        document.querySelector('.modeEdit').style.display = 'none';
        document.querySelector('.loginHeader').style.display = 'block';
        document.querySelector('.filters').style.display = 'flex';
    }
}

function logout() {
    localStorage.removeItem('token');
    checkTokenAndDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    checkTokenAndDisplay();
    
    const logoutHeader = document.querySelector('.logoutHeader');
        logoutHeader.addEventListener('click', logout);
});


























// affichage de la modal au boutton modifier, reset du css quand on appuie sur la croix

document.addEventListener('DOMContentLoaded', () => {
    const testSpan = document.querySelector('.test span');
    const modal = document.getElementById('modal');
    const xmark = document.querySelector('.fa-xmark');
    const ajoutPic = document.querySelector('.ajoutPic');
    const valider = document.querySelector('.valider');
    const contenu = document.querySelector('.modalContent');
    const headerModal = document.querySelector('.headerModal');
    const arrow = document.querySelector('.fa-arrow-left');
    const file = document.querySelector('.modalFile');
    const upload = document.getElementById('previewImage');

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
        file.style.display = 'none';
        upload.setAttribute('src', '');

    });
});



// click pour la flèche et la croix dans la modal

document.addEventListener('DOMContentLoaded', (event) => {
    const ajoutPic = document.querySelector('.ajoutPic');
    const valider = document.querySelector('.valider');
    const contenu = document.querySelector('.modalContent');
    const headerModal = document.querySelector('.headerModal');
    const arrow = document.querySelector('.fa-arrow-left');
    const file = document.querySelector('.modalFile');
    const upload = document.getElementById('previewImage');

    ajoutPic.addEventListener('click', () => {
        valider.style.display = 'block';
        ajoutPic.style.display = 'none';
        contenu.style.display = 'none';
        headerModal.style.justifyContent = 'space-between';
        arrow.style.display = 'block';
        file.style.display = 'block';

    });

    arrow.addEventListener('click', () => {
        valider.style.display = 'none';
        ajoutPic.style.display = 'block';
        contenu.style.display = 'flex';
        headerModal.style.justifyContent = 'flex-end';
        arrow.style.display = 'none'; 
        file.style.display = 'none';
        upload.setAttribute('src', '');
    })
});




// fonction d'affiche des travaux dans la modale

function displayWorksInModal(medias) {
    const modalContent = document.querySelector(".modalContent");


    medias.forEach(media => {
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('modalWork');
        mainDiv.id = media.id;

        const mediaImg = document.createElement('img');
        mediaImg.src = media.imageUrl;
        mediaImg.alt = media.title;

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash-can');
        trashIcon.id = media.id

        mainDiv.appendChild(mediaImg)
        mainDiv.appendChild(trashIcon)
        modalContent.appendChild(mainDiv);

        trashIcon.addEventListener('click', () => {
            console.log('coucou')
            deleteWork(media.id);
        });
    });

    modalContent.innerHTML = modalContentHTML;
}




function displayCatInSelect(categories) {
   console.log(categories);

    const catSelect = document.getElementById("catSelect");
    let selectContent = `<option value=""></option>`;

    categories.forEach(category => {
        selectContent += `
            <option value="${category.id}">${category.name}</option>`;
    });

    catSelect.innerHTML = selectContent;
}

function previewImage () {
    var file = document.getElementById("avatar").files;
    if (file.length > 0) {
        var fileReader = new FileReader();

        fileReader.onload = function (event) {
            document.getElementById("previewImage").setAttribute("src", event.target.result);
        };
        fileReader.readAsDataURL(file[0]);
    }
};

// fonctions de delete des images
async function deleteWork(workId) {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_BASE_URL}/works/${workId}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            // Supprime le parent de l'élément avec l'ID workId
            const workElement = document.getElementById(workId);
            if (workElement && workElement.parentNode) {
                workElement.parentNode.removeChild(workElement);
            }
            console.log(`Work with id ${workId} has been deleted`);
        } else {
            console.error('Failed to delete work');
        }
    } catch (error) {
        console.error(error);
    }
}



async function postWork() {
    const token = localStorage.getItem("token")

    const fileInput = document.getElementById("avatar").files[0];
    const titleInput = document.querySelector(".fileTitle input").value;
    const categorySelect = document.getElementById("catSelect").value;

            // récupérer la valeur de l'input file
            // récupérer la valeur de l'input title
            // récupérer la valeur du selecteur de catégorie

    const formData = new FormData();
            // formData.append('title', valeur de l'input title)

    formData.append('image', fileInput);
    formData.append('title', titleInput);
    formData.append('category', categorySelect);

    


    try {
        const response = await fetch(`${API_BASE_URL}/works`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            if (response.ok) {
                // mettre a jour les gallery
                console.log('oui oui baguette');
            }
    } catch (error) {
        console.log(error);
    }
}



// fonction pour changer la couleur du bouton .valider si il y a une valeurs dans les input et le select

function changeColor() {
    const avatarInput = document.getElementById('avatar').files.length > 0;
    const titleInput = document.querySelector('.fileTitle input').value.trim() !== '';
    const categorySelect = document.getElementById('catSelect').value.trim() !== '';

    const validerButton = document.querySelector('.valider');

    if (avatarInput && titleInput && categorySelect) {
        validerButton.style.backgroundColor = '#1D6154';
        validerButton.disabled = false;
    } else {
        validerButton.style.backgroundColor = '';
        validerButton.disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const avatarInput = document.getElementById('avatar');
    const titleInput = document.querySelector('.fileTitle input');
    const categorySelect = document.getElementById('catSelect');
    const validerButton = document.querySelector('.valider');

    avatarInput.addEventListener('change', changeColor);
    titleInput.addEventListener('input', changeColor);
    categorySelect.addEventListener('change', changeColor);
    validerButton.addEventListener('click', postWork);
});