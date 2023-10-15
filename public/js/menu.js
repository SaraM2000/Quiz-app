"use strict";

const _category = document.querySelector(".category"),
  _difficultyMode = document.querySelector(".difficulty"),
  _questionsNumber = document.querySelector(".number-of-questions"),
  _startBtn = document.querySelector(".start-btn"),
  _username = document.querySelector("h1 span"),
  _warn = document.querySelector(".warn"),
  _logoutBtn = document.querySelector(".logout-btn");

async function loadCategoryOptions() {
  const APIUrl = `https://opentdb.com/api_category.php`;
  const result = await fetch(`${APIUrl}`);
  const data = await result.json();
  const categories = data.trivia_categories.map(
    (el, idx) => `<option value="${idx + 9}">${el.name}</option>`
  );

  _category.innerHTML += categories;
}
loadCategoryOptions();

_startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const selectedCategory = _category.value,
    selectedCategoryName = _category.options[_category.selectedIndex].text,
    selectedDiffi = _difficultyMode.value,
    selectedNum = _questionsNumber.value;
  if ((selectedCategory != selectedDiffi) != "0" && selectedNum != "") {
    localStorage.setItem("category", selectedCategory);
    localStorage.setItem("categoryName", selectedCategoryName);
    localStorage.setItem("difficulty", selectedDiffi);
    localStorage.setItem("number", selectedNum);
    window.location.href = "/questions";
  } else {
    _warn.style.display = "block";
    setTimeout(() => {
      _warn.style.display = "none";
    }, 2000);
  }
});
