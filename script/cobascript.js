document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const totalPriceEl = document.getElementById("total-price");

  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateTotal() {
    const total = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceEl.textContent = total.toFixed(2);
  }

  function renderCart() {
    cartContainer.innerHTML = "";

    if (Object.keys(cart).length === 0) {
      cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
      totalPriceEl.textContent = "0.00";
      return;
    }

    Object.values(cart).forEach(item => {
      const card = document.createElement("div");
      card.className = "bg-white p-4 rounded shadow flex items-center space-x-6";

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-contain">
        <div class="flex-1">
          <h2 class="font-semibold">${item.title}</h2>
          <p class="text-sm text-gray-500">$${item.price.toFixed(2)} each</p>
          <div class="flex items-center space-x-2 mt-2">
            <button class="px-2 bg-gray-200" data-action="decrease" data-id="${item.id}">−</button>
            <span>${item.quantity}</span>
            <button class="px-2 bg-gray-200" data-action="increase" data-id="${item.id}">+</button>
            <button class="ml-4 px-2 py-1 bg-red-500 text-white text-xs rounded" data-action="remove" data-id="${item.id}">Remove</button>
          </div>
        </div>
      `;

      cartContainer.appendChild(card);
    });

    updateTotal();
  }

  cartContainer.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    const action = e.target.dataset.action;

    if (!id || !action) return;

    if (action === "increase") {
      cart[id].quantity += 1;
    } else if (action === "decrease") {
      cart[id].quantity -= 1;
      if (cart[id].quantity <= 0) delete cart[id];
    } else if (action === "remove") {
      delete cart[id];
    }

    saveCart();
    renderCart();
  });

  renderCart();
});
