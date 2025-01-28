// Sélection des éléments DOM
const gameBoard = document.getElementById("gameBoard")
const startButton = document.getElementById("startButton")
const cancelButton = document.getElementById("cancelButton")
const scoreDisplay = document.getElementById("score")
const timerDisplay = document.getElementById("timer")
const levelDisplay = document.getElementById("level")
const bestScoreDisplay = document.getElementById("bestScore")
const endGameModal = document.getElementById("endGameModal")
const endGameMessage = document.getElementById("endGameMessage")
const restartButton = document.getElementById("restartButton")
const newGameButton = document.getElementById("newGameButton")
const confirmationModal = document.getElementById("confirmationModal")
const confirmCancel = document.getElementById("confirmCancel")
const cancelCancel = document.getElementById("cancelCancel")

// Variables du jeu
let cards = []
let flippedCards = []
let score = 0
let timerInterval = null
let isGameActive = false
let currentLevel = "easy"

// Récupération du meilleur score
let bestScore = localStorage.getItem("bestScore") || 0
bestScoreDisplay.textContent = bestScore

// Configuration du jeu
const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵"]

const levels = {
  easy: { pairs: 8, time: 60 },
  medium: { pairs: 12, time: 90 },
  hard: { pairs: 16, time: 120 },
}

// Fonctions du jeu
function createCard(emoji) {
  const card = document.createElement("div")
  card.classList.add("card")
  card.dataset.emoji = emoji
  card.addEventListener("click", flipCard)
  return card
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function startGame(level = "easy") {
  if (timerInterval) clearInterval(timerInterval)

  isGameActive = true
  currentLevel = level
  const { pairs, time } = levels[level]

  gameBoard.innerHTML = ""
  cards = []
  flippedCards = []
  score = 0
  scoreDisplay.textContent = score
  timerDisplay.textContent = `${time}s`
  levelDisplay.textContent = level.charAt(0).toUpperCase() + level.slice(1)

  const gameEmojis = emojis.slice(0, pairs)
  const allEmojis = [...gameEmojis, ...gameEmojis]
  shuffleArray(allEmojis)

  const columns = Math.ceil(Math.sqrt(allEmojis.length))
  gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`

  allEmojis.forEach((emoji) => {
    const card = createCard(emoji)
    cards.push(card)
    gameBoard.appendChild(card)
  })

  startTimer(time)
}

function startTimer(time) {
  let remainingTime = time
  timerInterval = setInterval(() => {
    remainingTime--
    timerDisplay.textContent = `${remainingTime}s`
    if (remainingTime <= 0) endGame(false)
  }, 1000)
}

function flipCard() {
  if (!isGameActive || flippedCards.length >= 2 || this.classList.contains("flipped")) return

  this.textContent = this.dataset.emoji
  this.classList.add("flipped")
  flippedCards.push(this)

  if (flippedCards.length === 2) setTimeout(checkMatch, 1000)
}

function checkMatch() {
  const [card1, card2] = flippedCards
  const match = card1.dataset.emoji === card2.dataset.emoji

  if (match) {
    score += 10
    scoreDisplay.textContent = score
    flippedCards.forEach((card) => card.removeEventListener("click", flipCard))
    if (cards.every((card) => card.classList.contains("flipped"))) endGame(true)
  } else {
    flippedCards.forEach((card) => {
      card.classList.remove("flipped")
      card.textContent = ""
    })
  }
  flippedCards = []
}

function endGame(success) {
  isGameActive = false
  clearInterval(timerInterval)
  endGameModal.style.display = "flex"

  const message = success ? `Félicitations ! Score : ${score}` : `Temps écoulé ! Score : ${score}`

  endGameMessage.textContent = message

  if (score > bestScore) {
    bestScore = score
    localStorage.setItem("bestScore", bestScore)
    bestScoreDisplay.textContent = bestScore
  }
}

function restartGame() {
  endGameModal.style.display = "none"
  startGame(currentLevel)
}

function newGame() {
  endGameModal.style.display = "none"
  window.location.reload()
}

// Gestionnaires d'événements
cancelButton.addEventListener("click", () => {
  if (isGameActive) confirmationModal.style.display = "flex"
})

confirmCancel.addEventListener("click", () => {
  confirmationModal.style.display = "none"
  isGameActive = false
  clearInterval(timerInterval)
  window.location.reload()
})

cancelCancel.addEventListener("click", () => {
  confirmationModal.style.display = "none"
})

startButton.addEventListener("click", () => startGame(document.getElementById("levelSelect").value))
restartButton.addEventListener("click", restartGame)
newGameButton.addEventListener("click", newGame)

// Feedback tactile
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("mousedown", () => (button.style.transform = "scale(0.98)"))
  button.addEventListener("mouseup", () => (button.style.transform = ""))
  button.addEventListener("mouseleave", () => (button.style.transform = ""))
})

// Accessibilité
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") confirmationModal.style.display = "none"
})

