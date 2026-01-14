const CARD_FILES = [
  "Pawn.png",
  "Rook.png",
  "Bishop.png",
  "Queen.png",
  "King.png",
  "Knight.png"
];

let deck = [];
let drawnCount = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function reshuffle() {
  deck = shuffle([...CARD_FILES]);
  drawnCount = 0;
  drawNext();
}

function prettyName(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .toUpperCase();
}

function drawNext() {
  if (deck.length === 0) reshuffle();

  const file = deck.pop();
  drawnCount++;

  const img = document.getElementById("cardImage");
  const name = document.getElementById("cardName");
  const info = document.getElementById("deckInfo");

  img.src = `cards/${file}`;
  name.textContent = prettyName(file);
  info.textContent = `Drawn: ${drawnCount} / ${CARD_FILES.length} (no repeats until reshuffle)`;
}

document.getElementById("nextBtn").addEventListener("click", drawNext);
document.getElementById("resetBtn").addEventListener("click", reshuffle);

// Swipe (left/right) = next card
let startX = null;
document.addEventListener("touchstart", (e) => startX = e.touches[0].clientX, { passive: true });
document.addEventListener("touchend", (e) => {
  if (startX === null) return;
  const dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) > 40) drawNext();
  startX = null;
}, { passive: true });

reshuffle();