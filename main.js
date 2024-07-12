document.addEventListener("DOMContentLoaded", () => {
  const pictures = document.querySelectorAll(".picture");
  const prevButton = document.querySelector(
    ".button-container .button:nth-child(1)"
  );
  const nextButton = document.querySelector(
    ".button-container .button:nth-child(2)"
  );
  let currentIndex = 0;

  const fetchDogImage = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("Error fetching dog image:", error);
      return null;
    }
  };

  const loadImages = async () => {
    for (const picture of pictures) {
      const imageUrl = await fetchDogImage();
      if (imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;
        picture.appendChild(img);
      }
    }
  };

  const updatePictures = () => {
    pictures.forEach((picture, index) => {
      picture.classList.remove("active", "next", "prev");
      if (index === currentIndex) {
        picture.classList.add("active");
      } else if (index === (currentIndex + 1) % pictures.length) {
        picture.classList.add("next");
      } else if (
        index ===
        (currentIndex - 1 + pictures.length) % pictures.length
      ) {
        picture.classList.add("prev");
      }
    });
  };

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + pictures.length) % pictures.length;
    updatePictures();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % pictures.length;
    updatePictures();
  });

  loadImages().then(updatePictures);
});
