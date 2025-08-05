document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-grid");

  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(products => {
      products.forEach(product => {
        const card = document.createElement("div");
        card.className = "bg-white text-black p-4 rounded shadow";
        card.innerHTML = `
          <img src="${product.image}" alt="${product.title}" class="h-40 object-contain mx-auto mb-2">
          <h2 class="text-sm font-bold mb-1">${product.title}</h2>
          <p class="mb-2 font-semibold">$${product.price}</p>
          <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm" onclick='addToCart(${JSON.stringify(product)})'>
            Add to Cart
          </button>
        `;
        container.appendChild(card);
      });
    });
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (cart[product.id]) {
    cart[product.id].quantity += 1;
  } else {
    cart[product.id] = { ...product, quantity: 1 };
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "cart.html";
}
