"use strict";
let offset = 0;

const sliderToggle = document.querySelector(".body-main-block__arrows");

const zipCodeSearchForm = document.querySelector(".form-main-block");

const propertiesMenu = document.querySelector(".tabs-deals__menu");
const allPropertyButton = document.querySelector(".header-deals__link");
const properties = document.querySelectorAll(".item-items-tab");

sliderToggle.addEventListener("click", changeSlider);
propertiesMenu.addEventListener("click", changePropertyByValue);
allPropertyButton.addEventListener("click", changePropertyByValue);
zipCodeSearchForm.addEventListener("click", showPropertyByZipcode);

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

function changePropertyByValue({ target }) {
  event.preventDefault();
  properties.forEach((property) => {
    if (target.id !== property.dataset.id && target.id !== "all-property") {
      property.classList.add("hide");
    } else {
      property.classList.remove("hide");
    }
  });
}

function showPropertyByZipcode(event) {
  event.preventDefault();

  const tootlip = document.querySelector(".form-main-block__tootlip");
  const zipCodeValue = document
    .querySelector(".form-main-block__input")
    .value.trim();

  properties.forEach((property) => {
    if (property.dataset.zip !== zipCodeValue && zipCodeValue !== "") {
      tootlip.classList.toggle("form-main-block__tootlip-visible");
      tootlip.textContent = "Zipcode does not exist";
    }

    if (property.dataset.zip !== zipCodeValue) {
      property.classList.add("hide");
    } else {
      property.classList.remove("hide");
      property.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });
}
