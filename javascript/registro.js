const registroForm = document.getElementById("registroForm");

registroForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:3307/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: "Usuario", email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Registro exitoso");
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error("Error al registrar:", error);
        alert("No se pudo completar el registro");
    }
});
