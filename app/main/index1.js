window.addEventListener('scroll', function() {
    const image = document.querySelector('.intro-image');
    const scrollY = window.scrollY; 

   
    const maxScroll = 600; 

    // Обчислюємо нову ширину
    const newWidthPercentage = Math.min(100, (scrollY / maxScroll) * 100 + 70); 
   
    if (scrollY > 50) {
        image.style.opacity = 1; // Зробити видимим
        image.style.transform = 'translateY(0)'; // Повернути на початкове місце
    } else {
        image.style.opacity = 0; // Залишити непрозорим
        image.style.transform = 'translateY(20px)'; // Зберегти зміщеним
    }

    image.style.width = newWidthPercentage + '%'; // Задаємо нову ширину
});
