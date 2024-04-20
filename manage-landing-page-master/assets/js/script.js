document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  const navMobile = document.getElementById("nav-mobile");
  const buttonHamburger = document.getElementById("button-hamburger");
  const iconHambuger = document.getElementById("icon-hamburger");
  const iconClose = document.getElementById("icon-close");
  const overlay = document.getElementById("overlay");

  buttonHamburger.addEventListener("click", function () {
    if (navMobile.classList.contains("active")) {
      navMobile.classList.remove("active");
      iconHambuger.classList.remove("hidden");
      iconClose.classList.add("hidden");
      overlay.classList.remove("active");
      body.classList.remove("active");
    } else {
      navMobile.classList.add("active");
      iconHambuger.classList.add("hidden");
      iconClose.classList.remove("hidden");
      overlay.classList.add("active");
      body.classList.add("active");
    }
  });

  overlay.addEventListener("click", function () {
    navMobile.classList.remove("active");
    iconHambuger.classList.remove("hidden");
    iconClose.classList.add("hidden");
    overlay.classList.remove("active");
  });

  const testimonials = document.querySelectorAll(".testimony.carousel");
  const pagination = document.querySelector(".carousel-pagination");
  testimonials.forEach((testimony, index) => {
    const button = document.createElement("button");
    if (index === 0) {
      testimony.classList.add("active");
      button.classList.add("active");
    }
    pagination.appendChild(button);
  });

  const buttons = document.querySelectorAll(".carousel-pagination button");

  buttons.forEach((button, index) => {
    button.addEventListener("click", function () {
      testimonials.forEach((testimony) => {
        testimony.classList.remove("active");
      });

      buttons.forEach((button) => {
        button.classList.remove("active");
      });

      testimonials[index].classList.add("active");
      button.classList.add("active");
    });
  });

  const form = document.getElementById("form-email");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailValue = email.value;
    if (!emailValue) {
      email.classList.add("error");
      message.classList.add("error");
      message.innerText = "Email required!";
      message.style.opacity = 1;
    } else {
      email.classList.remove("error");
      email.value = "";
      message.classList.remove("error");
      message.classList.add("success");
      message.style.opacity = 1;
      message.innerText = "Email submitted successfully!";

      setTimeout(() => {
        message.style.opacity = 0;
      }, 3000);
    }
  });
});
