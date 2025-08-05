document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product");

    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(products => {
        products.forEach(product => {
          const card = document.createElement("div");

          card.innerHTML = `
          <div class="bg-white text-black rounded-xl shadow-md p-4 flex flex-col items-center justify-between h-70 w-70">
            <!-- Link ke detail product -->
            <a href="login.html?id=${product.id}" class="w-full text-center">
              <img src="${product.image}" alt="${product.title}" class="h-30 w-auto object-contain mb-4 mx-auto" />
              <h3 class="font-semibold text-center text-base mb-2 truncate mx-auto">${product.title}</h3>
              <p class="text-xs text-center  truncate mx-auto">${product.description}</p>
              
            </a>

            <!-- Bagian bawah: Rating -->
            <div class="flex justify-between items-center w-70 px-4 mt-2 p-2">
              <p class="text-green-600 font-semibold text-md  ">$${product.price}</p>
              <p class="text-amber-500 font-semibold text-md">⭐ ${product.rating.rate} (${product.rating.count})</p>
            </div>
          </div>`;

          productContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error("Gagal memuat produk:", error);
        productContainer.innerHTML = `<p class="text-red-500">Gagal memuat produk.</p>`;
      });
  });

 
 

 
 

  