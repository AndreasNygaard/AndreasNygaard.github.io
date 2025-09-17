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

    const categories = filterItems[i].dataset.category.toLowerCase().split(",");

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (categories.includes(selectedValue)) {
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


//const form = document.querySelector("[data-form]");
//const formBtn = document.querySelector("[data-form-btn]");

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Track if we've already pinged the server
let serverWarmedUp = false;

// Function to ping server
const pingServer = async () => {
  try {
    await fetch("https://andreasnygaard-github-io.onrender.com/ping");
    console.log("Server pinged successfully!");
  } catch (err) {
    console.warn("Server ping failed:", err);
  }
};

// Enable/disable submit button and trigger ping on first input
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    // Warm up server on first keystroke
    if (!serverWarmedUp) {
      serverWarmedUp = true;
      pingServer();
    }

    // Enable/disable submit button based on validity
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});


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



document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const articles = document.querySelectorAll("article");
  const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");

  // single handler for all nav buttons (desktop + overlay)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.dataset.target;
      const targetArticle = document.getElementById(targetId);

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

      // 5) save to localStorage
      // Reset scroll to top **after activating the article**
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  });

  // On page load, restore last active article in **current session only**
  window.addEventListener("DOMContentLoaded", () => {
    const savedId = sessionStorage.getItem("activeArticle");
    if (savedId) {
      const savedArticle = document.getElementById(savedId);
      if (savedArticle) {
	// deactivate all
	navLinks.forEach(l => l.classList.remove("active"));
        articles.forEach(a => a.classList.remove("active"));
	  
	// activate saved
	savedArticle.classList.add("active");
        document.querySelectorAll(`[data-target="${savedId}"]`)
                .forEach(l => l.classList.add("active"));

	// Reset scroll to top AFTER browser finishes restoring scroll
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "instant" });
	});
      }
    }
  });

  // Save current article **in sessionStorage**, not localStorage
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.dataset.target;
      sessionStorage.setItem("activeArticle", targetId);
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const cards = {
    citable: {
      totalPapers: "totalPapers",
      totalCitations: "totalCitations",
      citationsPerPaper: "citationsPerPaper",
      hIndex: "hIndex",
      selfCitation: "selfCitation"
    },
    published: {
      totalPapers: "totalPapersPub",
      totalCitations: "totalCitationsPub",
      citationsPerPaper: "citationsPerPaperPub",
      hIndex: "hIndexPub",
      selfCitation: "selfCitationPub"
    }
  };

  // Helper to compute metrics
  function computeMetrics(papers) {
    const totalPapers = papers.length;

    // Use citation_count_without_self_citations for total citations excluding self-citations
    const citationsArray = papers.map(p => p.citation_count ?? 0);
    const totalCitations = citationsArray.reduce((a, b) => a + b, 0);
    const citationsPerPaper = totalPapers ? (totalCitations / totalPapers).toFixed(2) : "N/A";

    // h-index based on citations excluding self-citations
    const sortedCitations = citationsArray.sort((a, b) => b - a);
    let hIndex = 0;
    for (let i = 0; i < sortedCitations.length; i++) {
      if (sortedCitations[i] >= i + 1) hIndex = i + 1;
      else break;
    }

    // self-citation rate
    const totalCitationCount = papers.reduce((sum, p) => sum + (p.citation_count ?? 0), 0);
    const totalSelfCitations = papers.reduce((sum, p) => sum + ((p.citation_count ?? 0) - (p.citation_count_without_self_citations ?? 0)), 0);
    const selfCitationRate = totalCitationCount ? ((totalSelfCitations / totalCitationCount) * 100).toFixed(1) + "%" : "N/A";

    return { totalPapers, totalCitations, citationsPerPaper, hIndex, selfCitationRate };
  }

  fetch('https://inspirehep.net/api/literature?q=author:"Nygaard, Andreas"&size=250')
    .then(response => response.json())
    .then(data => {
      const papers = data.hits.hits.map(hit => hit.metadata);

      if (!papers.length) throw new Error("No papers found");

      // Filter non-published papers (example: must have DOI or be peer-reviewed)
      const publishedPapers = papers.filter(p => p.dois?.length > 0 || (p.publication_info?.length && !p.publication_info.some(pi => pi.journal_title === "Preprint")));

      // Citable papers = all papers
      const citablePapers = papers;

      // Compute metrics
      const citableMetrics = computeMetrics(citablePapers);
      const publishedMetrics = computeMetrics(publishedPapers);

      // Update HTML
      Object.keys(cards.citable).forEach(key => {
        document.getElementById(cards.citable[key]).textContent = citableMetrics[key] ?? citableMetrics[key + "Rate"] ?? "N/A";
      });

      Object.keys(cards.published).forEach(key => {
        document.getElementById(cards.published[key]).textContent = publishedMetrics[key] ?? publishedMetrics[key + "Rate"] ?? "N/A";
      });
    })
    .catch(err => {
      console.error("Failed to fetch or compute metrics:", err);
      Object.values(cards.citable).concat(Object.values(cards.published)).forEach(id => {
        document.getElementById(id).textContent = "Error";
      });
    });
});



const galleryItems = document.querySelectorAll('.gallery-item img');
const modal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const closeBtn = document.getElementById('modalClose');
const prevBtn = document.getElementById('modalPrev');
const nextBtn = document.getElementById('modalNext');

let currentIndex = 0;

// Open modal when image is clicked
galleryItems.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    modalImage.src = img.src;
    modal.classList.add('show');
  });
});

// Close modal
closeBtn.addEventListener('click', () => modal.classList.remove('show'));

// Navigate prev/next
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  modalImage.src = galleryItems[currentIndex].src;
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  modalImage.src = galleryItems[currentIndex].src;
});

// Close modal when clicking outside the image
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('show');
});

// Optional: navigate with arrow keys
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('show')) return;
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'Escape') closeBtn.click();
});

