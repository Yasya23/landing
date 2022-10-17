"use strict";
let offset = 0;

const sliderToggle = document.querySelector(".body-main-block__arrows");

const zipCodeSearchForm = document.querySelector(".form-main-block");
const zipCodeResetIcon = document.querySelector(".form-main-block__reset-icon");
const tootlip = document.querySelector(".form-main-block__tootlip");

const propertiesMenu = document.querySelector(".tabs-deals__menu");
const allPropertyButton = document.querySelector(".header-deals__link");
const properties = document.querySelectorAll(".item-items-tab");

const headerMenu = document.querySelector(".menu__list");
const footerMenu = document.querySelector(".menu-footer");

zipCodeSearchForm.addEventListener("click", showPropertyByZipcode);
zipCodeResetIcon.addEventListener("click", resetInputField);

sliderToggle.addEventListener("click", changeSlider);
propertiesMenu.addEventListener("click", changePropertyByValue);
allPropertyButton.addEventListener("click", changePropertyByValue);

headerMenu.addEventListener("click", scrollToSelectedSection);
footerMenu.addEventListener("click", scrollToSelectedSection);

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
  const zipCodeValue = document
    .querySelector(".form-main-block__input")
    .value.trim();
  properties.forEach((property) => {
    if (property.dataset.zip !== zipCodeValue && zipCodeValue !== "") {
      tootlip.classList.toggle("form-main-block__tootlip-visible");
      tootlip.textContent = "Zipcode does not exist";
      zipCodeResetIcon.classList.add("form-main-block__reset-icon-visibile");
    }
    if (property.dataset.zip !== zipCodeValue) {
      property.classList.add("hide");
    } else {
      property.classList.remove("hide");
      property.scrollIntoView({ block: "center", behavior: "smooth" });
      resetInputField();
    }
  });
}

function resetInputField() {
  const zipCode = document.querySelector(".form-main-block__input");
  zipCode.value = "";
  zipCodeResetIcon.classList.remove("form-main-block__reset-icon-visibile");
  tootlip.classList.remove("form-main-block__tootlip-visible");
}

function scrollToSelectedSection({ target }) {
  event.preventDefault();
  const homeSection = document.querySelector(".header__container");
  const contactSection = document.querySelector(".footer-reviews__info");
  const reviewsSection = document.querySelector(".reviews__container");
  const propertySection = document.querySelector(".deals__container");
  switch (target.dataset.id) {
    case "home":
      scrollByPage(homeSection);
      break;
    case "contact":
      scrollByPage(contactSection);
      break;
    case "reviews":
      scrollByPage(reviewsSection);
      break;
    case "properties":
      scrollByPage(propertySection);
      break;
  }
}

function scrollByPage(section) {
  section.scrollIntoView({
    block: "start",
    behavior: "smooth",
  });
}
