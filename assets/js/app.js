/* ==========================================================================
   Xhuljan Sadiku — Portfolio
   File: assets/js/app.js
   ========================================================================== */

// DOM ready helper
document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // 1) NAVBAR: active link on scroll
  // ----------------------------
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#mainNav .nav-link");

  function activateNav() {
    let scrollY = window.pageYOffset;
    sections.forEach((sec) => {
      const sectionTop = sec.offsetTop - 120; // offset for navbar
      const sectionHeight = sec.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        const id = sec.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
  window.addEventListener("scroll", activateNav);

  // ----------------------------
  // 2) BACK TO TOP
  // ----------------------------
  const backBtn = document.getElementById("backToTop");
  if (backBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backBtn.classList.add("show");
      } else {
        backBtn.classList.remove("show");
      }
    });

    backBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ----------------------------
  // 3) CONTACT FORM (Bootstrap validation + toast)
  // ----------------------------
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.classList.add("was-validated");

      if (!form.checkValidity()) {
        return; // invalid form, do nothing
      }

      // Simulate success
      const toastEl = document.getElementById("formToast");
      if (toastEl) {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
      }

      // Reset form
      form.reset();
      form.classList.remove("was-validated");
    });
  }

   

  // ----------------------------
  // 4) DARK MODE (optional toggle)
  // ----------------------------
  const darkToggle = document.querySelector("[data-toggle-theme]");
  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      const currentTheme =
        document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.body.setAttribute("data-theme", currentTheme);
      localStorage.setItem("theme", currentTheme);
    });

    // restore saved theme
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.body.setAttribute("data-theme", saved);
    }
  }
});

// 5) Enable Bootstrap tooltips (for Tech Stack chips)
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.forEach((el) => {
  new bootstrap.Tooltip(el, {
    trigger: 'hover focus',
    container: 'body'
  });
});


//6  Back to top button
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


