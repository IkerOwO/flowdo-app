// Login
const form = document.getElementById("login_form");
const errorContainer = document.getElementById("error-message-container");
let errorMessage = null;

async function loadErrorComponent() {
  if (!errorContainer) return;

  const response = await fetch("components/errorMessage/index.html");
  const html = await response.text();
  errorContainer.innerHTML = html;
  errorMessage = document.getElementById("error-message");
}

function showError(message) {
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
  }
}

function clearError() {
  if (errorMessage) {
    errorMessage.textContent = "";
    errorMessage.hidden = true;
  }
}

await loadErrorComponent();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError();

  if (!form.checkValidity()) {
    form.reportValidity();
    showError("Completa todos los campos correctamente.");
    return;
  }

  try {
    // La respuesta hace un fetch a la url de la API
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        // La API espera un JSON
        "Content-Type": "application/json"
      },
      // Transformamos los inputs a formato JSON
      body: JSON.stringify({
        email: form.elements.email_input.value.trim(),
        password: form.elements.pass_input.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    console.log("Login exitoso:", data);
  } catch (error) {
    console.error("Error:", error.message);
    showError(error.message);
  }
});