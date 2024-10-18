class Card {
  constructor({
    imageUrl,
    startupName,
    sector,
    budget,
    description, 
    onDismiss,
    onLike,
    onDislike,
  }) {
    this.imageUrl = imageUrl;
    this.startupName = startupName;
    this.sector = sector;
    this.budget = budget;
    this.description = description; 
    this.onDismiss = onDismiss;
    this.onLike = onLike;
    this.onDislike = onDislike;
  
    this.init();
  }

  init = () => {
    const card = document.createElement("div");
    card.classList.add("card");
  
    const img = document.createElement("img");
    img.src = this.imageUrl;
    img.alt = `Presentation of ${this.startupName}`;
    card.append(img);
  
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("card-info");
  
    const title = document.createElement("h2");
    title.textContent = this.startupName;
  
    const sectorInfo = document.createElement("p");
    sectorInfo.textContent = `Сектор: ${this.sector}`;
  
    const budgetInfo = document.createElement("p");
    budgetInfo.textContent = `Бюджет: ${this.budget} грн`;
  
    const descriptionInfo = document.createElement("p");
    descriptionInfo.textContent = `Опис: ${this.description}`;
  
    infoContainer.append(title, sectorInfo, budgetInfo, descriptionInfo); 
    card.append(infoContainer);
  
    this.element = card;
  };

  dismiss = (direction) => {
    this.element.style.transition = "transform 1s";
    this.element.style.transform = `translate(${direction * window.innerWidth}px, 0)`; 

    setTimeout(() => {
      this.element.remove();
      if (typeof this.onDismiss === "function") {
        this.onDismiss(); 
      }
      if (typeof this.onLike === "function" && direction === 1) {
        this.onLike(); 
      }
      if (typeof this.onDislike === "function" && direction === -1) {
        this.onDislike();
      }
    }, 1000);
  };

  swipeRight = () => {
    this.dismiss(1); 
  };

  swipeLeft = () => {
    this.dismiss(-1); 
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const swiper = document.querySelector('#swiper');
  const likeButton = document.querySelector('#like');
  const dislikeButton = document.querySelector('#dislike');

  const startups = JSON.parse(localStorage.getItem('startups')) || []; 

  let currentCard = null;

  const loadNextCard = () => {
    if (startups.length > 0) {
      const startup = startups.shift(); 
      currentCard = new Card({
        imageUrl: startup.presentation,
        startupName: startup.startupName,
        sector: startup.sector,
        budget: startup.budget,
        description: startup.description,
        onDismiss: loadNextCard,
        onLike: () => console.log('Liked!'),
        onDislike: () => console.log('Disliked!'),
      });
      swiper.innerHTML = ''; 
      swiper.appendChild(currentCard.element); 
    } else {
      console.log("No more cards");
    }
  };



  loadNextCard(); 

  likeButton.addEventListener('click', () => {
    if (currentCard) currentCard.swipeRight(); 
  });

  dislikeButton.addEventListener('click', () => {
    if (currentCard) currentCard.swipeLeft(); 
  });
  const heapHopeElement = document.querySelector('.naming');
  heapHopeElement.addEventListener('click', () => {
    window.location.href = '/app/main/index.html';

  });
});
