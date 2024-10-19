window.addEventListener("scroll", function () {
  const image = document.querySelector(".intro-image");
  const scrollY = window.scrollY;

  const maxScroll = 600;

  const newWidthPercentage = Math.min(100, (scrollY / maxScroll) * 100 + 70);

  if (scrollY > 50) {
    image.style.opacity = 1;
    image.style.transform = "translateY(0)";
  } else {
    image.style.opacity = 0;
    image.style.transform = "translateY(20px)";
  }

  image.style.width = newWidthPercentage + "%";
});
