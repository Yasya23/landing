"use strict";

let offset = 0;

const sliderToggle = document.querySelector(".body-main-block__arrows");

sliderToggle.addEventListener("click", changeSlider);

document.querySelector(".header__popup").addEventListener("click", () => {
  document.querySelector(".header__popup-icon").classList.toggle("fa-xmark");
  document.querySelector(".header__menu").classList.toggle("header__menu-flex");
});

function changeSlider({ target }) {
  checkArrowColor(target);
  const imageContainer = document.querySelector(".slider-main-block__wrapper");
  const imgWidth = imageContainer.offsetWidth;

  if (target.id === "next-slide") {
    offset += imgWidth;
    if (offset > imgWidth * 2) {
      offset = imgWidth * 2;
      addArrowColor(target);
    }
    imageContainer.style.left = -offset + "px";
  }

  if (target.id === "previous-slide") {
    offset -= imgWidth;
    if (offset < 0) {
      offset = 0;
      addArrowColor(target);
    }
    imageContainer.style.left = -offset + "px";
  }
}

function checkArrowColor(target) {
  const nextSliderToggle = document.querySelector(
    ".body-main-block__arrow-next"
  );
  const prevSliderToggle = document.querySelector(
    ".body-main-block__arrow-prev"
  );

  if (target.id === "next-slide") {
    if (prevSliderToggle.classList.contains("body-main-block__arrow-color")) {
      prevSliderToggle.classList.remove("body-main-block__arrow-color");
    }
  }

  if (target.id === "previous-slide") {
    if (nextSliderToggle.classList.contains("body-main-block__arrow-color")) {
      nextSliderToggle.classList.remove("body-main-block__arrow-color");
    }
  }
}

function addArrowColor(target) {
  target.classList.add("body-main-block__arrow-color");
}
