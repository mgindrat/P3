//Affiche tous les travaux (les boutons sont hidden avec un style dans HTML)
fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((works) => {
       
    printGallery(works);

        
});
///////////////////////////////////////////////////////////////////
//////////////////////////////////Modal////////////////////////////
let modal = null;

function checkAllprojets(e) {
  fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((works) => {
       
    printGalleryMod(works);
    openModal(e);

});
}

//Fonction qui ouvrira la modale 1 
const openModal = function (e) {
  
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    modal = target;
    modal.addEventListener('click', closeModal);
    
    

    //Ferme les modales 1et2 lorsque je clique sur les div qui ont la classe js-modal-close()//
    const closeButtons = document.querySelectorAll('.js-modal-close');
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', closeModal);
    }
    /* modal.querySelector('.js-modal-close').addEventListener('click', closeModal);*/
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
};


//Fonction qui fermera la modale 1
const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display ="none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
};

//Lorsque l'on est sur la modale2 on revient sur la modale1 en cliquant sur la classe js-modal-back
const modalBackBtn = document.querySelector('.js-modal-back');
modalBackBtn.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById("modal-content").setAttribute('style', 'display: block');
    document.getElementById("form2").setAttribute('style', 'display: none');
});

//Arrête la propagation des événements de clic//

const stopPropagation = function (e){
    e.stopPropagation();
}

//Pour chaque liens (a) des classes js-modal dès qu'on clique dessus ça ouvrira la modale//
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", checkAllprojets);

});

//Si on fait Esc ou Escape alors on ferme la modale//
window.addEventListener('keydown', function (e) {
 if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
 }
});




// Événement pour ouvrir la deuxième modale et fermer la première
const addPhotoBtn = document.querySelector('.modal-add-btn');
addPhotoBtn.addEventListener('click', function(e) {
e.preventDefault();
stopPropagation(e);
document.getElementById("modal-content").setAttribute('style', 'display: none');
document.getElementById("form2").setAttribute('style', 'display: block');
stopPropagation(e);
});




//Ajout d'un projet dynamiquement
const form = document.querySelector('.add-form');
const imageInput = document.getElementById('image');
const titleInput = document.getElementById('title');
const categoryInput = document.getElementById('category');

const validateButton = document.querySelector('.btnM2');
validateButton.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Récupérer les valeurs du formulaire
  const image = imageInput.files[0];
  const title = titleInput.value;
  const category = parseInt(categoryInput.value);
  //valeur convertie en nbr entier avec "parseInt()" !
 
  
  
  const formData = new FormData();
  formData.append('image', image);
  formData.append('title', title);
  formData.append('category', category);
  

if (image && title && category) {
  fetch(`http://localhost:5678/api/works`, {
      method: 'POST',
      headers: {'Authorization': `Bearer ${token}`},
      body: formData
    })
    .then(response => {
      document.querySelector('.gallery').innerHTML='';
        afficherToutesLesImages();
      return response.json(); 
    })

    .then(() => {
      // Fermer la modal après avoir cliquer sur Valider
      modal.style.display = 'none';
    })

    .catch(error => {
      //console.error('Erreur :', error);
    });
} else {
  alert("Tous les champs sont obligatoires !")
}
});

 
//Faire une preview lors de l'upload//

function previewImage() {
  let preview = document.getElementById('preview');
  let image = imageInput.files[0];
  let reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (image) {
    reader.readAsDataURL(image);
  } else {
    preview.src = "";
  }
}

//Fonction hideUpload (cache bouton et p)//

function hideUpload() {
  document.querySelector('.hideWhileClick').style.display = 'none';
} 

const hide = document.querySelector(".btn.add-btn-form2");
hide.addEventListener('click', hideUpload);






 




