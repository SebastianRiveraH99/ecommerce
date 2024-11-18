const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Inicio de sesión exitoso");
            // Redirigir o guardar token si es necesario
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("No se pudo iniciar sesión");
    }
});
