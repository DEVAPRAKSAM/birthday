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
/* ================= FLOATING HEARTS ================= */

const heartContainer = document.getElementById("heart-container");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  const hearts = ["💙", "❤️", "💖"];
  heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 6 + Math.random() * 4 + "s";

  heartContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}

// create heart every 500ms
setInterval(createHeart, 500);
/* ================= STAR BACKGROUND ================= */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let stars = [];
for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    s: Math.random() * 0.5 + 0.2
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.s;
    if (star.y > canvas.height) star.y = 0;
  });
  requestAnimationFrame(drawStars);
}
drawStars();
function startStory() {
  intro.style.opacity = "0";
  setTimeout(() => {
    intro.style.display = "none";
    document.getElementById("bgm").play();
    current = 0;
    showCard(current);
  }, 600);
}
