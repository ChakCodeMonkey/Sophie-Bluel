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
  .then(response => console.log(response.json()))
}

const h2 = document.querySelector('.test');
console.log(h2);

h2.addEventListener('click', function() {
  login()
})

// document.querySelector('#login form').addEventListener('submit', function(e) {
//   e.preventDefault();
//   login()
// })

// .then (data => {
//   localStorage.setItem('token', data.token)
//   window.location.href = 'index.html'
// })


