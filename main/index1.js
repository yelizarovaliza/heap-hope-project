window.addEventListener('scroll', function() {
    const image = document.querySelector('.intro-image');
    const scrollY = window.scrollY; // Кількість прокрутки по вертикалі

    // Максимальна прокрутка для 100% ширини
    const maxScroll = 600; // Налаштуйте це значення для вашого контенту

    // Обчислюємо нову ширину
    const newWidthPercentage = Math.min(100, (scrollY / maxScroll) * 100 + 70); // Збільшуємо до 100%

    // Якщо прокрутка перевищує 50px, зображення з'являється
    if (scrollY > 50) {
        image.style.opacity = 1; // Зробити видимим
        image.style.transform = 'translateY(0)'; // Повернути на початкове місце
    } else {
        image.style.opacity = 0; // Залишити непрозорим
        image.style.transform = 'translateY(20px)'; // Зберегти зміщеним
    }

    image.style.width = newWidthPercentage + '%'; // Задаємо нову ширину
});
