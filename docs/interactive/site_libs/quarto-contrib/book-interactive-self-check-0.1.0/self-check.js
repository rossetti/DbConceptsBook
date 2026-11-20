// Self-check questions: behaviour for the markup written by self-check.lua.
// Nothing is recorded or sent anywhere; all feedback stays in the reader's browser.
(function () {
  "use strict";

  var TEXT = {
    choose: "Choose an answer first.",
    correct: "Correct.",
    incorrectSingle: "Not quite. Read the feedback, then try again or show the answer.",
    incorrectMultiple: "Not quite. Some of your choices are wrong, or some right choices are missing.",
    shown: "The answer is shown.",
    markRight: "Correct choice",
    markWrong: "Incorrect choice"
  };

  function options(q) { return Array.prototype.slice.call(q.querySelectorAll(".bisc-option")); }
  function input(opt) { return opt.querySelector("input"); }
  function isCorrect(opt) { return opt.getAttribute("data-correct") === "true"; }

  function setMark(opt, right) {
    var mark = opt.querySelector(".bisc-mark");
    if (!mark) {
      mark = document.createElement("span");
      mark.className = "bisc-mark";
      var label = opt.querySelector("label");
      label.parentNode.insertBefore(mark, label.nextSibling);
    }
    mark.textContent = right ? TEXT.markRight : TEXT.markWrong;
    opt.classList.toggle("bisc-right", right);
    opt.classList.toggle("bisc-wrong", !right);
  }

  function showFeedback(opt, show) {
    var fb = opt.querySelector(".bisc-feedback");
    if (fb) fb.hidden = !show;
  }

  function clearMarks(q) {
    options(q).forEach(function (opt) {
      opt.classList.remove("bisc-right", "bisc-wrong");
      var mark = opt.querySelector(".bisc-mark");
      if (mark) mark.remove();
      showFeedback(opt, false);
    });
    var ex = q.querySelector(".bisc-explanation");
    if (ex) ex.hidden = true;
    q.querySelector(".bisc-result").textContent = "";
    q.classList.remove("bisc-solved");
  }

  function finish(q, message) {
    var ex = q.querySelector(".bisc-explanation");
    if (ex) ex.hidden = false;
    q.querySelector(".bisc-result").textContent = message;
    q.classList.add("bisc-solved");
  }

  function check(q) {
    clearMarks(q);
    var opts = options(q);
    var chosen = opts.filter(function (o) { return input(o).checked; });
    var result = q.querySelector(".bisc-result");
    if (chosen.length === 0) { result.textContent = TEXT.choose; return; }
    chosen.forEach(function (o) { setMark(o, isCorrect(o)); showFeedback(o, true); });
    var allRight = opts.every(function (o) { return input(o).checked === isCorrect(o); });
    if (allRight) {
      finish(q, TEXT.correct);
    } else {
      result.textContent = q.getAttribute("data-multiple") === "true"
        ? TEXT.incorrectMultiple : TEXT.incorrectSingle;
    }
  }

  function reveal(q) {
    clearMarks(q);
    options(q).forEach(function (o) {
      input(o).checked = isCorrect(o);
      if (isCorrect(o)) setMark(o, true);
      showFeedback(o, true);
    });
    finish(q, TEXT.shown);
  }

  function reset(q) {
    clearMarks(q);
    options(q).forEach(function (o) { input(o).checked = false; });
  }

  function init(q) {
    q.querySelector(".bisc-check").addEventListener("click", function () { check(q); });
    q.querySelector(".bisc-reveal").addEventListener("click", function () { reveal(q); });
    q.querySelector(".bisc-reset").addEventListener("click", function () { reset(q); });
    // Changing a choice after checking clears the old verdict.
    options(q).forEach(function (o) {
      input(o).addEventListener("change", function () {
        if (q.querySelector(".bisc-result").textContent !== "") clearMarks(q);
      });
    });
  }

  function initAll() {
    Array.prototype.forEach.call(document.querySelectorAll(".bisc-question"), init);
    // "Clear all answers" resets every question in its group, so a reader can start over.
    Array.prototype.forEach.call(document.querySelectorAll(".bisc-self-check"), function (group) {
      var clear = group.querySelector(".bisc-clear-all");
      if (!clear) return;
      clear.addEventListener("click", function () {
        Array.prototype.forEach.call(group.querySelectorAll(".bisc-question"), reset);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
