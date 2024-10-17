// DOM
const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');


const startups = JSON.parse(localStorage.getItem('startups')) || [];


let cardCount = 0;  // Лічильник карток
let zIndexCounter = startups.length; 

function appendNewCard() {
  if (cardCount >= startups.length) {
    console.log("No more cards to display");
    return;
  }

  const startup = startups[cardCount]; 

  const card = new Card({
    imageUrl: startup.presentation,
    startupName: startup.startupName,
    sector: startup.sector,
    budget: startup.budget,
    description: startup.description,
    onDismiss: () => {
      appendNewCard(); 
    },
    onLike: () => {
      like.style.animationPlayState = 'running';
      like.classList.toggle('trigger');
    },
    onDislike: () => {
      dislike.style.animationPlayState = 'running';
      dislike.classList.toggle('trigger');
    },
  });

  card.element.style.zIndex = zIndexCounter--; 
  swiper.prepend(card.element); 
  cardCount++; 

 
  const cards = swiper.querySelectorAll(".card:not(.dismissing)");
  cards.forEach((card, index) => {
    card.style.setProperty("--i", index); 
  });
}


for (let i = 0; i < Math.min(5, startups.length); i++) {
  appendNewCard();
}
