"use strict";

const _loginForm = document.querySelector(".login_form"),
  _signupForm = document.querySelector(".signup_form"),
  _signupLink = document.getElementById("signup"),
  _loginLink = document.getElementById("login"),
  _pwShowHide = document.querySelectorAll(".pw_hide"),
  _errMsg = document.querySelectorAll(".error_message"),
  _btn = document.querySelectorAll(".btn"),
  _inputBox = document.querySelectorAll(".input_box"),
  _signupBtn = document.querySelector(".signup-btn"),
  _optionField = document.querySelector(".option_field");

_pwShowHide.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.preventDefault();
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

const toggleForms = (e) => {
  e.preventDefault();
  _signupForm.classList.toggle("hidden");
  _loginForm.classList.toggle("hidden");
};

_signupLink.addEventListener("click", toggleForms);
_loginLink.addEventListener("click", toggleForms);

_errMsg.forEach((el) => {
  el.style.display = "none";
});

_btn.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    _inputBox.forEach((el) => {
      el.style.marginTop = "50px";
    });
    _signupBtn.style.marginTop = "50px";
    _optionField.style.marginTop = "45px";
    _errMsg.forEach((el) => {
      el.style.display = "block";
    });
    setTimeout(() => {
      _errMsg.forEach((el) => {
        el.style.display = "none";
      });
      _inputBox.forEach((el) => {
        el.style.marginTop = "23px";
      });
      _signupBtn.style.marginTop = "30px";
      _optionField.style.marginTop = "19px";
    }, 4000);
  });
});
