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
    
      this.#init();
    }
  
    // private properties
    #startPoint;
    #offsetX;
    #offsetY;
  
    #isTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };
  
    #init = () => {
      const card = document.createElement("div");
      card.classList.add("card");
      console.log(this)
    
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
  
      if (this.#isTouchDevice()) {
        this.#listenToTouchEvents();
      } else {
        this.#listenToMouseEvents();
      }
    };
    
  
    #listenToTouchEvents = () => {
      this.element.addEventListener("touchstart", (e) => {
        const touch = e.changedTouches[0];
        if (!touch) return;
        const { clientX, clientY } = touch;
        this.#startPoint = { x: clientX, y: clientY };
        document.addEventListener("touchmove", this.#handleTouchMove);
        this.element.style.transition = "transform 0s";
      });
  
      document.addEventListener("touchend", this.#handleTouchEnd);
      document.addEventListener("cancel", this.#handleTouchEnd);
    };
  
    #listenToMouseEvents = () => {
      this.element.addEventListener("mousedown", (e) => {
        const { clientX, clientY } = e;
        this.#startPoint = { x: clientX, y: clientY };
        document.addEventListener("mousemove", this.#handleMouseMove);
        this.element.style.transition = "transform 0s";
      });
  
      document.addEventListener("mouseup", this.#handleMoveUp);
  
      this.element.addEventListener("dragstart", (e) => {
        e.preventDefault();
      });
    };
  
    #handleMove = (x, y) => {
      this.#offsetX = x - this.#startPoint.x;
      this.#offsetY = y - this.#startPoint.y;
      const rotate = this.#offsetX * 0.1;
      this.element.style.transform = `translate(${this.#offsetX}px, ${
        this.#offsetY
      }px) rotate(${rotate}deg)`;
      
      if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.7) {
        this.#dismiss(this.#offsetX > 0 ? 1 : -1);
      }
    };
  
    #handleMouseMove = (e) => {
      e.preventDefault();
      if (!this.#startPoint) return;
      const { clientX, clientY } = e;
      this.#handleMove(clientX, clientY);
    };
  
    #handleMoveUp = () => {
      this.#startPoint = null;
      document.removeEventListener("mousemove", this.#handleMouseMove);
      this.element.style.transform = "";
    };
  
    #handleTouchMove = (e) => {
      if (!this.#startPoint) return;
      const touch = e.changedTouches[0];
      if (!touch) return;
      const { clientX, clientY } = touch;
      this.#handleMove(clientX, clientY);
    };
  
    #handleTouchEnd = () => {
      this.#startPoint = null;
      document.removeEventListener("touchmove", this.#handleTouchMove);
      this.element.style.transform = "";
    };
  
    #dismiss = (direction) => {
      this.#startPoint = null;
      document.removeEventListener("mouseup", this.#handleMoveUp);
      document.removeEventListener("mousemove", this.#handleMouseMove);
      document.removeEventListener("touchend", this.#handleTouchEnd);
      document.removeEventListener("touchmove", this.#handleTouchMove);
      this.element.style.transition = "transform 1s";
      this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.#offsetY}px) rotate(${90 * direction}deg)`;
      this.element.classList.add("dismissing");
    
      setTimeout(() => {
        this.element.remove(); 
        const startups = JSON.parse(localStorage.getItem("startups")) || [];
        console.log("Startups before removal:", startups); 
        const updatedStartups = startups.filter(
        // (startup) => startup.startupName !== this.startupName//tytytyty
        );
        console.log("Removing startup:", this.startupName); 
        console.log("Startups after removal:", updatedStartups); 
        localStorage.setItem("startups", JSON.stringify(updatedStartups));
    
       
        if (updatedStartups.length === 0) {
          console.log("All cards have been swiped. Redirecting to the main page.");
          window.location.href = "../main/index.html"; 
        } else {
          console.log("More cards left. Continuing swiping.");
          
          if (typeof this.onDismiss === "function") {
            this.onDismiss();
          }
          if (typeof this.onLike === "function" && direction === 1) {
            this.onLike();
          }
          if (typeof this.onDislike === "function" && direction === -1) {
            this.onDislike();
          }
        }
      }, 1000);
    };
  }  
  