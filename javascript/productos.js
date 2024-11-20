// productos.js
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".grid");
    let category = window.location.pathname.split("/").pop()
    category = category.replace(".html","")

    const response = await fetch("http://localhost:5000/products?category="+category);
    const products = await response.json();

    if (response.ok) {
        
        container.innerHTML = products.map(product => `
            <div class="descripcion">
                <img src="../img/${product.name.toLowerCase().replace(/\s/g, "")}.jpeg" alt="${product.name}">
                <h1>${product.name}</h1>
                <p>${product.price} - Descripción: ${product.description}</p>
                <button onclick='addToCart(${JSON.stringify(product)})'>Agregar al Carrito</button>
            </div>
        `).join("");
    } else {
        alert("Error al cargar los productos");
    }
});

function addToCart(product) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existingItem = carrito.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        carrito.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
}




