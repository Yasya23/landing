"use strict";
let offset = 0;

const headerPopupMenu = document.querySelector(".header__popup");

const sliderToggle = document.querySelector(".body-main-block__arrows");

const zipCodeSearchForm = document.querySelector(".form-main-block");
const zipCodeSearchButton = document.querySelector(".form-main-block__button");

const formSubscribeButton = document.querySelector(".form-subcribe__button");

const propertiesMenu = document.querySelector(".tabs-deals__menu");
const allPropertyButton = document.querySelector(".header-deals__link");
const properties = document.querySelectorAll(".item-items-tab");

const feauturedButton = document.querySelector(".content-featured__link");
const modalWindow = document.querySelector(".modal-window-featured");
const formModalWindow = document.querySelector(".modal-window-featured form");
const cancelModalWindowButton = document.querySelector(
  ".modal-window-featured__button-cancel"
);
const messageErrorEmailModalWindow = document.querySelector(
  ".modal-window-featured__message"
);
const emailModalWindow = document.querySelector(
  ".modal-window-featured__input"
);
const messageSubmitModalWindow = document.querySelector(
  ".modal-window-featured__message-submit"
);

const headerMenu = document.querySelector(".menu__list");
const footerMenu = document.querySelector(".menu-footer");

const tootlipSubscribeForm = document.querySelector(".form-subcribe__tootlip");

zipCodeSearchForm.addEventListener("submit", checkZipcode);
zipCodeSearchButton.addEventListener("touchstart", checkZipcode);

sliderToggle.addEventListener("click", changeSlider);
propertiesMenu.addEventListener("click", changePropertyByValue);
allPropertyButton.addEventListener("click", changePropertyByValue);
feauturedButton.addEventListener("click", showModalWindow);
cancelModalWindowButton.addEventListener("click", closeModalWindow);
formModalWindow.addEventListener("submit", checkFormResponse);

headerMenu.addEventListener("click", scrollToSelectedSection);
footerMenu.addEventListener("click", scrollToSelectedSection);

headerPopupMenu.addEventListener("click", () => {
  document.querySelector(".header__popup-icon").classList.toggle("fa-xmark");
  document.querySelector(".header__menu").classList.toggle("header__menu-flex");
});

document.addEventListener("click", () => {
  if (
    tootlipSubscribeForm.classList.contains("form-subcribe__tootlip-visible")
  ) {
    tootlipSubscribeForm.classList.remove("form-subcribe__tootlip-visible");
  }
});

formSubscribeButton.addEventListener("submit", (event) => {
  event.preventDefault();
  const emailSubcribe = document.querySelector(".form-subcribe__input").value;
  if (emailSubcribe === "") {
    tootlipSubscribeForm.classList.add("form-subcribe__tootlip-visible");
  }
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
      hideProperty(property);
    } else {
      showHideProperty(property);
    }
  });
}

function showHideProperty(property) {
  property.classList.remove("hide");
}

function hideProperty(property) {
  property.classList.add("hide");
}

let zipCodesArray = [];
(function () {
  properties.forEach((property) => {
    zipCodesArray.push(property.dataset.zip);
  });
})();

function checkZipcode(event) {
  event.preventDefault();
  const zipCode = document.querySelector(".form-main-block__input");
  const zipCodeValue = zipCode.value.trim();
  const tootlip = document.querySelector(".form-main-block__tootlip");
  let isZipCode;
  properties.forEach((property) => {
    showHideProperty(property);
  });

  zipCodesArray.forEach((zip) => {
    if (zipCodeValue === zip) {
      isZipCode = true;
    }
  });

  if (isZipCode === true) {
    showPropertyByZipcode(zipCodeValue, zipCode, tootlip);
  } else {
    tootlip.classList.add("form-main-block__tootlip-visible");
    tootlip.textContent = "Zipcode does not exist";
  }
}

function showPropertyByZipcode(zipCodeValue, zipCode, tootlip) {
  console.log(1);
  checkTootlipMainBlock(tootlip);

  zipCode.value = "";
  properties.forEach((property) => {
    if (zipCodeValue !== property.dataset.zip) {
      hideProperty(property);
    } else {
      showHideProperty(property);
      property.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  });
}

function checkTootlipMainBlock(tootlip) {
  console.log(2);
  if (tootlip.classList.contains("form-main-block__tootlip-visible")) {
    tootlip.classList.remove("form-main-block__tootlip-visible");
  }
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

function showModalWindow(event) {
  event.preventDefault();
  modalWindow.classList.add("modal-window-featured__display");
}

function closeModalWindow() {
  messageErrorEmailModalWindow.textContent = "";
  messageSubmitModalWindow.textContent = "";
  emailModalWindow.classList.remove("modal-window-featured__input-outline");
  modalWindow.classList.remove("modal-window-featured__display");
}

function checkFormResponse(event) {
  event.preventDefault();
  if (emailModalWindow.value.trim() === "") {
    messageErrorEmailModalWindow.textContent = "The field cannot be empty";
    emailModalWindow.classList.add("modal-window-featured__input-outline");
  } else {
    messageErrorEmailModalWindow.textContent = "";
    messageSubmitModalWindow.textContent =
      "Thank you we will contact you as soon as possible!";
    emailModalWindow.classList.remove("modal-window-featured__input-outline");
  }
}
