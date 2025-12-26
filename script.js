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

/* ================= MUSIC SAFE PLAY ================= */
function playMusicSafe() {
  if (!music) return;

  music.volume = 0.5;
  music.muted = false;

  const p = music.play();
  if (p !== undefined) {
    p.catch(() => {
      console.log("Music blocked – retrying");
    });
  }
}

/* ================= START STORY ================= */
function startStory() {
  // Fade intro
  intro.style.transition = "opacity 0.6s ease";
  intro.style.opacity = "0";

  setTimeout(() => {
    intro.style.display = "none";

    // Play music AFTER user gesture
    playMusicSafe();

    // Force resume after animations/scroll
    setTimeout(playMusicSafe, 800);
    setTimeout(playMusicSafe, 2000);

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
}

/* ================= FLOATING HEARTS ================= */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";

  const icons = ["💙", "❤️", "💖"];
  heart.innerText = icons[Math.floor(Math.random() * icons.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 6 + Math.random() * 4 + "s";

  heartContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 600);

/* ================= KEEP MUSIC ALIVE ================= */
// If browser pauses audio, resume on interaction
document.addEventListener("click", playMusicSafe);
document.addEventListener("touchstart", playMusicSafe);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) playMusicSafe();
});
