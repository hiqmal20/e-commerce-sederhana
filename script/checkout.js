 // Ambil cart dari localStorage, produk yang dipilih (selected = true)
 let cart = JSON.parse(localStorage.getItem("cart")) || [];
 cart = cart.filter(p => p.selected); // hanya produk yang dipilih
 const container = document.getElementById("product-container");
 let productPrice = 0;
 const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));
 
 if (buyNowItem) {
   cart = [buyNowItem]; // hanya tampilkan produk Buy Now
   localStorage.removeItem("buyNowItem");
 }

 if (cart.length === 0) {
   container.innerHTML = "<p class='text-gray-600'>Your cart is empty.</p>";  
   document.getElementById("price").innerText = "$0.00";
   document.getElementById("payment-fee").innerText = "$0.00";
   document.getElementById("shipping-fee").innerText = "$0.00";
   document.getElementById("total").innerText = "$0.00";
 } else {


   container.innerHTML = "";    
   cart.forEach(product => {
     const quantity = product.quantity || 1;
     const subtotal = product.price * quantity;
     productPrice += subtotal;
     const div = document.createElement("div");
     div.className = "flex gap-4 items-center border-b border-gray-200 pb-4";
     div.innerHTML = `
       <img src="${product.image}" alt="${product.title}" class="w-24 h-24 object-contain" />
       <div>
         <h3 class="font-semibold">${product.title}</h3>
         <p class="text-sm text-gray-600">Qty: ${quantity}</p>
         <p class="text-green-600 font-bold mt-1">$${product.price.toFixed(2)}</p>
       </div>
     `;


     container.appendChild(div);
   });
   document.getElementById("price").innerText = `$${productPrice.toFixed(2)}`;
 }


 // Fungsi update summary biaya
 function updateSummary() {
   const paymentSelect = document.getElementById("payment-method");
   const shippingSelect = document.getElementById("shipping-method");
   const paymentFee = parseFloat(paymentSelect.selectedOptions[0].dataset.fee) || 0;
   const shippingFee = parseFloat(shippingSelect.selectedOptions[0].dataset.fee) || 0;
   const total = productPrice + paymentFee + shippingFee;
   document.getElementById("payment-fee").innerText = `$${paymentFee.toFixed(2)}`;
   document.getElementById("shipping-fee").innerText = `$${shippingFee.toFixed(2)}`;
   document.getElementById("total").innerText = `$${total.toFixed(2)}`;
   return total;
 }


 // Update summary tiap kali user ganti pilihan payment/shipping
 document.getElementById("payment-method").addEventListener("change", updateSummary);
 document.getElementById("shipping-method").addEventListener("change", updateSummary);
 updateSummary();


 // Event tombol Checkout
 document.getElementById("checkout-btn").addEventListener("click", () => {
   if (cart.length === 0) {
     alert("Your cart is empty!");
     return;
   }
   
   const totalAmount = updateSummary();
   alert(`Pembayaran berhasil!\nTotal paid: $${totalAmount.toFixed(2)}`);

   console.log(localStorage.getItem("buyNowItem"));

   //remove item
   localStorage.removeItem("cart");
   localStorage.removeItem("buyNowItem");

   window.location.href = "../public/pwhome.html";
 });