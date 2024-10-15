document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    let currentIndex = 0;

    // Встановлює першу картку видимою на початку
    cards[currentIndex].classList.add('visible');

    function handleSwipe(direction) {
        // Додаємо клас для анімації зникнення картки вліво або вправо
        if (direction === 'left') {
            cards[currentIndex].classList.add('out-left');
        } else if (direction === 'right') {
            cards[currentIndex].classList.add('out-right');
        }

        // Видаляємо клас видимості через невеликий проміжок часу для плавного переходу
        setTimeout(() => {
            cards[currentIndex].classList.remove('visible', 'out-left', 'out-right');
            currentIndex++;

            if (currentIndex < cards.length) {
                cards[currentIndex].classList.add('visible');
            } else {
                alert('Ви переглянули всі стартапи!');
            }
        }, 500); // Час відповідає тривалості CSS transition
    }

    let startX;

    // Додаємо обробники для початку свайпу (touchstart) і завершення свайпу (touchend)
    cards.forEach(card => {
        card.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        card.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const deltaX = endX - startX;

            if (deltaX < -100) {
                handleSwipe('left'); // Свайп вліво
            } else if (deltaX > 100) {
                handleSwipe('right'); // Свайп вправо
            }
        });
    });

    // Підтримка свайпів для десктопних користувачів
    cards.forEach(card => {
        card.addEventListener('mousedown', (e) => {
            startX = e.clientX;
        });

        card.addEventListener('mouseup', (e) => {
            const endX = e.clientX;
            const deltaX = endX - startX;

            if (deltaX < -100) {
                handleSwipe('left');
            } else if (deltaX > 100) {
                handleSwipe('right');
            }
        });
    });
});
