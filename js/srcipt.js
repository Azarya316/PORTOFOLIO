// ============================================
// CONFIGURATION EMAILJS
// ============================================
const EMAILJS_PUBLIC_KEY = "gRAhhC14pQXNaldZX";
const EMAILJS_SERVICE_ID = "service_e148khi";
const EMAILJS_TEMPLATE_ID = "template_kb7c3mc";

// ============================================
// MENU ICON NAVBAR
// ============================================
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("fa-x");
  navbar.classList.toggle("active");
};

// ============================================
// STICKY NAVBAR & SCROLL
// ============================================
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  // Sticky navbar
  let header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // Remove menu icon navbar when click navbar link (scroll)
  menuIcon.classList.remove("fa-x");
  navbar.classList.remove("active");
};

// ============================================
// DARK LIGHT MODE
// ============================================
let darkModeIcon = document.querySelector("#darkMode-icon");

// Vérifier si le mode sombre est déjà activé
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  darkModeIcon.classList.remove("fa-moon");
  darkModeIcon.classList.add("fa-sun");
}

darkModeIcon.onclick = () => {
  // Toggle entre lune et soleil avec animation
  if (darkModeIcon.classList.contains("fa-moon")) {
    darkModeIcon.classList.remove("fa-moon");
    darkModeIcon.classList.add("fa-sun");
    localStorage.setItem("darkMode", "true");
  } else {
    darkModeIcon.classList.remove("fa-sun");
    darkModeIcon.classList.add("fa-moon");
    localStorage.setItem("darkMode", "false");
  }

  document.body.classList.toggle("dark-mode");

  // Animation de rotation pour l'icône
  darkModeIcon.style.transform = "rotate(360deg)";
  setTimeout(() => {
    darkModeIcon.style.transform = "rotate(0deg)";
  }, 300);
};

// ============================================
// ANIMATIONS AU SCROLL
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// ============================================
// DOM CONTENT LOADED - ANIMATIONS
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Animation d'entrée pour le header
  setTimeout(() => {
    document.querySelector(".header").classList.add("animate-in");
  }, 100);

  // Animation des sections
  sections.forEach((section) => {
    setTimeout(() => {
      section.classList.add("animate-in");
    }, 200);
  });

  // Observer les éléments spécifiques
  const animateElements = document.querySelectorAll(
    ".home-content, .about-content, .services-box, .portofolio-box, .testimonial-slide"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Animation des liens de navigation
  navLinks.forEach((link, index) => {
    link.style.animationDelay = `${index * 0.1}s`;
    link.classList.add("animate-in");
  });

  // Animation des icônes sociales
  const socialIcons = document.querySelectorAll(".social-media a");
  socialIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.2}s`;
    icon.classList.add("animate-in");
  });

  // Animation des boutons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn, index) => {
    btn.style.animationDelay = `${index * 0.3}s`;
    btn.classList.add("animate-in");
  });
});

// ============================================
// NAVIGATION LINKS - SMOOTH SCROLL
// ============================================
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth"
      });

      // Fermer le menu mobile si ouvert
      menuIcon.classList.remove("fa-x");
      navbar.classList.remove("active");
    }
  });
});

// ============================================
// HOVER ANIMATIONS
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const hoverElements = document.querySelectorAll(
    ".services-box, .portofolio-box, .btn"
  );

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.style.transform = "translateY(-5px) scale(1.02)";
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "translateY(0) scale(1)";
    });
  });
});

// ============================================
// EMAILJS - ENVOI DE FORMULAIRE
// ============================================

// Initialiser EmailJS avec votre Public Key
emailjs.init(EMAILJS_PUBLIC_KEY);

// Gestionnaire de soumission du formulaire
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Empêcher le rechargement de la page

  // Récupérer le bouton de soumission
  const submitBtn = contactForm.querySelector('input[type="submit"]');
  const originalBtnText = submitBtn.value;

  // Changer le texte du bouton pendant l'envoi
  submitBtn.value = "Envoi en cours...";
  submitBtn.disabled = true;

  // Préparer les paramètres du template
  const templateParams = {
    from_name: contactForm.name.value,
    from_email: contactForm.email.value,
    phone: contactForm.phone.value,
    subject: contactForm.subject.value,
    message: contactForm.message.value,
    to_email: "rasolomampiononaaza@gmail.com",
  };

  // Envoyer l'email via EmailJS
  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);

        // Afficher un message de succès avec SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Message envoyé !',
          text: 'Votre message a été envoyé avec succès ! Je vous répondrai bientôt.',
          confirmButtonText: 'D\'accord',
          confirmButtonColor: '#0ef',
          background: document.body.classList.contains('dark-mode') ? '#1f242d' : '#fff',
          color: document.body.classList.contains('dark-mode') ? '#fff' : '#000',
          timer: 5000,
          timerProgressBar: true
        });

        // Réinitialiser le formulaire
        contactForm.reset();

        // Restaurer le bouton
        submitBtn.value = originalBtnText;
        submitBtn.disabled = false;
      },
      function (error) {
        console.error("FAILED...", error);

        // Afficher un message d'erreur avec SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Erreur d\'envoi',
          text: 'Erreur lors de l\'envoi du message. Veuillez réessayer ou me contacter directement à rasolomampiononaaza@gmail.com',
          confirmButtonText: 'Réessayer',
          confirmButtonColor: '#0ef',
          background: document.body.classList.contains('dark-mode') ? '#1f242d' : '#fff',
          color: document.body.classList.contains('dark-mode') ? '#fff' : '#000'
        });

        // Restaurer le bouton
        submitBtn.value = originalBtnText;
        submitBtn.disabled = false;
      }
    );
});