document.addEventListener("DOMContentLoaded", function() {
    const navbarLinks = document.querySelectorAll('.navbar a');

    navbarLinks.forEach(navbarLink => {
        navbarLink.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah perilaku default dari link
            
            const targetId = this.getAttribute('href'); // Mendapatkan nilai href dari link
            const targetSection = document.querySelector(targetId); // Mendapatkan elemen dengan id yang sesuai

            if (targetSection) {
                // Melakukan scroll ke elemen target dengan efek smooth
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
