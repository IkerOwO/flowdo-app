// Login
const form = document.getElementById("login_form");
const messageDiv = document.getElementById("message-container");

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Recogemos los datos del form
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    // Llamada a la API
    const response = await fetch("http://localhost:8080/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Pasamos los datos como JSON
      body: JSON.stringify(data)
    });

    if (response.ok) {
      //const result = await response.json(); => Esto lo agregaremos al register
      setTimeout(() => {
        messageDiv.textContent = 'Logueado con exito!'
        messageDiv.style.color = 'green';
        // Lo mandamos al dashboard
        location.href = "pages/dashboard/index.html";
      }, 3000)
    } else {
      //const error = await response.text(); => Esto lo agregaremos al register
      messageDiv.textContent = 'Error de credenciales!';
      messageDiv.style.color = "red";
    }
  } catch (error) {
    console.log("Error en el backend: ", error);
    messageDiv.textContent = "Error en el backend";
    messageDiv.style.color = "red";
  }
})