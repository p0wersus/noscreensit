const CLOUDFLARE_WORKER_URL = "https://broad-limit-75b5.mancosboost.workers.dev/"; 

function registrar() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("passwordConfirm").value;
    var mensaje = document.getElementById("mensaje");

    if (password !== confirmPassword) {
        mensaje.innerText = "Las contraseñas no coinciden";
        mensaje.style.color = "red";
        return;
    }

    var formData = new URLSearchParams();
    formData.append("action", "register");
    formData.append("email", email);
    formData.append("password", password);

    fetch(CLOUDFLARE_WORKER_URL, {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
    .then(response => response.text())
    .then(data => {
        mensaje.innerText = data;
        mensaje.style.color = (data === "Registro exitoso") ? "green" : "red";

        if (data === "Registro exitoso") {
            alert("Registro exitoso, ahora inicia sesión");
            window.location.href = "inicio.html"; 
        }
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        mensaje.innerText = "Error en el servidor";
        mensaje.style.color = "red";
    });
}

function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var mensaje = document.getElementById("mensaje");

    var formData = new URLSearchParams();
    formData.append("action", "login");
    formData.append("email", email);
    formData.append("password", password);

    fetch(CLOUDFLARE_WORKER_URL, {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
    .then(response => response.text())
    .then(data => {
        mensaje.innerText = data;
        mensaje.style.color = (data === "Inicio de sesión exitoso") ? "green" : "red";

        if (data === "Inicio de sesión exitoso") {
            alert("Inicio de sesión exitoso");
            window.location.href = "index.html";
        }
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        mensaje.innerText = "Error en el servidor";
        mensaje.style.color = "red";
    });
}