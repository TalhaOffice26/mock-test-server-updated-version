//part vars
let totalParts = 2;
let currentPart = 1;
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("previous-button");

async function submitTest(){
  sessionStorage.setItem("writingIsCompleted", "true");
  const writingInputToSend = gatherInput(inputs);
  window.location.href = "/mock-test";
  const res = await fetch('/api/update-mock-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({writingInputs: writingInputToSend, mod: "writing"})
  })
}
async function userData(){
  const res = await fetch("/api/user-data");

  if(res.ok){
    const data = await res.json();
    return data;
  }  
}

document.addEventListener("DOMContentLoaded", async(e)=>{
  e.preventDefault();

  const user = await userData();

  const userDiv = document.getElementById("userID");

  userDiv.textContent = user.username;
})

function gatherInput(inputs){
    const inputObj = {}
    inputs.forEach((input, index)=>{
        
        inputObj[`part-${index+ 1}`] = input.value;
    })

   return inputObj;

}


const submitBtn = document.getElementById("finishBtn");
const submitModal = document.getElementById("submit-warning-modal");
submitBtn.addEventListener("click", async function(e){
  e.preventDefault();
  submitModal.style.display = "flex";
})





 const submitOkButton = document.getElementById("submit-ok-btn");
 const submitStayButton = document.getElementById("submit-stay-btn");

 submitOkButton.addEventListener("click", async (e)=>{
  e.preventDefault();
  submitModal.style.display = "none";
  sessionStorage.setItem("writingIsCompleted", "true");
  const writingInputToSend = gatherInput(inputs);
  window.location.href = "/mock-test";
  const res = await fetch('/api/update-mock-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({writingInputs: writingInputToSend, mod: "writing"})
  })
  
  
 })


 submitStayButton.addEventListener("click", async(e)=>{
  e.preventDefault();
  submitModal.style.display = "none";
 })


window.addEventListener("keydown",function (e) {
    if (e.key === "F3" || (e.ctrlKey && e.key === "f") || (e.ctrlKey && e.key === "F")) { 
        e.preventDefault();
    }
})


//fullscreen check

const fullscreenModal = document.getElementById("fullscreen-warning-modal");
const fullscreenOkBtn = document.getElementById("fullscreen-ok-btn");
const fullscreenStayBtn = document.getElementById("fullscreen-stay-btn");

// Show modal every time fullscreen is exited
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    fullscreenModal.style.display = "flex";
  }
});

// OK button submits the test
fullscreenOkBtn.onclick = async function() {
  fullscreenModal.style.display = "none";
  sessionStorage.setItem("writingIsCompleted", "true");
  const writingInputToSend = gatherInput(inputs);
  window.location.href = "/mock-test";
  const res = await fetch('/api/update-mock-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({writingInputs: writingInputToSend, mod: "writing"})
  })
  
};

// Stay button re-enters fullscreen
fullscreenStayBtn.onclick = function() {
  fullscreenModal.style.display = "none";
  document.documentElement.requestFullscreen().catch(() => {});
};

//fullscreen check





//popup settings logic
const popupSettings = document.getElementById("popup-settings");
const popupNote = document.getElementById("popup-note");
function settingsMenu(){
    popupSettings.classList.toggle("menu-visible")
}

function closeSettings(){
    popupSettings.classList.remove("menu-visible")
    popupNote.classList.remove("menu-visible");
}

function openNotes(){
    popupNote.classList.toggle("menu-visible");
}
//popup settings logic

//popup to start writing
  function openListeningPopup() {
    document.getElementById("listeningOverlay").style.display = "flex";
    document.body.classList.add("listening-popup-active");
  }

  function closeListeningPopup() {
    const overlay = document.getElementById("listeningOverlay");
    overlay.style.display = "none";
    document.body.classList.remove("listening-popup-active");

    // Try fullscreen (fallback if disallowed)
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => console.warn("Fullscreen blocked:", err));
    }

    // Resume your site logic (example: play audio if present)
    //timer logic (timer blunt)

const timer = document.getElementById("timer");

let minutesRemaining = parseInt(timer.textContent);


const interval = setInterval(async()=>{
  minutesRemaining -= 1;


  if(minutesRemaining <= 10){
    const timerBlunt = document.querySelector(".timer-blunt");
    const timerSpecific = document.querySelector(".timer-specific");

    timerSpecific.style.opacity = 1;
    timerSpecific.style.color = "red";
    timerBlunt.style.opacity = 0;
  }
  if(minutesRemaining <= 0){
    timer.textContent = '0';
    await submitTest();
    clearInterval(interval);
  }else{
    timer.textContent = minutesRemaining;
  }
}, 1 * 60 * 1000);


//timer logic (timer specific)

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
let timerSpecific;
let totalSeconds = 60 * 60
function updateTimerDisplay(){
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function startTimer(){
  timerSpecific = setInterval(function (){
    if(totalSeconds <= 0){
      clearInterval(timerSpecific);
    }else{
      totalSeconds--;
      updateTimerDisplay()
    }
  }, 1000);
}

startTimer();
  }
  openListeningPopup()
//popup to start writing


//part logic
function showPart(part){
  for (let i=1; i <= totalParts; i++){
    document.getElementById(`part-${i}`).style.display = i === part ?
    "block" : "none";
  }
  currentPart = part;
  
}



function showNext(event){
  event.preventDefault();
  if(currentPart < totalParts){
    currentPart++;
    showPart(currentPart);
  }
}

function showPrevious(event){
  event.preventDefault()
  if(currentPart > 1){
    currentPart--;
    showPart(currentPart);
  }
}

function update(){
  if(currentPart == 2){
    nextButton.classList.add("bton-grey");
    nextButton.classList.remove("next");
    //console.log(currentPart);
  }else{
    nextButton.classList.add("next");
  }
  if(currentPart == 1){
    prevButton.classList.add("bton-grey");
    prevButton.classList.remove("prev");
  }else{
    prevButton.classList.add("prev");
  }
}

setInterval(update, 1);



//timer logic

const timer = document.getElementById("timer");

let minutesRemaining = parseInt(timer.textContent);


const interval = setInterval(()=>{
  minutesRemaining -= 2;

  if(minutesRemaining <= 0){
    timer.textContent = '0';
    document.querySelector('[name="submit-button"]').click();
    clearInterval(interval);
  }else{
    timer.textContent = minutesRemaining;
  }
}, 2 * 60 * 1000);


//timer logic (timer specific)

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
let timerSpecific;
let totalSeconds = 60 * 60
function updateTimerDisplay(){
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function startTimer(){
  timerSpecific = setInterval(function (){
    if(totalSeconds <= 0){
      clearInterval(timerSpecific);
    }else{
      totalSeconds--;
      updateTimerDisplay()
    }
  }, 1000);
}

startTimer(); 





//word count logic

    //part 1
    const textarea = document.getElementById('writer-1');
    const wordCountDisplay = document.getElementById('wordCount-1');

    textarea.addEventListener('input', () => {
      const text = textarea.value.trim();
      const wordCount = text === '' ? 0 : text.split(/\s+/).length;
      wordCountDisplay.textContent = `Word Count: ${wordCount}`;
    });


    //part 2

    const textArea2 = document.getElementById('writer-2');
    const wordCountDisplay2 = document.getElementById("wordCount-2");

    textArea2.addEventListener('input', () => {
      const text = textArea2.value.trim();
      const wordCount = text === '' ? 0 : text.split(/\s+/).length;
      wordCountDisplay2.textContent = `Word Count: ${wordCount}`;
    });

const questionData = localStorage.getItem("data");
const parsedQuestions = JSON.parse(questionData);


const questions = parsedQuestions.writing.questions;



questions.forEach((q, index)=>{
    if(q.part == 1){
        const infoPanel = document.getElementById("info-panel-1");
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        q.image.forEach((img, idx)=>{
            imageContainer.innerHTML += `<img src="${img}">`
        })
        infoPanel.innerHTML += `
                            <p>${q.question}</p>
        `
        infoPanel.appendChild(imageContainer);
    }

    if(q.part == 2){
        const infoPanel = document.getElementById("info-panel-2");

        infoPanel.innerHTML += `
                        <p>${q.question}</p>
        `
    }
})


const inputs = document.querySelectorAll(".write-input")




document.addEventListener("wheel", function (e) {
  if (e.ctrlKey) {
    e.preventDefault();
  }
}, { passive: false });


document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "=" ||
    e.key === "0"
  )) {
    e.preventDefault();
  }
});







