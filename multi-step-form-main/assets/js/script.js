document.addEventListener("DOMContentLoaded", function () {
  const step1 = document.getElementById("form-step-1"),
    step2 = document.getElementById("form-step-2"),
    step3 = document.getElementById("form-step-3"),
    step4 = document.getElementById("form-step-4"),
    step5 = document.getElementById("form-step-5"),
    btnNext = document.querySelectorAll(".btn-next"),
    btnPrev = document.querySelectorAll(".btn-prev"),
    nameInput = document.getElementById("name"),
    emailInput = document.getElementById("email"),
    phoneInput = document.getElementById("phone"),
    messageName = document.getElementById("message-name"),
    messageEmail = document.getElementById("message-email"),
    messagePhone = document.getElementById("message-phone"),
    spanCount = document.querySelectorAll(".count-step"),
    spanCountMobile = document.querySelectorAll(".count-step-mobile"),
    plans = document.querySelectorAll(".plan"),
    messagePlan = document.getElementById("message-plan"),
    toggle = document.getElementById("toggle"),
    planYear = document.getElementById("plan-year"),
    planMonth = document.getElementById("plan-month"),
    pricesYear = document.querySelectorAll(".price-year"),
    pricesMonth = document.querySelectorAll(".price-month"),
    offertYear = document.querySelectorAll(".offert-year"),
    checks = document.querySelectorAll(".input-check"),
    time = document.querySelectorAll(".time");

  var active = 1;

  updateStep(active);

  btnNext.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (active == 1) {
        if (nameInput.value === "") {
          nameInput.classList.add("error");
          messageName.classList.add("error");
          messageName.innerHTML = "Name cannot be empty";
        }

        if (emailInput.value === "") {
          emailInput.classList.add("error");
          messageEmail.classList.add("error");
          messageEmail.innerHTML = "Email cannot be empty";
        }

        if (phoneInput.value === "") {
          phoneInput.classList.add("error");
          messagePhone.classList.add("error");
          messagePhone.innerHTML = "Phone cannot be empty";
        } else {
          if (validatePhone(phoneInput.value) == false) {
            phoneInput.classList.add("error");
            messagePhone.classList.add("error");
            messagePhone.innerHTML = "Phone must contain only numbers";
          }
        }

        if (
          nameInput.value !== "" &&
          emailInput.value !== "" &&
          phoneInput.value !== "" &&
          validatePhone(phoneInput.value) == true
        ) {
          active++;
          updateStep(active);
          return;
        }
      } else if (active == 2) {
        var foundActivePlan = false;
        var planActive = "";
        var tipePlan = "";
        var pricePlanActive = 0;
        time.forEach((date) => {
          if (date.classList.contains("active")) {
            tipePlan = date.textContent;
          }
        });

        plans.forEach((plan) => {
          if (plan.classList.contains("active")) {
            foundActivePlan = true;
            planActive = plan.querySelector("h2").textContent;

            var planesPrices = plan.querySelectorAll(".prices-plans");
            planesPrices.forEach((prices) => {
              if (prices.classList.contains("active")) {
                pricePlanActive = prices.textContent;
                pricePlanActive = pricePlanActive.replace("$", "");
                pricePlanActive = pricePlanActive.replace("/", "");
                if (tipePlan == "Monthly") {
                  pricePlanActive = pricePlanActive.replace("mo", "");
                } else {
                  pricePlanActive = pricePlanActive.replace("yr", "");
                }
              }
            });
          }
        });

        let options = {
          plan: planActive,
          type: tipePlan,
          price: pricePlanActive,
          total: pricePlanActive,
        };
        localStorage.setItem("options", JSON.stringify(options));

        var pricesAdd = document.querySelectorAll(".check-price");
        pricesAdd.forEach((price) => {
          price.classList.remove("active");
          if (options.type == "Monthly") {
            if (price.classList.contains("monthly")) {
              price.classList.add("active");
            }
          } else {
            if (price.classList.contains("yearly")) {
              price.classList.add("active");
            }
          }
        });

        if (foundActivePlan == false) {
          messagePlan.classList.add("error");
          messagePlan.innerText = "Please select a plan!";

          setTimeout(() => {
            messageEmail.classList.remove("error");
            messagePlan.innerText = "";
          }, 3000);
        } else {
          active++;
          updateStep(active);
        }
      } else if (active == 3) {
        active++;
        var adds = [];
        var options = JSON.parse(localStorage.getItem("options"));
        checks.forEach((check) => {
          if (check.parentElement.classList.contains("check")) {
            var infoadd = check.parentElement;
            var price = infoadd.querySelector(
              ".check-price.active"
            ).textContent;

            if (options.type == "Monthly") {
              price = price.replace("+$", "");
              price = price.replace("/mo", "");
            } else {
              price = price.replace("+$", "");
              price = price.replace("/yr", "");
            }

            var service = {
              service: infoadd.querySelector(".check-text h3").textContent,
              price: price,
            };
            adds.push(service);
          }

          options.options = adds;
          localStorage.setItem("options", JSON.stringify(options));
        });

        updateStep(active);
      } else if (active == 4) {
        active++;
        updateStep(active);
      }
    });
  });

  btnPrev.forEach((btn) => {
    btn.addEventListener("click", function () {
      active--;

      if (active < 1) {
        active = 1;
      }
      updateStep(active);
    });
  });

  function updateStep(active) {
    switch (active) {
      case 1:
        updateSpanCount();

        btnPrev.forEach((btn) => {
          btn.classList.add("disabled");
        });

        step1.classList.add("active");
        step2.classList.remove("active");
        step3.classList.remove("active");
        step4.classList.remove("active");
        btnNext.innerText = "Next Step";
        break;

      case 2:
        updateSpanCount();
        btnPrev.forEach((btn) => {
          btn.classList.remove("disabled");
        });
        step1.classList.remove("active");
        step2.classList.add("active");
        step3.classList.remove("active");
        step4.classList.remove("active");
        btnNext.innerText = "Next Step";
        break;

      case 3:
        updateSpanCount();

        step1.classList.remove("active");
        step2.classList.remove("active");
        step3.classList.add("active");
        step4.classList.remove("active");
        btnNext.innerText = "Next Step";
        break;

      case 4:
        updateFinish();
        updateSpanCount();
        step1.classList.remove("active");
        step2.classList.remove("active");
        step3.classList.remove("active");
        step4.classList.add("active");
        btnNext.innerText = "Confirm";
        break;

      case 5:
        updateSpanCount();

        var buttonsContainerMobile = document.querySelector(
          ".buttons-container-mobile"
        );
        var buttonsContainer = document.querySelector(".form-buttons");
        buttonsContainer.style.display = "none";
        buttonsContainerMobile.style.display = "none";

        step1.classList.remove("active");
        step2.classList.remove("active");
        step3.classList.remove("active");
        step4.classList.remove("active");
        step5.classList.add("active");
        btnNext.innerText = "Finish";
        break;
    }
  }

  nameInput.addEventListener("input", function () {
    if (nameInput.value == "") {
      nameInput.classList.add("error");
      messageName.classList.add("error");
      messageName.innerHTML = "Name cannot be empty";
    } else {
      nameInput.classList.remove("error");
      messageName.classList.remove("error");
    }
  });

  emailInput.addEventListener("input", function () {
    if (emailInput.value == "") {
      emailInput.classList.add("error");
      messageEmail.classList.add("error");
      messageEmail.innerHTML = "Email cannot be empty";
    } else {
      emailInput.classList.remove("error");
      messageEmail.classList.remove("error");
    }
  });

  phoneInput.addEventListener("input", function () {
    if (phoneInput.value == "") {
      phoneInput.classList.add("error");
      messagePhone.classList.add("error");
      messagePhone.innerHTML = "Phone cannot be empty";
    } else {
      if (validatePhone(phoneInput.value) == false) {
        phoneInput.classList.add("error");
        messagePhone.classList.add("error");
        messagePhone.innerHTML = "Phone must contain only numbers";
        return;
      }
      phoneInput.classList.remove("error");
      messagePhone.classList.remove("error");
    }
  });

  function validatePhone(phone) {
    const regexNums = /^\+?[\d\s]*$/;
    return regexNums.test(phone);
  }

  plans.forEach((plan) => {
    plan.addEventListener("click", function () {
      plans.forEach((p) => {
        p.classList.remove("active");
      });
      plan.classList.add("active");
    });
  });

  toggle.addEventListener("change", function () {
    if (toggle.checked) {
      planYear.classList.add("active");
      planMonth.classList.remove("active");

      pricesYear.forEach((price) => {
        price.classList.add("active");
      });

      pricesMonth.forEach((price) => {
        price.classList.remove("active");
      });

      offertYear.forEach((offert) => {
        offert.classList.add("active");
      });
    } else {
      pricesYear.forEach((price) => {
        price.classList.remove("active");
      });

      pricesMonth.forEach((price) => {
        price.classList.add("active");
      });

      offertYear.forEach((offert) => {
        offert.classList.remove("active");
      });

      planYear.classList.remove("active");
      planMonth.classList.add("active");
    }
  });

  checks.forEach((check) => {
    check.addEventListener("change", function () {
      if (check.checked) {
        check.parentElement.classList.add("check");
      } else {
        check.parentElement.classList.remove("check");
      }
    });
  });

  var btnChangePlan = document.getElementById("btn-change-plan");
  btnChangePlan.addEventListener("click", function () {
    active = 2;
    updateStep(active);
  });

  function updateFinish() {
    var options = JSON.parse(localStorage.getItem("options"));
    var chosenPlan = document.getElementById("chosen-plan");
    var chosenPlanPrice = document.getElementById("chosen-plan-price");
    var finishBody = document.getElementById("finish-body");
    var textChosenTotal = document.getElementById("total-text");
    var totalChosenPrice = document.getElementById("total-price");
    chosenPlan.innerText = options.plan + "(" + options.type + ")";

    if (options.type == "Monthly") {
      chosenPlanPrice.innerText = "$" + options.price + "/mo";
    } else {
      chosenPlanPrice.innerText = "$" + options.price + "/yr";
    }

    finishBody.innerHTML = "";
    if (options.options == "") {
      var item = document.createElement("div");
      item.classList.add("item");
      var html = `
        <p>No selected add options</p>`;
      item.innerHTML = html;
      finishBody.appendChild(item);
    }

    if (options.hasOwnProperty("options")) {
      var optionsArray = options.options;
      optionsArray.forEach((option) => {
        var item = document.createElement("div");
        item.classList.add("item");
        var html = `
          <p>${option.service}</p>
          <p class="price">$${
            options.type == "Monthly"
              ? "+" + option.price + "/mo"
              : "+" + option.price + "/yr"
          }</p>`;
        item.innerHTML = html;
        finishBody.appendChild(item);
      });
    }

    var total = 0;
    var pricePlan = parseFloat(options.price);
    if (options.options != "") {
      options.options.forEach((option) => {
        total += parseFloat(option.price);
      });
    }
    total = total + pricePlan;
    totalChosenPrice.innerText =
      options.type == "Monthly"
        ? "$" + parseInt(total) + "/mo"
        : "$" + parseInt(total) + "/yr";
    textChosenTotal.innerText =
      options.type == "Monthly" ? "Total (per month)" : "Total (per year)";
  }

  function updateSpanCount() {
    if (spanCount) {
      spanCount.forEach((span, idx) => {
        if (idx === active - 1) {
          span.classList.add("active");
        } else {
          span.classList.remove("active");
        }
      });
    }

    if (spanCountMobile) {
      spanCountMobile.forEach((span, idx) => {
        if (idx === active - 1) {
          span.classList.add("active");
        } else {
          span.classList.remove("active");
        }
      });
    }

    if (active == 5) {
      spanCount.forEach((span, idx) => {
        if (idx === spanCount.length - 1) {
          span.classList.add("active");
        } else {
          span.classList.remove("active");
        }
      });

      spanCountMobile.forEach((span, idx) => {
        if (idx === spanCount.length - 1) {
          span.classList.add("active");
        } else {
          span.classList.remove("active");
        }
      });
    }
  }
});
