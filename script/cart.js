    const cartContainer = document.getElementById("cart-container");
    const totalPriceEl = document.getElementById("total-price");
    const totalSelectedEl = document.getElementById("total-selected");

    let cart = [];

    function loadCart() {
      cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.map(item => ({
        ...item,
        quantity: item.quantity ?? item.qty ?? 1,
        selected: item.selected ?? true
      }));
    }

    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    function renderCart() {
      cartContainer.innerHTML = "";
      let total = 0;
      let selectedCount = 0;

      if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="text-white text-center">Cart is empty</p>`;
        totalPriceEl.innerText = "$0.00";
        totalSelectedEl.innerText = "0 item selected";
        return;
      }

      cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "bg-white rounded-lg shadow flex items-center p-4";

        cartItem.innerHTML = `
          <input type="checkbox" class="mr-4 w-5 h-5 accent-black" ${item.selected ? "checked" : ""} onchange="toggleSelect(${index})" />
          <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-contain mr-4" />
          <div class="flex-1">
            <h3 class="font-semibold text-sm">${item.title}</h3>
            <p class="text-sm text-gray-500">Size: ${item.size}</p>
            <p class="text-sm text-gray-500">Qty: ${item.quantity}</p>
            <p class="font-bold text-sm mt-1">$${item.price.toFixed(2)}</p>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="removeItem(${index})" class="text-gray-500 hover:text-red-500">
              <img src="../image/trashbin (1).png" alt="hapus" class="h-5 w-5">
            </button>
            <div class="flex items-center border rounded px-2">
              <button onclick="decreaseQty(${index})" class="px-1 text-lg">-</button>
              <span class="px-2">${item.quantity}</span>
              <button onclick="increaseQty(${index})" class="px-1 text-lg">+</button>
            </div>
          </div>
        `;
        cartContainer.appendChild(cartItem);

        if (item.selected) {
          total += subtotal;
          selectedCount += item.quantity;
        }
      });

      totalPriceEl.innerText = `$${total.toFixed(2)}`;
      totalSelectedEl.innerText = `${selectedCount} item${selectedCount !== 1 ? "s" : ""} selected`;
    }

    function toggleSelect(index) {
      cart[index].selected = !cart[index].selected;
      saveCart();
      renderCart();
    }

    function increaseQty(index) {
      cart[index].quantity++;
      saveCart();
      renderCart();
    }

    function decreaseQty(index) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        removeItem(index);
        return;
      }
      saveCart();
      renderCart();
    }

    function removeItem(index) {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }

    function checkout() {
      const selectedItems = cart.filter(item => item.selected);

      if (selectedItems.length === 0) {
        alert("Harus pilih minimal 1 barang!");
        return;
      }

      // Simpan item terpilih ke localStorage
      localStorage.setItem("checkoutItems", JSON.stringify(selectedItems));

      // Pindah ke halaman checkout
      window.location.href = "checkout.html";
    }

    // Initialize
    loadCart();
    renderCart();