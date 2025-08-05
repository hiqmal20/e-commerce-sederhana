const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Inisialisasi variabel agar bisa diakses di luar fungsi
let selectedSize = '';
let currentProduct = null;

async function detailproduct(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();
    currentProduct = product; // simpan agar bisa diakses di buyNow()

    const container = document.getElementById("detail");

    container.innerHTML = `
      <!-- Left Section -->
      <div class="space-y-6">
        <div class="bg-white rounded-xl p-4 border-2 border-blue-500 flex justify-center items-center">
          <img src="${product.image}" alt="${product.title}" class="w-72 h-auto object-contain" />
        </div>

        <div class="bg-gray-100 text-black rounded-xl p-4">
          <h3 class="text-lg font-semibold mb-2">Description</h3>
          <p class="text-sm leading-relaxed">${product.description}</p>
        </div>
      </div>

      <!-- Right Section -->
      <div class="space-y-6">
        <div>
          <button class="bg-gray-300 text-black font-medium px-4 py-2 rounded-full">
            ${product.title}
          </button>
        </div>

        <!-- Size Chart -->
        <div>
          <p class="text-sm mb-2 font-medium">Size Chart</p>
          <div id="size-buttons" class="grid grid-cols-3 gap-3">
            ${['1', '2', '3'].map(size => `
              <button data-size="${size}" class="size-btn border border-white rounded px-4 py-2 hover:bg-white hover:text-black">${size}</button>
            `).join('')}
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex flex-col gap-4">
          <button onclick="addToCart(${product.id})" class="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition">
            ADD TO CART
          </button>
        
          <button onclick="buyNow()" class="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition">
            BUY
          </button>
        </div>
      </div>
    `;

    // Size button logic
    const sizeButtons = container.querySelectorAll('.size-btn');
    sizeButtons.forEach(button => {
      button.addEventListener('click', () => {
        sizeButtons.forEach(btn => btn.classList.remove('bg-white', 'text-black'));
        sizeButtons.forEach(btn => btn.classList.add('hover:bg-white', 'hover:text-black'));
        button.classList.add('bg-white', 'text-black');
        button.classList.remove('hover:bg-white', 'hover:text-black');
        selectedSize = button.dataset.size;
      });
    });

  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
  }
}


// Tambah ke cart
window.addToCart = function (id) {
  if (!selectedSize) {
    alert("Please select a size.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === id && item.size === selectedSize);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: id,
      title: currentProduct.title,
      price: currentProduct.price,
      image: currentProduct.image,
      size: selectedSize,
      qty: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = "cart.html";
};

// BUY langsung ke checkout
window.buyNow = function () {
  if (!selectedSize) {
    alert("Please select a size.");
    return;
  }

  const buyNowItem = {
    id: currentProduct.id,
    title: currentProduct.title,
    price: currentProduct.price,
    image: currentProduct.image,
    size: selectedSize,
    quantity: 1,
    selected: true
  };  

  localStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));
  window.location.href = "checkout.html";
};

detailproduct(productId);
