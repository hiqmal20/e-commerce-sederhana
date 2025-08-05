document.addEventListener("DOMContentLoaded", () => {

     document.getElementById("logoutLink").addEventListener("click", function(e) {
    e.preventDefault(); // Mencegah langsung pindah halaman

    const confirmed = confirm("Apakah kamu yakin ingin logout?");
    if (confirmed) {
    
      window.location.href = "../public/landingpw.html"; 
    }
  });

})