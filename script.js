/* ================= CARD SLIDER LOGIC ================= */

let current = 0;
let cards = document.querySelectorAll(".card");

/* Show only the current card */
function showCard(index) {
  cards.forEach((card, i) => {
    card.classList.remove("active");
    if (i === index) {
      card.classList.add("active");
      card.scrollIntoView({ behavior: "smooth" });
    }
  });
}

/* Next button function */
function next() {
  if (current < cards.length - 1) {
    current++;
    showCard(current);
  } else {
    // Last card reached – scroll to final letter
    document.querySelector(".page:last-child").scrollIntoView({
      behavior: "smooth"
    });
  }
}

/* ================= INTRO → STORY START ================= */

function startStory() {
  current = 0;
  showCard(current);
}

/* ================= CONFETTI BLAST ================= */

function blast() {
  // First blast
  confetti({
    particleCount: 160,
    spread: 120,
    origin: { y: 0.6 }
  });

  // Small delayed blast (smooth feel)
  setTimeout(() => {
    confetti({
      particleCount: 90,
      spread: 90,
      origin: { y: 0.4 }
    });
  }, 600);
}
