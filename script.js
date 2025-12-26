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
function playMusicSafe() {
  if (!music) return;
  music.volume = 0.5;
  
  // Try play
  const playPromise = music.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // If rejected, wait for next tap
      console.log("Audio play blocked — waiting for interaction");
    });
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
