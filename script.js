let current = 0;
let cards = document.querySelectorAll(".card");

function next() {
  cards[current].classList.remove("active");
  current++;
  if (current < cards.length) {
    cards[current].classList.add("active");
  }
}

function blast() {
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 }
  });
}
