document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-email");
  const emailInput = document.getElementById("email");
  const message = document.getElementById("message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailValue = emailInput.value;
    if (emailValue == "") {
      emailInput.classList.add("error");
      message.style.opacity = 1;
      message.innerText = "Please provide a valid email address";
    }
  });

  emailInput.addEventListener("input", () => {
    if (validateEmail(emailInput.value) == false) {
      emailInput.classList.add("error");
      message.style.opacity = 1;
      message.innerText = "Please provide a valid email address";
    } else {
      emailInput.classList.remove("error");
      message.style.opacity = 0;
    }
  });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
