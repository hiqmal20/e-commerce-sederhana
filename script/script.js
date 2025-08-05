// Fungsi untuk mengambil dan menampilkan data produk, bisa disaring dengan query pencarian
async function ambilData(query = "") {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    const productContainer = document.getElementById("product");
    productContainer.innerHTML = "";

    const hasilFilter = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    if (hasilFilter.length === 0) {
      productContainer.innerHTML = `<p class="text-center text-red-600">Produk tidak ditemukan</p>`;
      return;
    }

    hasilFilter.forEach(product => {
      const card = document.createElement("div");
      card.innerHTML = `
        <div class="bg-white text-black rounded-xl shadow-md p-4 flex flex-col items-center justify-between h-70 w-70">
          <a href="detailproduct.html?id=${product.id}" class="w-full text-center">
            <img src="${product.image}" alt="${product.title}" class="h-30 w-auto object-contain mb-4 mx-auto" />
            <h3 class="font-semibold text-center text-base mb-2 truncate mx-auto">${product.title}</h3>
            <p class="text-xs text-center truncate mx-auto">${product.description}</p>
          </a>
          <div class="flex justify-between items-center w-70 px-4 mt-2 p-2">
            <p class="text-green-600 font-semibold text-md">$${product.price}</p>
            <p class="text-amber-500 font-semibold text-md">⭐ ${product.rating.rate} (${product.rating.count})</p> 
          </div>
        </div>`;
      productContainer.appendChild(card);
    });
  } catch (error) {
    const productContainer = document.getElementById("product");
    productContainer.innerHTML = `<p class="text-red-500">Gagal memuat produk.</p>`;
    console.error("Gagal memuat produk:", error);
  }
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex(item => item.id === productId);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produk ditambahkan ke keranjang!");
  } else {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(res => res.json())
      .then(product => {
        product.quantity = 1;
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Produk ditambahkan ke keranjang!");
      })
      .catch(err => {
        console.error("Gagal menambahkan produk:", err);
      });
  }
}

// Event Listener saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  ambilData(); // Tampilkan semua produk saat awal

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      ambilData(e.target.value); // Tampilkan produk yang sesuai pencarian
    });
  }
});
