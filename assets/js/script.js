'use strict';


const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
const mobileNavCloseBtn = document.querySelector(".mobile-nav-close-btn");

mobileMenuBtn.addEventListener("click", () => {
  mobileNavOverlay.classList.add("active");
});

mobileNavCloseBtn.addEventListener("click", () => {
  mobileNavOverlay.classList.remove("active");
});

// optional: close overlay if clicking outside menu links
mobileNavOverlay.addEventListener("click", (e) => {
  if (e.target === mobileNavOverlay) {
    mobileNavOverlay.classList.remove("active");
  }
});




// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const sidebarBtnText = sidebarBtn.querySelector("span"); // the <span> inside button

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  // toggle sidebar active state
  elementToggleFunc(sidebar);

  // update button text
  if (sidebar.classList.contains("active")) {
    sidebarBtnText.textContent = "Hide Contacts";
  } else {
    sidebarBtnText.textContent = "Show Contacts";
  }

  // force reflow to reset hover/active visual (fixes flashing)
  sidebarBtn.blur();
});



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalTime = document.querySelector(".modal-time");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {

    // populate modal
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    // set modal time (get from parent <li>)
    const parent = this.closest(".testimonials-item");
    const timeValue = parent.getAttribute("data-modal-time");
    const timeText  = parent.getAttribute("data-modal-time-text");

    if (timeValue && timeText) {
      modalTime.setAttribute("datetime", timeValue);
      modalTime.textContent = timeText;
    }

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


const form = document.querySelector("[data-form]");
const formBtn = document.querySelector("[data-form-btn]");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullname = form.fullname.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // Simple validation
  if (!fullname || !email || !message) {
    alert("⚠️ Please fill out all fields before sending!");
    return;
  }

  // Simple email validation
  const validEmail = /\S+@\S+\.\S+/.test(email);
  if (!validEmail) {
    alert("⚠️ Please enter a valid email address!");
    return;
  }

  const data = { fullname, email, message };

  try {
    const res = await fetch("https://andreasnygaard-github-io.onrender.com/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });	

    if (res.ok) {
      alert("✅ Message sent successfully!");
      form.reset();
    } else {
      alert("❌ Failed to send message.");
    }
  } catch (err) {
    alert("⚠️ Error: " + err.message);
  }
});


/*
// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
*/


/*const navLinks = document.querySelectorAll("[data-nav-link]");
const articles = document.querySelectorAll("article");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.dataset.target;
    const targetArticle = document.getElementById(targetId);

    // remove "active" from all
    navLinks.forEach(l => l.classList.remove("active"));
    articles.forEach(a => a.classList.remove("active"));

    // add "active" to clicked link(s) and matching article
    document.querySelectorAll(`[data-target="${targetId}"]`)
            .forEach(l => l.classList.add("active"));

    if (targetArticle) {
      targetArticle.classList.add("active");
    }
  });
});
*/


document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const articles = document.querySelectorAll("article");
  const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");

  // single handler for all nav buttons (desktop + overlay)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.dataset.target;
      const targetArticle = document.getElementById(targetId);

      // debug (uncomment if you need to inspect)
      // console.log("nav click", targetId, !!targetArticle);

      // 1) remove "active" from all links and articles
      navLinks.forEach(l => l.classList.remove("active"));
      articles.forEach(a => a.classList.remove("active"));

      // 2) add "active" to all nav buttons that target the same id
      document.querySelectorAll(`[data-target="${targetId}"]`)
              .forEach(l => l.classList.add("active"));

      // 3) activate the article (if it exists)
      if (targetArticle) {
        targetArticle.classList.add("active");
      }

      // 4) close the mobile overlay if it's open (mobile overlay uses class "active")
      //    Optionally check viewport width if you only want to close on small screens:
      //    if (mobileNavOverlay && window.innerWidth <= 579 && mobileNavOverlay.classList.contains("active")) { ... }
      if (mobileNavOverlay && mobileNavOverlay.classList.contains("active")) {
        mobileNavOverlay.classList.remove("active");
      }
    });
  });
});
