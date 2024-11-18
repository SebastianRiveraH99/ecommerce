// productos.js
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".grid");

    const response = await fetch("http://localhost:5000/products");
    const products = await response.json();

    if (response.ok) {
        container.innerHTML = products.map(product => `
            <div class="descripcion">
                <img src="../img/${product.name.toLowerCase().replace(/\s/g, "")}.jpeg" alt="${product.name}">
                <h1>${product.name}</h1>
                <p>${product.price} - Stock: ${product.stock}</p>
            </div>
        `).join("");
    } else {
        alert("Error al cargar los productos");
    }
});

function addToCart(product) {
    const existingItem = carrito.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        carrito.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
}

container.innerHTML = products.map(product => `
    <div class="descripcion">
        <img src="../img/${product.name.toLowerCase().replace(/\s/g, "")}.jpeg" alt="${product.name}">
        <h1>${product.name}</h1>
        <p>${product.price} - Stock: ${product.stock}</p>
        <button onclick='addToCart(${JSON.stringify(product)})'>Agregar al Carrito</button>
    </div>
`).join("");

