const form = document.getElementById("login-form");

function validerEmail(email) {
  const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return res.test(String(email).toLowerCase());
}

//Lorsque l'on entre le bon email/pass alors on est redirigé vers la page "connecter"
form.addEventListener("submit", (e) => {
  e.preventDefault(); //supprime comportement par défaut du navigateur

  const email = document.getElementById("email");
  const mdp = document.getElementById("mdp");

  if (validerEmail(email.value.trim())) {
    fetch("http://localhost:5678/api/users/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        email: email.value.trim(),
        password: mdp.value.trim(),
      }),
    })
      .then((rep) => rep.json())
      .then((response) => {
      
        if (response.userId) {
          localStorage.setItem("auth_token", response.token);
          window.location.href = "connecter.html";
        } else {
          alert("Erreur dans l’identifiant ou le mot de passe");
        }
      });
  }
});
