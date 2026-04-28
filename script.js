const analyzeBtn = document.getElementById("analyzeBtn");
const inputEl = document.getElementById("analysisInput");
const resultsSection = document.getElementById("resultsSection");
const messageBox = document.getElementById("messageBox");
const scoreEl = document.getElementById("fairnessScore");
const biasText = document.getElementById("biasText");

function animateScore(target) {
  let current = 0;
  const interval = setInterval(() => {
    if (current >= target) {
      clearInterval(interval);
    } else {
      current++;
      scoreEl.textContent = current + "/100";
    }
  }, 20);
}

async function analyzeFairness() {
  const userInput = inputEl.value.trim();

  if (!userInput) {
    alert("Enter some text");
    return;
  }

  try {
    const response = await fetch("https://solitary-butterfly-23f5.heera9a-chs.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: userInput })
    });

    const data = await response.json();

    messageBox.textContent = data.message || userInput;

    const score = Number(data.score) || 0;
    animateScore(score);

    biasText.textContent = "No biased attributes detected";

  } catch (error) {
    messageBox.textContent = "Error occurred";
    scoreEl.textContent = "0/100";
  }

  resultsSection.classList.remove("hidden");
}

analyzeBtn.addEventListener("click", analyzeFairness);
