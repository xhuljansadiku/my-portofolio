/* ==========================================================================
   Xhuljan Sadiku — Portfolio
   File: assets/js/app.js
   ========================================================================== */

// DOM ready helper
document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // 1) NAVBAR: active link on scroll
  // ----------------------------
const navLinks = Array.from(document.querySelectorAll("#mainNav .nav-link"));

// nxjerr elementët target sipas href (#id)
const targets = navLinks
  .map(l => {
    const hash = l.getAttribute("href") || "";
    if (!hash.startsWith("#")) return null;
    const el = document.getElementById(hash.slice(1));
    return el ? { id: el.id, el } : null;
  })
  .filter(Boolean);

// offset dinamik për navbar-in (ndrysho nëse ke një vlerë fikse)
const nav = document.querySelector("#mainNav");
const getOffset = () => (nav ? nav.offsetHeight + 12 : 100);

function setActive(id) {
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

function activateNav() {
  const y = window.pageYOffset + getOffset();

  // gjej seksionin i cili mbulon pozicionin aktual
  let current = null;
  for (const t of targets) {
    const top = t.el.offsetTop;
    const bottom = top + t.el.offsetHeight;
    if (y >= top && y < bottom) {
      current = t.id;
      break;
    }
  }

  // fallback: në krye → i pari
  if (!current && targets.length) {
    if (window.pageYOffset < targets[0].el.offsetTop) {
      current = targets[0].id;
    } else {
      // ose mer i fundit që kaluam
      const passed = targets.filter(t => y >= t.el.offsetTop);
      if (passed.length) current = passed[passed.length - 1].id;
    }
  }

  if (current) setActive(current);
}

window.addEventListener("scroll", activateNav, { passive: true });
window.addEventListener("resize", activateNav, { passive: true });
document.addEventListener("DOMContentLoaded", activateNav);

// aktivizo menjëherë kur klikon një link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const hash = link.getAttribute("href");
    if (hash?.startsWith("#")) setActive(hash.slice(1));
  });
});


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


