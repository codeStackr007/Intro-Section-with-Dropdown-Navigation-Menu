"use strict";

const navToggleBtn = document.querySelector(".header__toggle");
const overlay = document.querySelector(".overlay");
const navTriggers = document.querySelectorAll(".header__nav-trigger");
const navCloseLinks = document.querySelectorAll(".header__nav a");

// closes every open dropdown + resets aria-expanded on their triggers
const closeDropDown = () => {
  for (let i = 0; i < navTriggers.length; i++) {
    navTriggers[i].closest(".header__nav-item").classList.remove("is-open");
    navTriggers[i].setAttribute("aria-expanded", false);
  }
};

// toggle nav-is-open on <body> (shared ancestor of nav + overlay), keep aria in sync
navToggleBtn.addEventListener("click", () => {
  const isNowOpen = document.body.classList.toggle("nav-is-open");
  navToggleBtn.setAttribute("aria-expanded", isNowOpen);
  closeDropDown();
});

// overlay only closes, never reopens
overlay.addEventListener("click", () => {
  document.body.classList.remove("nav-is-open");
  closeDropDown();
});

// each dropdown trigger toggles independently (stopPropagation stops it
// from also triggering the overlay's close-everything logic)
navTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = trigger
      .closest(".header__nav-item")
      .classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", isOpen);
  });
});

// closes the nav + dropdowns when any link inside it is clicked
navCloseLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-is-open");
    closeDropDown();
  });
});
