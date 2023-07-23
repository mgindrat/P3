const token = localStorage.getItem("auth_token");
//Récupération de l'affichage des images//
const galleryElement = document.getElementsByClassName("gallery")[0];
const galleryMod = document.getElementsByClassName("gallery-mod")[0];


//Affiche la gallery de la page d'accueil
function printGallery(projets) {
  projets.forEach((element) => {
    galleryElement.innerHTML += `<figure>
        <img src="${element.imageUrl}" alt="${element.title}">
        <figcaption>${element.title}</figcaption>
    </figure>`; 
  }); 
}

//Affiche la gallery de la modale

function printGalleryMod(projets) {
  galleryMod.innerHTML="";
  projets.forEach((element) => {
    galleryMod.innerHTML += `<figure id=${element.id}>
        <img src="${element.imageUrl}" alt="${element.title}">
        <button class="trashIcon"><i class="fa-solid fa-trash-can"></i></button>
        <figcaption>éditer </figcaption> 
    </figure>`; 
  }); document.querySelectorAll('.trashIcon').forEach(a => {
    a.addEventListener("click", function(e) {
    deleteWork(e);
    });
}); 
}


//Supprimer dynamiquement les works 
function deleteWork (e) {
  let element = e.target.closest("figure");
  let idValue = element.getAttribute('id');

  console.log(element);

  fetch(`http://localhost:5678/api/works/${idValue}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "authorization" : `Bearer ${token}`
        }})
  
    .then(() => {
        console.log(idValue);
        element.parentNode.removeChild(element);
        document.querySelector('.gallery').innerHTML='';
        afficherToutesLesImages();
    });
}

//





//Récupération des travaux depuis le back-end//
function getProjectsbyCriteria(typeProjet) {
  fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((works) => {
      console.log(works);
      if (typeProjet == "tous") {
        printGallery(works);
      } else if (typeProjet == "obj") {
        printGallery(works.filter((element) => element.categoryId == 1));
      } else if (typeProjet == "flat") {
        printGallery(works.filter((element) => element.categoryId == 2));
      } else if (typeProjet == "hr") {
        printGallery(works.filter((element) => element.categoryId == 3));
      }
    });
}
//Récupération des travaux depuis le back-end pour la Modale//


function getProjectsbyCriteriaMod() {
  fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((works) => {
      console.log(works);
        printGalleryMod(works);
    });
}

//Affichage de tous les travaux//
document.getElementById("btn-all").addEventListener("click", (e) => {
  galleryElement.innerHTML = "";

  getProjectsbyCriteria("tous");
});
 
//Affichage des travaux objets//
document.getElementById("btn-obj").addEventListener("click", (e) => {
  galleryElement.innerHTML = "";

  getProjectsbyCriteria("obj");
});

//Affichage des travaux appartements//
document.getElementById("btn-flat").addEventListener("click", (e) => {
  galleryElement.innerHTML = "";

  getProjectsbyCriteria("flat");
});

//Affichage des travaux hôtels & restaurants//
document.getElementById("btn-hr").addEventListener("click", (e) => {
  galleryElement.innerHTML = "";

  getProjectsbyCriteria("hr");
});

//Fonction qui affiche toutes les images

function afficherToutesLesImages() {
  getProjectsbyCriteria("tous");
}

