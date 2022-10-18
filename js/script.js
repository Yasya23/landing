"use strict";
let offset = 0;

const sliderToggle = document.querySelector(".body-main-block__arrows");

const zipCodeSearchForm = document.querySelector(".form-main-block");

const propertiesMenu = document.querySelector(".tabs-deals__menu");
const allPropertyButton = document.querySelector(".header-deals__link");
const properties = document.querySelectorAll(".item-items-tab");
const feauturedButton = document.querySelector(".content-featured__link");
const modalWindow = document.querySelector(".modal-window-featured");
const formModalWindow = document.querySelector(".modal-window-featured form");

const headerMenu = document.querySelector(".menu__list");
const footerMenu = document.querySelector(".menu-footer");

zipCodeSearchForm.addEventListener("click", showPropertyByZipcode);

sliderToggle.addEventListener("click", changeSlider);
propertiesMenu.addEventListener("click", changePropertyByValue);
allPropertyButton.addEventListener("click", changePropertyByValue);
feauturedButton.addEventListener("click", ShowModalWindow);
formModalWindow.addEventListener("click", checkFormResponse);

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
  const tootlip = document.querySelector(".form-main-block__tootlip");
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

function scrollToSelectedSection({ target }) {
  event.preventDefault();
  const homeSection = document.querySelector(".header__container");
  const contactSection = document.querySelector(".footer-reviews__info");
  const reviewsSection = document.querySelector(".reviews__container");
  const propertySection = document.querySelector(".deals__container");
  const aboutSection = document.querySelector(".content-main-block__body");
  const offersSection = document.querySelector(".feautured__title");
  switch (target.dataset.id) {
    case "home":
      scrollByPage(homeSection);
      break;
    case "about":
      scrollByPage(aboutSection);
      break;
    case "offers":
      scrollByPage(offersSection);
      break;
    case "properties":
      scrollByPage(propertySection);
      break;
    case "reviews":
      scrollByPage(reviewsSection);
      break;
    case "contact":
      scrollByPage(contactSection);
      break;
  }
}

function scrollByPage(section) {
  section.scrollIntoView({
    block: "start",
    behavior: "smooth",
  });
}

function ShowModalWindow(event) {
  event.preventDefault();
  modalWindow.classList.add("modal-window-featured__display");
}

function checkFormResponse({ target }) {
  if (target.id === "email" && target.id !== null) {
    if (target.id === "submit-form") {
      const message = document.querySelector(".modal-window-featured__message");
      message.textContent = "Thank you, we will reply as soon as possible!";
    }
  }
  if (target.id === "cancel-form") {
    modalWindow.classList.remove("modal-window-featured__display");
  }
}
