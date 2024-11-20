// carrito.js
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Referencias a elementos del DOM
const cartTableBody = document.querySelector("#cart-table tbody");
const totalAmount = document.querySelector("#total-amount");
const clearCartButton = document.getElementById("clear-cart");
const checkoutButton = document.getElementById("checkout");

// Renderizar el carrito
function renderCart() {
    cartTableBody.innerHTML = "";

    carrito.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <button onclick="changeQuantity(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </td>
            <td>${(item.price * item.quantity).toFixed(2)}</td>
            <td>
            
                <button onclick="removeItem(${index})">Eliminar</button>
            </td>
        `;

        cartTableBody.appendChild(row);
    });

    const total = carrito.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalAmount.textContent = `Total: $${total.toFixed(2)}`;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cambiar cantidad
function changeQuantity(index, amount) {
    carrito[index].quantity += amount;

    if (carrito[index].quantity <= 0) {
        carrito.splice(index, 1); // Eliminar si la cantidad llega a cero
    }

    renderCart();
}

// Eliminar un producto
function removeItem(index) {
    carrito.splice(index, 1);
    renderCart();
}

// Vaciar el carrito
clearCartButton.addEventListener("click", () => {
    carrito = [];
    renderCart();
});

// Procesar compra (puedes agregar lógica aquí para enviar datos al backend)
checkoutButton.addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    alert("Compra procesada con éxito");
    carrito = [];
    renderCart();
});

// Inicializar
renderCart();
