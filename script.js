/* ================= GLOBAL ================= */

let current = 0;
const cards = document.querySelectorAll(".card");
const intro = document.getElementById("intro");
const finalPage = document.querySelector(".page:last-child");
const music = document.getElementById("bgm");
const heartContainer = document.getElementById("heart-container");

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
    finalPage.scrollIntoView({ behavior: "smooth" });
  }
}

/* ================= SAFE MUSIC PLAYBACK ================= */
const music = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");

function toggleMusic() {
  if (music.paused) {
    music.volume = 0.5;
    music.play();
    musicBtn.innerText = "⏸ Pause Music";
  } else {
    music.pause();
    musicBtn.innerText = "🔊 Play Music";
  }
}

/* ================= START STORY (USER ACTION) ================= */
function startStory() {
  // Start audio on first click
  playMusicSafe();

  // Also listen for interactions to keep audio alive
  document.addEventListener("click", playMusicSafe);
  document.addEventListener("touchstart", playMusicSafe);

  // Fade out intro
  intro.style.transition = "opacity 0.6s ease";
  intro.style.opacity = "0";

  setTimeout(() => {
    intro.style.display = "none";
    current = 0;
    showCard(current);
  }, 600);
}

/* ================= CONFETTI ================= */
function blast() {
  confetti({
    particleCount: 120,
    spread: 90,
    scalar: 0.9,
    origin: { y: 0.6 }
  });

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
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  const emojis = ["💙", "❤️", "💖"];
  heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 6 + Math.random() * 4 + "s";
  heartContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 600);
/* ================= TYPING EFFECT ================= */
const text = "Happy Birthday Vaishnavi 💖";
let index = 0;

function typeEffect() {
  if (index < text.length) {
    document.getElementById("typeText").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 90);
  }
}

window.addEventListener("load", typeEffect);
