// DOM
const swiper = document.querySelector("#swiper");
const like = document.querySelector("#like");
const dislike = document.querySelector("#dislike");

const startups = JSON.parse(localStorage.getItem("startups")) || [];

// variables
let cardCount = 0;

// functions
function appendNewCard() {
  if (cardCount >= startups.length) return;

  const startup = startups[cardCount];
  const card = new Card({
    imageUrl: startup.presentation,
    onDismiss: appendNewCard,
    onLike: () => {
      like.style.animationPlayState = "running";
      like.classList.toggle("trigger");
    },
    onDislike: () => {
      dislike.style.animationPlayState = "running";
      dislike.classList.toggle("trigger");
    },
  });

  swiper.append(card.element);
  cardCount++;

  // Оновлюємо індексацію карток для плавної анімації
  const cards = swiper.querySelectorAll(".card:not(.dismissing)");
  cards.forEach((card, index) => {
    card.style.setProperty("--i", index);
  });
}

// first 5 cards
for (let i = 0; i < 5; i++) {
  appendNewCard();
}
