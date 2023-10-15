"use strict";

const _question = document.getElementById("question"),
  _options = document.querySelector(".quiz-options"),
  _correctScore = document.getElementById("correct-score"),
  _totalQuestion = document.getElementById("total-question"),
  _checkBtn = document.getElementById("check-answer"),
  _playAgainBtn = document.getElementById("play-again"),
  _menuBtn = document.getElementById("menu-btn"),
  _result = document.getElementById("result"),
  _category = document.querySelector(".category"),
  _difficulty = document.querySelector(".difficulty");

const selectedCategory = Number(localStorage.getItem("category"));
const selectedCategoryName = localStorage.getItem("categoryName");
const selectedDiffi = localStorage.getItem("difficulty");
const selectedNum = Number(localStorage.getItem("number"));

let correctAnswer = "",
  correctScore = 0,
  askedCount = 0;

function eventListeners() {
  _checkBtn.addEventListener("click", checkAnswer);
  _playAgainBtn.addEventListener("click", restartQuiz);
}

document.addEventListener("DOMContentLoaded", function () {
  loadQuestion();
  eventListeners();
  _totalQuestion.textContent = selectedNum;
  _correctScore.textContent = correctScore;
  _category.textContent = selectedCategoryName;
  _difficulty.textContent = selectedDiffi;
});

async function loadQuestion() {
  const APIUrl = `https://opentdb.com/api.php?amount=${selectedNum}&category=${selectedCategory}&difficulty=${selectedDiffi.toLowerCase()}`;
  const result = await fetch(`${APIUrl}`);
  const data = await result.json();
  data.results.map((el) => {
    showQuestion(el);
  });
}

function showQuestion(data) {
  _checkBtn.disabled = false;
  correctAnswer = data.correct_answer;
  let incorrectAnswers = data.incorrect_answers;
  let optionsList = incorrectAnswers;
  optionsList.splice(
    Math.floor(Math.random() * (incorrectAnswers.length + 1)),
    0,
    correctAnswer
  );
  _question.innerHTML = `${data.question}`;
  _options.innerHTML = `${optionsList
    .map((option, index) => ` <li> ${index + 1}. <span> ${option}</span> </li>`)
    .join("")}`;
  selectOption();
}

function selectOption() {
  _options.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", () => {
      if (_options.querySelector(".selected")) {
        const activeOption = _options.querySelector(".selected");
        activeOption.classList.remove("selected");
      }
      option.classList.add("selected");
    });
  });
}

function checkAnswer() {
  _checkBtn.disabled = true;
  if (_options.querySelector(".selected")) {
    let selectedAnswer = _options.querySelector(".selected span").textContent;
    if (selectedAnswer.trim() === HTMLDecode(correctAnswer)) {
      correctScore++;
      _result.innerHTML = `<p><i class = "fas fa-check"></i>Correct Answer!</p>`;
    } else {
      _result.innerHTML = `<p><i class = "fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b> ${correctAnswer} </small>`;
    }
    checkCount();
    setTimeout(() => {
      if (selectedNum != askedCount) {
        loadQuestion();
      }
      _result.innerHTML = "";
    }, 2000);
  } else {
    _result.innerHTML = `<p style="font-size:13px; margin-right:11%; color:red"><i class = "fas fa-question"></i>Please select an option!</p>`;
    _checkBtn.disabled = false;
    setTimeout(() => {
      _result.innerHTML = "";
    }, 2000);
  }
}

function HTMLDecode(textString) {
  let doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}

function checkCount() {
  askedCount++;
  _correctScore.textContent = correctScore;
  if (askedCount == selectedNum) {
    _playAgainBtn.style.display = "block";
    _menuBtn.style.display = "block";
    _checkBtn.style.display = "none";
    localStorage.clear();
  }
}

_menuBtn.addEventListener("click", () => {
  window.location.href = "/menu";
});

function restartQuiz() {
  correctScore = askedCount = 0;
  _playAgainBtn.style.display = "none";
  _menuBtn.style.display = "none";
  _checkBtn.style.display = "block";
  _checkBtn.disabled = false;
  _correctScore.textContent = correctScore;
  loadQuestion();
}
