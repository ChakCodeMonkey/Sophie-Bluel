const API_BASE_URL = "http://localhost:5678/api";


function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email, password)

  let data = {
      email: email,
      password: password,
  };

  fetch(`${API_BASE_URL}/users/login` , {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
          'Content-type' : 'application/json'
      },
  })
  .then(response => {
    if (!response.ok) {
      throw new error('Faute de frappe email ou password');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = 'index.html';

      
    } else {
      console.error('Pas de token');
    }
  })
  .catch(error => {
    console.error('Il y a eu un problème', error);
  });

}

document.querySelector('#login form').addEventListener('submit', function(e) {
  e.preventDefault();
  login()
})

