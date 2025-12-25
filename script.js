/* ================= GLOBAL ================= */

// Card index
let current = 0;

// All cards
const cards = document.querySelectorAll(".card");

// Intro section
const intro = document.getElementById("intro");

// Final page
const finalPage = document.querySelector(".page:last-child");

/* ================= SHOW CARD ================= */
function showCard(index) {
  cards.forEach((card, i) => {
    card.classList.remove("active");
    if (i === index) {
      card.classList.add("active");
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

/* ================= NEXT BUTTON ================= */
function next() {
  if (current < cards.length - 1) {
    current++;
    showCard(current);
  } else {
    // Last card reached → scroll to final letter
    finalPage.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

/* ================= START STORY ================= */
function startStory() {
  // Hide intro smoothly
  intro.style.opacity = "0";
  intro.style.transition = "opacity 0.6s ease";

  setTimeout(() => {
    intro.style.display = "none";
    current = 0;
    showCard(current);
  }, 600);
}

/* ================= CONFETTI BLAST ================= */
function blast() {
  // Soft first blast
  confetti({
    particleCount: 120,
    spread: 90,
    scalar: 0.9,
    origin: { y: 0.6 }
  });

  // Gentle second wave
  setTimeout(() => {
    confetti({
      particleCount: 70,
      spread: 70,
      scalar: 0.8,
      origin: { y: 0.5 }
    });
  }, 700);
}
