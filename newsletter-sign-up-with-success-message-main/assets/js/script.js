document.addEventListener("DOMContentLoaded", function () {
  const body = document.getElementById("body");
  const form = document.getElementById("form-login");
  const email = document.getElementById("email");
  const message = document.getElementById("errror-message");
  const formContainer = document.getElementById("form-container");
  const modal = document.getElementById("modal");
  const emailConfirmation = document.getElementById("email-confirmation");
  const closeModal = document.getElementById("dismis-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailValue = email.value;
    if (emailValue == "") {
      email.classList.add("error");
      message.style.opacity = 1;
      message.innerText = "Email required!";
    } else {
      if (validateEmail(emailValue) == false) {
        email.classList.add("error");
        message.style.opacity = 1;
        message.innerText = "Please provide a valid email address!";
        return;
      }
      email.classList.remove("error");
      formContainer.classList.add("desactive");
      modal.classList.add("active");
      body.classList.add("active");
      emailConfirmation.innerText = emailValue + ".";
    }
  });

  email.addEventListener("input", () => {
    if (validateEmail(email.value) == true) {
      email.classList.remove("error");
      message.style.opacity = 1;
      message.classList.remove("error");
      email.classList.add("success");
      message.classList.add("success");
      message.innerText = "Email correct!";
    } else {
      email.classList.remove("success");
      email.classList.add("error");
      message.style.opacity = 1;
      message.classList.add("error");
      message.innerText = "Please provide a valid email address!";
    }
  });

  closeModal.addEventListener("click", () => {
    message.style.opacity = 0;
    message.classList.remove("success");
    email.classList.remove("success");
    modal.classList.remove("active");
    body.classList.remove("active");
    formContainer.classList.remove("desactive");
    email.value = "";
  });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
