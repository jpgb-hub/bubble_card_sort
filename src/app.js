/* global Promise */
/* eslint-disable */
import "bootstrap";
import "./style.css";

document.addEventListener("DOMContentLoaded", function() {
  const numbers = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];
  const suits = ["♠", "♣", "♥", "♦"];
  let deck = [];

  function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  function getRandomCard() {
    const randomSuitIndex = getRandomIndex(suits.length);
    const randomNumberIndex = getRandomIndex(numbers.length);
    const suit = suits[randomSuitIndex];
    const number = numbers[randomNumberIndex];

    return { suit, number };
  }

  function generateCards() {
    deck = [];
    let numCards = document.getElementById("numInput").value;
    for (let i = 0; i < numCards; i++) {
      let card = getRandomCard();
      deck.push(card);
      displayCard(card);
    }
  }

  function displayCard(card, containerSelector = ".card-container") {
    const cardContainer = document.querySelector(containerSelector);
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const suitTopElement = document.createElement("div");
    suitTopElement.classList.add("suit-top");
    const suitBottomElement = document.createElement("div");
    suitBottomElement.classList.add("suit-bottom");
    const numberElement = document.createElement("div");
    numberElement.classList.add("number");

    suitTopElement.textContent = card.suit;
    suitBottomElement.textContent = card.suit;
    numberElement.textContent = card.number;

    if (card.suit === "♥" || card.suit === "♦") {
      suitTopElement.classList.add("suit-red");
      suitBottomElement.classList.add("suit-red");
    }

    cardElement.appendChild(suitTopElement);
    cardElement.appendChild(numberElement);
    cardElement.appendChild(suitBottomElement);
    cardContainer.appendChild(cardElement);
  }

  document.getElementById("submitBtn").addEventListener("click", function() {
    let num = document.getElementById("numInput").value;
    if (num === "" || num <= 0) {
      alert("Please enter a valid number of cards.");
    } else {
      const cardContainer = document.querySelector(".card-container");
      while (cardContainer.firstChild) {
        cardContainer.firstChild.remove();
      }
      generateCards();
    }
  });

  document
    .getElementById("sortBtn")
    .addEventListener("click", async function() {
      await bubbleSort(deck);
    });

  async function bubbleSort(deck, i = 0, j = 0, n = deck.length) {
    if (i < n) {
      if (j < n - i - 1) {
        if (compareCards(deck[j], deck[j + 1]) > 0) {
          let tmp = deck[j];
          deck[j] = deck[j + 1];
          deck[j + 1] = tmp;
          removePreviousStep(i);
          displayStep(deck, i);
          await new Promise(r => setTimeout(r, 500));
        }
        bubbleSort(deck, i, j + 1, n);
      } else {
        bubbleSort(deck, i + 1, 0, n);
      }
    } else {
      const sortedCardContainer = document.querySelector(
        ".sorted-card-container"
      );
      while (sortedCardContainer.firstChild) {
        sortedCardContainer.firstChild.remove();
      }
      deck.forEach(card => displayCard(card, ".sorted-card-container"));
    }
  }

  function compareCards(a, b) {
    const numberAIndex = numbers.indexOf(a.number);
    const numberBIndex = numbers.indexOf(b.number);
    if (numberAIndex < numberBIndex) return -1;
    if (numberAIndex > numberBIndex) return 1;
    return 0;
  }

  function removePreviousStep(i) {
    const stepContainer = document.getElementById(`step-${i}`);
    if (stepContainer) {
      stepContainer.remove();
    }
  }

  function displayStep(deck, i) {
    const stepContainer = document.createElement("div");
    stepContainer.classList.add("step-container");
    stepContainer.id = `step-${i}`;
    document.body.appendChild(stepContainer);
    deck.forEach(card => displayCard(card, `#step-${i}`));
  }
});
