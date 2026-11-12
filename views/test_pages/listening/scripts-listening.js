//import { listeningCheck } from "../../client.js";

async function userData(){
  const res = await fetch("/api/user-data");

  if(res.ok){
    const data = await res.json();
    return data;
  }  
}


async function submitTest(){
  inputCheckUpdated();
  sessionStorage.setItem("listeningIscompleted", "true");
  const [scoreToSend, mistakesToSend] = findDifferences(answerArrayUpdated, officialAnswers);
  window.location.href = "/mock-test";
  await fetch('/api/update-mock-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score: scoreToSend, mistakes: mistakesToSend, mod: "listening"})
  });
}

document.addEventListener("DOMContentLoaded", async(e)=>{
  e.preventDefault();

  const user = await userData();

  const userDiv = document.getElementById("userID");

  userDiv.textContent = user.username;
})

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
  inputCheckUpdated();
  sessionStorage.setItem("listeningIscompleted", "true");
  const [scoreToSend, mistakesToSend] = findDifferences(answerArrayUpdated, officialAnswers);
  window.location.href = "/mock-test";
  await fetch('/api/update-mock-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score: scoreToSend, mistakes: mistakesToSend, mod: "listening"})
  });
  
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

//part vars
let totalParts = 4;
let currentPart = 1;

//drag and drop logic

let draggedElement = null;
let originalParent = null;


function allowDrop(ev){
  ev.preventDefault();
}

function drag(ev){
  draggedElement = ev.target;
  originalParent = ev.target.parentElement;
}

function drop(ev){
  ev.preventDefault();
   
  //if the drop area already has an item

  if(ev.target.classList.contains('drop-input')){
    const existing = ev.target.querySelector('.reason');

    // Move dragged into drop target
  if(existing && existing !== draggedElement){
    originalParent.appendChild(existing);
    //swapbwap
  }

  //placed dragged into new target
  ev.target.innerHTML = '';

  ev.target.appendChild(draggedElement);
  }

  
}


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
  inputCheckUpdated();
  sessionStorage.setItem("listeningIscompleted", "true");
  const [scoreToSend, mistakesToSend] = findDifferences(answerArrayUpdated, officialAnswers);
  window.location.href = "/mock-test";
  await fetch('/api/update-mock-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score: scoreToSend, mistakes: mistakesToSend, mod: "listening"})
  });
  
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







const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("previous-button");

  function openListeningPopup() {
    document.getElementById("listeningOverlay").style.display = "flex";
    document.body.classList.add("listening-popup-active");
  }


  let currentAudio = null;
  let retryCount = 0;
  function closeListeningPopup() {
    const overlay = document.getElementById("listeningOverlay");
    overlay.style.display = "none";
    document.body.classList.remove("listening-popup-active");

    // Try fullscreen (fallback if disallowed)
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => console.warn("Fullscreen blocked:", err));
    }


// 1. Cleanup old instances
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.onended = null;
        currentAudio.onerror = null;
        currentAudio.src = "";
        currentAudio.load();
    }

    // 2. Initialize
    currentAudio = new Audio('/audio/' + mockID);
    currentAudio.preload = "auto";

    // 3. THE SELF-HEALING LOGIC
    currentAudio.onerror = function() {
        console.error("Audio error detected. Attempting to recover...");
        
        // Save the exact moment the student was at
        const lastPosition = currentAudio.currentTime;

        if (retryCount < 5) { // Try up to 5 times
            retryCount++;
            setTimeout(() => {
                console.log(`Retry attempt ${retryCount} for position ${lastPosition}s`);
                currentAudio.load();
                currentAudio.currentTime = lastPosition;
                currentAudio.play().catch(e => console.error("Resume failed:", e));
            }, 2000); // Wait 2 seconds for network to stabilize
        } else {
            alert("Connection lost. Please refresh the page and continue.");
        }
    };

    // Add this inside your closeListeningPopup function
currentAudio.onwaiting = function() {
    console.warn("Audio is buffering... please wait.");
    // You could show a small spinner here to reassure the student
};

currentAudio.onstalled = function() {
    console.warn("Network is too slow. Attempting to kickstart...");
    currentAudio.load(); // Forces the browser to re-establish the connection
    currentAudio.play();
};

    // Reset retry count on successful play
    currentAudio.onplaying = () => { retryCount = 0; };

    currentAudio.play().catch(err => {
        console.error("Autoplay prevented. Please click anywhere on the page.", err);
    });
;

 

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
let totalSeconds = 32 * 60
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

openListeningPopup();

//part logic
function showPart(part){
  for (let i=1; i <= totalParts; i++){
    document.getElementById(`part-${i}`).style.display = i === part ?
    "block" : "none";

    if(i === part){
      document.getElementById(`part-${i}-button`).classList.add('active');
    } else{
      document.getElementById(`part-${i}-button`).classList.remove('active');
    }
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
  if(currentPart == 4){
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


//part logic


const questionData = localStorage.getItem("data")
const parsedQuestionData = JSON.parse(questionData);
console.log(parsedQuestionData.listening.questions);


//dataset prototype
const questions = parsedQuestionData.listening.questions
const instructions = parsedQuestionData.listening.instructions
const mockID = parsedQuestionData.mockNumber
const officialAnswers = parsedQuestionData.listening.answers
//dataset prototype
//question types



const part1 = document.getElementById("part-1");
const part1Margin = document.getElementById("part-margin-1");
const part2 = document.getElementById("part-2");
const part2Margin = document.getElementById("part-margin-2");
const part3 = document.getElementById("part-3");
const part3Margin = document.getElementById("part-margin-3");
const part4 = document.getElementById("part-4");
const part4Margin = document.getElementById("part-margin-4");



//dynamic questions logic
const questionContainer = document.getElementById("test-content");


const seenGroups = new Set();
const groupCounts = new Map();

//insert groups and question types for each part
questions.forEach((q) =>{
    groupCounts.set(q.group, (groupCounts.get(q.group) || 0) + 1);


    if(q.part == 1){
      if(!seenGroups.has(q.group)){
        const groupDiv = document.createElement("div");
        groupDiv.classList.add(`group-${q.group}`);

        //add each type of container to each group to make life easier...
        //mcq(one Choice)
        const mcqContainerDiv = document.createElement("div");
        mcqContainerDiv.classList.add("mcq-container-one-choice");
        groupDiv.appendChild(mcqContainerDiv);
        //mcq(two Choice)

        const mcqContainerTwoDiv = document.createElement("div");
        mcqContainerTwoDiv.classList.add("mcq-container-two-choice");
        groupDiv.appendChild(mcqContainerTwoDiv);

        //table completion

        const tableDiv = document.createElement("div");
        tableDiv.classList.add("table-container");
        groupDiv.appendChild(tableDiv);

        //sentence completion

        const sentenceCompletionDiv = document.createElement("div");
        sentenceCompletionDiv.classList.add("sentence-completion-container");
        groupDiv.appendChild(sentenceCompletionDiv);
        
        //form completion

        const formDiv = document.createElement("div");
        formDiv.classList.add("form-container");
        groupDiv.appendChild(formDiv);

        //note completion

        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note-container");
        groupDiv.appendChild(noteDiv);

        //flow chart completion

        const flowChartDiv = document.createElement("div");
        flowChartDiv.classList.add("flowchart-container");
        groupDiv.appendChild(flowChartDiv);
        

        //short answer questions

        const shortAnswerDiv = document.createElement("div");
        shortAnswerDiv.classList.add("short-answer-container");
        shortAnswerDiv.classList.add("question");
        groupDiv.appendChild(shortAnswerDiv);

        //matching questions

        const matchingContainer = document.createElement("div");
        matchingContainer.classList.add("matching-container");
        groupDiv.appendChild(matchingContainer);

        //diagram labelling

        const diagramLabelDiv=  document.createElement("div");
        diagramLabelDiv.classList.add("diagram-label-container");
        groupDiv.appendChild(diagramLabelDiv);


        const fullNoteCompletionContainer = document.createElement("div");
        fullNoteCompletionContainer.classList.add("full-note-completion-container");
        groupDiv.appendChild(fullNoteCompletionContainer);

        const matchingInformationContainer = document.createElement("div");
        matchingInformationContainer.classList.add("matching-information-container");
        groupDiv.appendChild(matchingInformationContainer);


        //add each type of container to each group to make life easier...
      
        part1Margin.appendChild(groupDiv);
        seenGroups.add(q.group);
      }
    }
    
    if(q.part == 2){
      if(!seenGroups.has(q.group)){
        const groupDiv = document.createElement("div");
        groupDiv.classList.add(`group-${q.group}`);


        
        //add each type of container to each group to make life easier...
        //mcq(one Choice)
        const mcqContainerDiv = document.createElement("div");
        mcqContainerDiv.classList.add("mcq-container-one-choice");
        groupDiv.appendChild(mcqContainerDiv);
        //mcq(two Choice)

        const mcqContainerTwoDiv = document.createElement("div");
        mcqContainerTwoDiv.classList.add("mcq-container-two-choice");
        groupDiv.appendChild(mcqContainerTwoDiv);

        //table completion

        const tableDiv = document.createElement("div");
        tableDiv.classList.add("table-container");
        groupDiv.appendChild(tableDiv);

        //sentence completion

        const sentenceCompletionDiv = document.createElement("div");
        sentenceCompletionDiv.classList.add("sentence-completion-container");
        groupDiv.appendChild(sentenceCompletionDiv);
        
        //form completion

        const formDiv = document.createElement("div");
        formDiv.classList.add("form-container");
        groupDiv.appendChild(formDiv);

        //note completion

        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note-container");
        groupDiv.appendChild(noteDiv);

        //flow chart completion

        const flowChartDiv = document.createElement("div");
        flowChartDiv.classList.add("flowchart-container");
        groupDiv.appendChild(flowChartDiv);
        

        //short answer questions

        const shortAnswerDiv = document.createElement("div");
        shortAnswerDiv.classList.add("short-answer-container");
        groupDiv.appendChild(shortAnswerDiv);

        //matching questions

        const matchingContainer = document.createElement("div");
        matchingContainer.classList.add("matching-container");
        groupDiv.appendChild(matchingContainer);

        //diagram labelling

        const diagramLabelDiv=  document.createElement("div");
        diagramLabelDiv.classList.add("diagram-label-container");
        groupDiv.appendChild(diagramLabelDiv);

        const fullNoteCompletionContainer = document.createElement("div");
        fullNoteCompletionContainer.classList.add("full-note-completion-container");
        groupDiv.appendChild(fullNoteCompletionContainer);


        const matchingInformationContainer = document.createElement("div");
        matchingInformationContainer.classList.add("matching-information-container");
        groupDiv.appendChild(matchingInformationContainer);


        //add each type of container to each group to make life easier...




        part2Margin.appendChild(groupDiv);
        seenGroups.add(q.group);
      }
    }

    if(q.part == 3){
      if(!seenGroups.has(q.group)){
        const groupDiv = document.createElement("div");
        groupDiv.classList.add(`group-${q.group}`);



        //add each type of container to each group to make life easier...
        //mcq(one Choice)
        const mcqContainerDiv = document.createElement("div");
        mcqContainerDiv.classList.add("mcq-container-one-choice");
        groupDiv.appendChild(mcqContainerDiv);
        //mcq(two Choice)

        const mcqContainerTwoDiv = document.createElement("div");
        mcqContainerTwoDiv.classList.add("mcq-container-two-choice");
        groupDiv.appendChild(mcqContainerTwoDiv);

        //table completion

        const tableDiv = document.createElement("div");
        tableDiv.classList.add("table-container");
        groupDiv.appendChild(tableDiv);

        //sentence completion

        const sentenceCompletionDiv = document.createElement("div");
        sentenceCompletionDiv.classList.add("sentence-completion-container");
        groupDiv.appendChild(sentenceCompletionDiv);
        
        //form completion

        const formDiv = document.createElement("div");
        formDiv.classList.add("form-container");
        groupDiv.appendChild(formDiv);

        //note completion

        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note-container");
        groupDiv.appendChild(noteDiv);

        //flow chart completion

        const flowChartDiv = document.createElement("div");
        flowChartDiv.classList.add("flowchart-container");
        groupDiv.appendChild(flowChartDiv);
        

        //short answer questions

        const shortAnswerDiv = document.createElement("div");
        shortAnswerDiv.classList.add("short-answer-container");
        groupDiv.appendChild(shortAnswerDiv);

        //matching questions

        const matchingContainer = document.createElement("div");
        matchingContainer.classList.add("matching-container");
        groupDiv.appendChild(matchingContainer);

        //diagram labelling

        const diagramLabelDiv=  document.createElement("div");
        diagramLabelDiv.classList.add("diagram-label-container");
        groupDiv.appendChild(diagramLabelDiv);

        const fullNoteCompletionContainer = document.createElement("div");
        fullNoteCompletionContainer.classList.add("full-note-completion-container");
        groupDiv.appendChild(fullNoteCompletionContainer);

        const matchingInformationContainer = document.createElement("div");
        matchingInformationContainer.classList.add("matching-information-container");
        groupDiv.appendChild(matchingInformationContainer);


        //add each type of container to each group to make life easier...


        part3Margin.appendChild(groupDiv);
        seenGroups.add(q.group);
      }
    }
    if(q.part == 4){
      if(!seenGroups.has(q.group)){
        const groupDiv = document.createElement("div");
        groupDiv.classList.add(`group-${q.group}`);

        //add one container for part 4----10 questions
        const fullNoteCompletionContainer = document.createElement("div");
        fullNoteCompletionContainer.classList.add("full-note-completion-container");
        groupDiv.appendChild(fullNoteCompletionContainer);

        //add each type of container to each group to make life easier...



        part4Margin.appendChild(groupDiv);
        seenGroups.add(q.group);
      }        
    }
    

});

//insert questions in each group
let answerBoxAdded = false; // for flow-chart
questions.forEach((q, index) =>{
  const groupDiv = document.querySelector(`.group-${q.group}`);

  if(q.type === "mcq"){
    const mcqContainer = groupDiv.querySelector(".mcq-container-one-choice");
    mcqContainer.innerHTML += `
                  <div class="mcq"><p><strong>${index + 1}.</strong> ${q.text}</p>
                  <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="${index + 1}" >&nbsp;&nbsp;${q.options[0]}</label><br>
                  <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="${index + 1}" >&nbsp;&nbsp;${q.options[1]}</label><br>
                  <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="${index + 1}" >&nbsp;&nbsp;${q.options[2]}</label><br>
                  </div>          
    `
    
  }

  if(q.type == "shortAnswer"){
    const shortAnswerContainer = groupDiv.querySelector(".short-answer-container");
    shortAnswerContainer.innerHTML += `
                <div class="short-answer-item">
                <label><strong>${q.id}</strong> ${q.text}
                <input type="text" name="${q.id}" placeholder="${q.id}">
                </label>
                </div>
    `
  }

  if(q.type == "sentence-completion"){
    function renderTextWithInput(text){
      const htmlString = text.replaceAll("[blank]", `<input type="text" class="blank-input">`);
      const result  = `<p>${htmlString}</p>`
      return result; 
    }
    const sentenceCompletionContainer = groupDiv.querySelector(".sentence-completion-container");

    const listElem = document.createElement("ul");
    q.sentences.forEach((sentence)=>{
      const liElem = document.createElement("li");

      liElem.innerHTML  = renderTextWithInput(sentence);

      listElem.appendChild(liElem);
    })

    sentenceCompletionContainer.appendChild(listElem);


    const inputs = sentenceCompletionContainer.querySelectorAll("input");

    inputs.forEach((input, index)=>{
      input.setAttribute("placeholder", q.id[index]);
    })
  }

  if(q.type == "mcq-two-choice"){
    const mcqTwoChoiceContainer = groupDiv.querySelector(".mcq-container-two-choice");
    mcqTwoChoiceContainer.innerHTML += `<div class="question-box">
                                          <div class="number-boxes">
                                          <div class="num-box">${q.id[0]}</div>
                                          <div class="num-box">${q.id[1]}</div>
                                          </div>
                                          
                                          <div class="question-text">
                                          ${q.text}
                                          </div>
                                          </div>`
    q.options.forEach((opt, index) =>{
      mcqTwoChoiceContainer.innerHTML += `<div class="options">
                                            <label>${index + 1}&nbsp;&nbsp;<input type="checkbox" name="q${q.id[0]}" value="${index + 1}">   &nbsp;&nbsp;${opt}</label><br>
                                          </div>`
    })

  
  }


  /*
  if(q.type == "flowchart"){
    const flowChartContainer = groupDiv.querySelector(".flowchart-container");
    const answerBoxContainer = flowChartContainer.querySelector(".answer-box");
    answerBoxContainer.style.display = "none";
    if(!answerBoxAdded){
      q.options.forEach((opt, index)=>{
      answerBoxContainer.innerHTML += `<span><strong>${index + 1}.</strong> ${opt}</span>`
    })
    answerBoxAdded = true;
    }
    let functionValue = "lol";
    const questionBlock = document.createElement("div");
    questionBlock.classList.add("question-block");
    questionBlock.innerHTML += `<label for="q${index + 1}">${index + 1}. ${q.text}</label>
                                <select id="q${index + 1}" name="q${index + 1}">
                                <option value="">-- Select --</option>
                                
                                <option value="${functionValue}">${functionValue}</option>
                                </select>`
    const arrowDiv = document.createElement("div");
    arrowDiv.classList.add("arrow");
    arrowDiv.textContent = "↓";
    
                                 
    flowChartContainer.appendChild(questionBlock);
    
    
  }*/

  if(q.part == 4){
    function renderTextWithInput(text){
          const htmlString = text.replaceAll("[blank]", `<input spellcheck="false" type="text" class="blank-input">`)
          const result =  `<p>${htmlString}</p>`;
          return result;
        }
    const fullNoteCompletionContainer = groupDiv.querySelector(".full-note-completion-container");
    fullNoteCompletionContainer.innerHTML += `<h1 class="note-completion-title">${q.heading}</h1>`
    q.subheadings.forEach((subheading, index)=>{
      fullNoteCompletionContainer.innerHTML += `<p class="note-completion-subheading">${subheading}</p>`
      q.paragraphs[index].forEach((paragraph, index)=>{
        fullNoteCompletionContainer.innerHTML += renderTextWithInput(paragraph);
      })
    })
    const inputs = fullNoteCompletionContainer.querySelectorAll("input");
    inputs.forEach((input, index)=>{
      input.setAttribute("placeholder", q.id[index]);
      input.setAttribute("data-question-id", q.id[index]);
    })
  }

  if(q.type == "note-completion"){
    function renderTextWithInput(text){
      const htmlString = text.replaceAll("[blank]", `<input spellcheck="false" type="text" class="blank-input">`);
      const result  = `<p>${htmlString}</p>`
      return result;
      
    }
    const fullNoteCompletionContainer = groupDiv.querySelector(".full-note-completion-container");
    fullNoteCompletionContainer.innerHTML += `<h1 class="note-completion-title">${q.heading}</h1>`
    if(!q.subheadings){
      q.paragraphs[0].forEach((paragraph)=>{
        fullNoteCompletionContainer.innerHTML += renderTextWithInput(paragraph);
      })
    } else{
      q.subheadings.forEach((subheading, index)=>{
      fullNoteCompletionContainer.innerHTML += `<p class="note-completion-subheading">${subheading}</p>`
      q.paragraphs[index].forEach((paragraph, index)=>{

        fullNoteCompletionContainer.innerHTML += renderTextWithInput(paragraph);
      })
    })
    }
    
    const inputs = fullNoteCompletionContainer.querySelectorAll("input");

    inputs.forEach((input, index)=>{
        input.setAttribute("placeholder", q.id[index]);
        input.setAttribute("data-question-id", q.id[index]);
    })
  }



  //plus point to add this logic:
  // > i learned something new.
  //neg point to add this logic:
  // > it appears only once.
  if(q.type == "note"){
    function renderTextWithInput(text){
          const htmlString = text.replaceAll("[blank]", `<input spellcheck="false" type="text" class="blank-input">`)
          const result =  `<p>${htmlString}</p>`;
          return result;
        }
    const noteContainer = groupDiv.querySelector(".note-container");
    noteContainer.innerHTML += `<h1 class="note-completion-title">${q.title}</h1>`
    const tableContainer = document.createElement("table");
    tableContainer.classList.add("note-table");
    q["col-one"].forEach((col, index) =>{
      const trContainer = document.createElement("tr");
      const tdContainerforColOne = document.createElement("td");
      tdContainerforColOne.setAttribute("style", "white-space: pre");
      const tdContainerForColTwo = document.createElement("td");
      tdContainerForColTwo.setAttribute("style", "white-space: pre");

      let htmlString = ``
      if(col.length > 1){
        col.forEach((co) =>{
          tdContainerforColOne.textContent += `${co} \r\n\r\n`;
          htmlString = tdContainerforColOne.outerHTML; 
        })
      }else{
      htmlString += `<td>${col[0]}</td>`
      //console.log(col[0])
      }
      
      if(q["col-two"][index].length > 1){
        q["col-two"][index].forEach((c, idx) =>{
          tdContainerForColTwo.textContent += `${c} \r\n\r\n`;
          if(idx == q["col-two"][index].length - 1){
            htmlString += tdContainerForColTwo.outerHTML;
            //console.log("working!");
          }
          //console.log(htmlString)
          //console.log("lol");
        })
      } else{
        htmlString += `<td>${q["col-two"][index][0]}</td>`
        //console.log(q["col-two"][index][0])
        
      }
      
      trContainer.innerHTML += renderTextWithInput(htmlString);
      tableContainer.appendChild(trContainer);
    })
    noteContainer.appendChild(tableContainer);
    const inputs = noteContainer.querySelectorAll("input");
    inputs.forEach((input, index)=>{
      input.setAttribute("placeholder", q.id[index])
    })                         

  }
  if(q.type == "mcq-updated"){
    const mcqContainerDiv =  groupDiv.querySelector(".mcq-container-one-choice");
    q.questions.forEach((question, index)=>{
      const mcqContainer  = document.createElement("div");
      mcqContainer.classList.add("mcq");
      mcqContainer.innerHTML += `<p data-question-id="${q.id[index]}"><strong>${q.id[index]}.</strong> ${question}</p>`;
      q.options[index].forEach((option, idx)=>{
        mcqContainer.innerHTML += `
                  <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="${q.id[index]}" value="${idx+1}">&nbsp;&nbsp;${option}</label><br>`
      })
      mcqContainerDiv.appendChild(mcqContainer)
      //console.log(mcqContainerDiv.outerHTML);
      //console.log("working")
    })
    
  }
  if(q.type == "shortAnswer-updated"){
    const shortAnswerDiv = groupDiv.querySelector(".short-answer-container");
    q.questions.forEach((question, index) =>{
      shortAnswerDiv.innerHTML += `<div class="short-answer-item">
                                  <label>
                                  <strong>${q.id[index]}.</strong>
                                  ${question}
                                  <input spellcheck="false" type="text" name="${q.id[index]}" placeholder="${q.id[index]}">
                                  </label></div>`
    })
  }

  if(q.type == "mcq-two-choice-updated"){
    const mcqTwoChoiceContainer = groupDiv.querySelector(".mcq-container-two-choice");
    q.questions.forEach((question, index)=>{
      mcqTwoChoiceContainer.innerHTML += `<div class="question-box">
                                          <div class="number-boxes">
                                          <div class="num-box">${q.id[index][0]}</div>
                                          <div class="num-box">${q.id[index][1]}</div>
                                          </div>
                                          
                                          <div class="question-text">
                                          ${question[0]}
                                          </div>
                                          </div>`
      q.options[index].forEach((option, idx)=>{
        
        mcqTwoChoiceContainer.innerHTML += `<div class="options">
                                            <label>${idx + 1}&nbsp;&nbsp;<input type="checkbox" name="q${q.id[index][0]}" data-question-id="${q.id[index][0]} ${q.id[index][1]}" value="${idx + 1}">   &nbsp;&nbsp;${option}</label><br>
                                          </div>`
      })
      
    })

  }


  //feature matching
  if(q.type == "feature-matching"){
    const matchingContainer = groupDiv.querySelector(".matching-container");
    const allBoxes = document.createElement("div");
    allBoxes.classList.add("all-boxes");
    const matchingFeatures = document.createElement("div");
    matchingFeatures.classList.add("matching-features");
    const matchingOptions = document.createElement("div");
    matchingOptions.classList.add("matching-options");

    q.features.forEach((feature, index)=>{
      matchingFeatures.innerHTML += `<div class="qa-pair">
                                    <div data-question-id="${q.id[index]}" class="question-feature"><strong>${q.id[index]}.</strong>&nbsp;&nbsp;${feature}</div>
                                    <div id="${q.id[index]}" class="box dropzone" data-class="feature-matching" data-item="" data-initial="empty"></div>
                                    </div>`
    })
    allBoxes.appendChild(matchingFeatures);
    q.options.forEach((option)=>{
      matchingOptions.innerHTML += `<div class="box" data-class="feature-matching" data-item="near the entrance">${option}</div>`
    })
    allBoxes.appendChild(matchingOptions);

    matchingContainer.appendChild(allBoxes);
  }
  if(q.type == "table-completion"){
    function renderTextWithInput(text){
          const htmlString = text.replaceAll("[blank]", `<input spellcheck="false" type="text" class="blank-input" placeholder="${index}">`)
          const result =  `<p style="text-align:center">${htmlString}</p>`;
          return result;
        }
    const tableContainer = groupDiv.querySelector(".table-container");
    const table = document.createElement("table");

    q["table-structure"].forEach((count, index)=>{
      const tr = document.createElement("tr");
      for(let i = 0; i< count; i++){

        const td = document.createElement("td");
        if(count == findLowest(q["table-structure"])){
          td.colSpan = findHighest(q["table-structure"]);
        }
        td.innerHTML += renderTextWithInput(q.cells[index][i]);
        tr.appendChild(td);
      }
      table.appendChild(tr);
    })
    tableContainer.appendChild(table);

    const inputs = tableContainer.querySelectorAll("input");

    inputs.forEach((input, index)=>{
      input.setAttribute("placeholder", q.id[index])
      input.setAttribute("data-question-id", q.id[index]);
    })
  }



  //flowchart updated
  if(q.type=="flowchart"){
    const flowChartContainer = groupDiv.querySelector(".flowchart-container");
    const flowChartOptions = document.createElement("div");
    flowChartOptions.classList.add("flowchart-options");
    const flowChartQuestions = document.createElement("div");
    flowChartQuestions.classList.add("flowchart");
    
    q.options.forEach((option)=>{
      flowChartOptions.innerHTML += `<div class="box" draggable="true" data-class="flow-chart" data-item="${option}">${option}</div>`
    })
    flowChartContainer.appendChild(flowChartOptions);
    q.questions.forEach((question, index)=>{
      flowChartQuestions.innerHTML += `<div class="step">
                                        <div class="num-box"><strong>${q.id[index]}</strong></div>
                                        <div class="question">${question}</div>
                                        <div class="arrow">↓</div>
                                        <div id="${q.id[index]}" data-question-id="${q.id[index]}" class="box dropzone" data-class="flow-chart" data-item="" data-initial="empty"></div>
                                      </div>`
    })
    flowChartContainer.appendChild(flowChartQuestions);
  }


 if(q.type == "matching-information"){
  const matchingInformationContainer = groupDiv.querySelector(".matching-information-container");
  const selectElem = document.createElement("select");
  selectElem.setAttribute("name", `matching-information-${q.part}`);
  selectElem.setAttribute("class", `matching-information`);
  const optionElem = document.createElement("option");

  optionElem.setAttribute("value", "");
  selectElem.appendChild(optionElem);


  const matchingListContainer = document.createElement("div");
  matchingListContainer.classList.add("matching-list");
  const matchingList = document.createElement("ul");
  q.options.forEach((option, index)=>{
    matchingList.innerHTML += `<li><strong>${q.paragraphs[index]}.</strong>&nbsp;&nbsp;${option}</li>`
  })
  matchingListContainer.appendChild(matchingList);
  matchingInformationContainer.appendChild(matchingListContainer);

  q.paragraphs.forEach((paragraph)=>{
    const optionELEMENT = document.createElement("option");
    optionELEMENT.setAttribute("value", paragraph);
    optionELEMENT.textContent = paragraph;
    selectElem.appendChild(optionELEMENT);
  })

  q.information.forEach((info, index) =>{

    selectElem.setAttribute("id", q.id[index]);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("matching-info-question");
    infoDiv.setAttribute("data-question-id", q.id[index]);

    const infoPara = document.createElement("p");
    infoPara.innerHTML = `<strong>${q.id[index]}.</strong>&nbsp;&nbsp;${info}`;

    infoDiv.appendChild(infoPara);
    infoDiv.innerHTML += selectElem.outerHTML;

    matchingInformationContainer.appendChild(infoDiv);
  })


 }

 if(q.type === "diagram-labelling"){
    const diagramContainer = groupDiv.querySelector(".diagram-label-container");
    const allBoxes = document.createElement("div");
    allBoxes.classList.add("all-boxes");

    const imagingContainer = document.createElement("div");
    imagingContainer.classList.add("image-div");
    imagingContainer.innerHTML = `<img src="${q.image}">`
    diagramContainer.appendChild(imagingContainer);

    const matchingLabels = document.createElement("div");
    matchingLabels.classList.add("matching-labels");

    const matchingOptions = document.createElement("div");
    matchingOptions.classList.add("matching-options-for-diagram");

    q.labels.forEach((label, index)=>{
      matchingLabels.innerHTML += `<div class="qa-pair">
                                  <div data-question-id="${q.id[index]}" class="question-label"><strong>${q.id[index]}.</strong>&nbsp;&nbsp;${label}</div>
                                  <div id="${q.id[index]}" class="dropzone diagram-box" data-class="diagram" data-item="" data-initial="empty"></div>
                                  </div>`
    })
    allBoxes.appendChild(matchingLabels);

    q.options.forEach((option)=>{
      matchingOptions.innerHTML += `<div class="diagram-box" data-class="diagram" data-item="${option}">${option}</div>`
    })
    allBoxes.appendChild(matchingOptions);
    diagramContainer.appendChild(allBoxes);
  }
})



//group header logic
let questionRangeStarter = 1;
let last = 0;
let index = 0;
groupCounts.forEach((value, group)=>{
    const groupDiv = document.querySelector(`.group-${group}`);
    //trying instruction logic
    const groupHeader = document.createElement("div");
    groupHeader.classList.add("group-header");
    const instructionDiv = document.createElement("div");
    instructionDiv.classList.add("instructions");
    instructionDiv.innerHTML = `<h3>${instructions[index].instruction}</h3>`
    groupHeader.prepend(instructionDiv);
   // console.log(instructions[index].instruction);
    
    const min = findLowest(questions[index].id)
    const max = findHighest(questions[index].id)
    console.log(min)
    console.log(max)

    last += value;
    
    const groupRangeHeader = document.createElement("h3");
    groupRangeHeader.textContent = `Questions ${min} - ${max}`;
    groupHeader.prepend(groupRangeHeader); 
    questionRangeStarter += value;


  console.log(index)
  index += 1;  
  groupDiv.prepend(groupHeader);

})



//console.log("this one!")
console.log(groupCounts);





//part checkbox logic

const inputsPart1 = part1.querySelectorAll("input");

//console.log(inputsPart1.length)



//limit to two choice logic
//working somehow
//final
document.addEventListener("DOMContentLoaded", ()=>{
  questions.forEach((q, index)=>{
    
    if(q.type == "mcq-two-choice-updated"){
      q.questions.forEach((question, index)=>{
        const checkBoxes = document.querySelectorAll(`input[type="checkbox"][name="q${q.id[index][0]}"]`);
        //console.log(index)

        //console.log(Array.from(checkBoxes));
        checkBoxes.forEach(checkBox =>{
        
        checkBox.addEventListener("change", ()=>{
        const checked = Array.from(checkBoxes).filter(cb=> cb.checked);
        checked.forEach((check, idx)=>{
          check.setAttribute("name", q.id[index][idx])
        })
        if(checked.length > 2) {
          checkBox.checked = false;
        }
      })
    })
      })
      
      

      
    }
  })

  

})



function findLowest(arr) {
  const flat =  arr.flat()
  return Math.min(...flat);
}

function findHighest(arr) {
  const flat = arr.flat()
  return Math.max(...flat);
}






//learning drag and drop

var dragElement = null;
var items;

function handleDragStart(e){
  this.style.opacity = "0.4";
  dragElement = this;

  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("item", this.innerHTML)
}

function handleDragOver(e){
  if(e.preventDefault){
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = "move";
  return false;
}

function handleDragEnter(e){
  this.classList.add("dragover");
}

function handleDragLeave(e){
  this.classList.remove("dragover");
}

function handleDrop(e){
  if (e.stopPropagation) e.stopPropagation();

  if (dragElement !== this) {
    const draggedGroup = dragElement.getAttribute("data-class");
    const targetGroup = this.getAttribute("data-class");

    if(draggedGroup !== targetGroup){
      this.classList.add("invalid-drop");
      setTimeout(() => this.classList.remove("invalid-drop"), 1000);
      return false;
    } else{
    const draggedHTML = dragElement.innerHTML;
    const draggedItem = dragElement.getAttribute("data-item");

    const targetHTML = this.innerHTML;
    const targetItem = this.getAttribute("data-item");

      // Swap
    dragElement.innerHTML = targetHTML;
    dragElement.setAttribute("data-item", targetItem || "");

    this.innerHTML = draggedHTML;
    this.setAttribute("data-item", draggedItem || "");

    // Reapply
    addDragEvents(dragElement);
    addDragEvents(this);
    }
  }
}

function handleDragEnd(e){
  this.style.opacity = "1";
  items.forEach((item)=>{
    item.classList.remove("dragover");
  })
}

function addDragEvents(element) {
  const hasContent = element.textContent.trim() !== "";

  element.setAttribute("draggable", hasContent);

  //attach
  element.addEventListener("dragenter", handleDragEnter);
  element.addEventListener("dragover", handleDragOver);
  element.addEventListener("dragleave", handleDragLeave);
  element.addEventListener("drop", handleDrop);
  element.addEventListener("dragend", handleDragEnd);

  // Only attach dragstart if content is not empty
  if (hasContent) {
    element.addEventListener("dragstart", handleDragStart);
  }
}

document.addEventListener("DOMContentLoaded", (event)=>{
  items = document.querySelectorAll(".box");
  itemsForDiagram = document.querySelectorAll(".diagram-box")
  itemsForDiagram.forEach((item)=>{
    addDragEvents(item)
  })
  items.forEach((item)=>{
    addDragEvents(item)
  })
})


/*
document.getElementById("submitBtn").addEventListener("click", () => {
  const emptyInitially = document.querySelectorAll('[data-initial="empty"]');
  const answers = [];

  emptyInitially.forEach(box => {
    const text = box.textContent.trim();
    answers.push(text);
  });

  console.log("User answers:", answers); // or send to backend, etc.
});*/



//font-change setting

const testContent = document.getElementById("test-content");
const fontSizeSelector = document.getElementById("font-size-selector")


fontSizeSelector.addEventListener("change", function (){

  const selectedValue = this.value;
  testContent.style.fontSize = selectedValue;
  //console.log("Selected value:", selectedValue);
  

})



//scrolling while dragging
document.addEventListener("dragover", function (e) {
  const scrollMargin = 80; 
  const scrollSpeed = 500;  

  const y = e.clientY;
  const windowHeight = window.innerHeight;

  if (y < scrollMargin) {
    
    window.scrollBy(0, -scrollSpeed);
  } else if (y > windowHeight - scrollMargin) {
    
    window.scrollBy(0, scrollSpeed);
  }
});












const answerArrayUpdated = {}
function inputCheckUpdated(){
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input)=>{
    if(input.type == "text"){
      const id = input.placeholder;
      const answer = input.value.trim()
      answerArrayUpdated[id] = [answer];
    }
    if(input.checked){
      const id = input.name;
      const answer =  input.value.trim();
      answerArrayUpdated[id] = [answer];
    }
  })
  const selectInputs = document.querySelectorAll('.matching-information');
  selectInputs.forEach((selectedInput, index)=>{
    const id = selectedInput.id;
    answerArrayUpdated[id] = [selectedInput.value];
    
  })
  const emptyInitially = document.querySelectorAll('[data-initial="empty"]');
  emptyInitially.forEach((empty)=>{
    const id = empty.id;
    answerArrayUpdated[id] = [empty.textContent];
  })

  console.log(answerArrayUpdated);
}



//setTimeout(inputCheckUpdated, 2 * 60 * 1000);





const mistakes = {};
function findDifferences(your_answer, realAnswers) {
  var totalScore = 40;

  for (const key in realAnswers) {
    const yourAns = your_answer[key] || [];
    const realAns = realAnswers[key];

    // Check if any of the real answers match the user's answer
    const matchFound = yourAns.some(ans => realAns.includes(ans.toLowerCase()));

    if (!matchFound) {
      mistakes[key] = {
        "Your answer": yourAns,
        "Correct answer": realAns
      };
      totalScore--;
    }
  }

  console.log(mistakes);
  return [totalScore, mistakes]
}


/*setTimeout(function () {
  findDifferences(answerArrayUpdated, officialAnswers);
}, 2 * 60 * 1000); */


//highlight button logic

const button = document.getElementById('highlight-btn');

    document.addEventListener('mouseup', () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Show button near selection
        button.style.top =  `${window.scrollY + rect.top + 20}px`;
        button.style.left = `${window.scrollX + rect.right - 35}px`;
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
    });

    button.addEventListener('click', () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
        //const range = selection.getRangeAt(0);
        //console.log(range.toString());
        //const span = document.createElement('span');
        //span.classList.add('highlighted');
        //range.surroundContents(span);
        //highlightRangeTest(range);
        highlightSelection();
        selection.removeAllRanges();
        button.style.display = 'none';
      }
    });


function highlightSelection() {
  var userSelection = window.getSelection().getRangeAt(0);
  var safeRanges = getSafeRanges(userSelection);
  for (var i = 0; i < safeRanges.length; i++) {
    highlightRange(safeRanges[i]);
  }
}

function highlightRange(range) {
  var newNode = document.createElement("div");
  newNode.setAttribute(
    "class",
    "highlight-wrapper"
  );
  range.surroundContents(newNode);
}

(function () {
  const popup = document.getElementById('unhighlightPopup');
  let currentHighlight = null;

  // Interactive elements that should be allowed to receive clicks/focus
  const interactiveSelector = 'input, textarea, select, button, a, label, [contenteditable="true"]';

  function showPopupFor(wrapper, clickEvent) {
    currentHighlight = wrapper;
    const rect = wrapper.getBoundingClientRect();

    // position a little below the wrapper
    popup.style.top = `${rect.bottom + window.scrollY + 6}px`;
    // ensure popup doesn't run off-screen left
    const left = Math.max(rect.left + window.scrollX, 6);
    popup.style.left = `${left}px`;
    popup.style.display = 'block';

    // focus so keyboard users can press Enter
    popup.focus();
  }

  function hidePopup() {
    popup.style.display = 'none';
    currentHighlight = null;
  }

  function unwrapHighlight(wrapper) {
    if (!wrapper) return;
    // Move all child nodes into a fragment to preserve elements exactly
    const frag = document.createDocumentFragment();
    while (wrapper.firstChild) {
      frag.appendChild(wrapper.firstChild);
    }
    // Replace the wrapper with its children (preserves structure)
    wrapper.replaceWith(frag);

    // clean up references
    hidePopup();
  }

  // click handler for the whole document
  document.addEventListener('click', function (e) {
    const target = e.target;

    // if popup clicked → unhighlight the stored wrapper
    if (target === popup || popup.contains(target)) {
      if (currentHighlight) {
        unwrapHighlight(currentHighlight);
      } else {
        hidePopup();
      }
      e.stopPropagation();
      return;
    }

    // Did we click inside a highlight wrapper (or its descendants)?
    const wrapper = target.closest && target.closest('.highlight-wrapper');

    if (wrapper) {
      // If the click target is an interactive element, allow normal interaction (don't show popup)
      if (target.matches(interactiveSelector)) {
        // don't show popup; let the input/select get focus
        hidePopup();
        return;
      }

      // Otherwise show popup for the nearest wrapper clicked
      showPopupFor(wrapper, e);
      e.stopPropagation();
      return;
    }

    // Click outside → hide popup
    hidePopup();
  }, true); // use capture to reduce chance popup immediately hides

  // keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      hidePopup();
      return;
    }
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === popup) {
      // Enter or Space on the popup triggers unhighlight
      if (currentHighlight) unwrapHighlight(currentHighlight);
      e.preventDefault();
      return;
    }
  });

  // Reposition popup when scrolling / resizing so it stays near the wrapper
  function repositionPopup() {
    if (!currentHighlight || popup.style.display === 'none') return;
    const rect = currentHighlight.getBoundingClientRect();
    popup.style.top = `${rect.bottom + window.scrollY + 6}px`;
    popup.style.left = `${Math.max(rect.left + window.scrollX, 6)}px`;
  }
  window.addEventListener('scroll', repositionPopup, { passive: true });
  window.addEventListener('resize', repositionPopup);

})();

function getSafeRanges(dangerous) {
  var a = dangerous.commonAncestorContainer;
  // Starts -- Work inward from the start, selecting the largest safe range
  var s = new Array(0), rs = new Array(0);
  if (dangerous.startContainer != a) {
    for (var i = dangerous.startContainer; i != a; i = i.parentNode) {
      s.push(i);
    }
  }
  if (s.length > 0) {
    for (var i = 0; i < s.length; i++) {
      var xs = document.createRange();
      if (i) {
        xs.setStartAfter(s[i - 1]);
        xs.setEndAfter(s[i].lastChild);
      } else {
        xs.setStart(s[i], dangerous.startOffset);
        xs.setEndAfter((s[i].nodeType == Node.TEXT_NODE) ? s[i] : s[i].lastChild);
      }
      rs.push(xs);
    }
  }

  // Ends -- basically the same code reversed
  var e = new Array(0), re = new Array(0);
  if (dangerous.endContainer != a) {
    for (var i = dangerous.endContainer; i != a; i = i.parentNode) {
      e.push(i);
    }
  }
  if (e.length > 0) {
    for (var i = 0; i < e.length; i++) {
      var xe = document.createRange();
      if (i) {
        xe.setStartBefore(e[i].firstChild);
        xe.setEndBefore(e[i - 1]);
      } else {
        xe.setStartBefore((e[i].nodeType == Node.TEXT_NODE) ? e[i] : e[i].firstChild);
        xe.setEnd(e[i], dangerous.endOffset);
      }
      re.unshift(xe);
    }
  }

  // Middle -- the uncaptured middle
  if ((s.length > 0) && (e.length > 0)) {
    var xm = document.createRange();
    xm.setStartAfter(s[s.length - 1]);
    xm.setEndBefore(e[e.length - 1]);
  } else {
    return [dangerous];
  }

  // Concat
  rs.push(xm);
  response = rs.concat(re);

  // Send to Console
  return response;
}

/* ------------------ PART NAV: small question buttons & answered-state tracking ------------------ */

/*
  Creates small q-buttons for each part (beside Part label) and wires:
   - click -> scroll to question element with data-question-id
   - auto highlight when question becomes answered (text/radio/select/drop)
*/

// Utility: find question elements by numeric id. Questions in your render use data-question-id attributes.
function getQuestionElementById(qid) {
  // first try attribute selectors
  return document.querySelector(`[data-question-id="${qid}"], [id="${qid}"]`);
}

// Check whether a given question id currently has an answer (text / radio / select / dropzones)
function isQuestionAnswered(qid) {
  // 1) text inputs: inputs with data-question-id or placeholder matching qid
  const textInput = document.querySelector(`input[type="text"][data-question-id="${qid}"], input[type="text"][placeholder="${qid}"]`);
  if (textInput && textInput.value.trim() !== "") return true;

  // 2) radio / checkbox: inputs with name === qid
  const inputsByName = document.querySelectorAll(`input[name="${qid}"]`);
  if (inputsByName && inputsByName.length > 0) {
    for (const el of inputsByName) {
      if (el.type === 'radio' || el.type === 'checkbox') {
        if (el.checked) return true;
      }
    }
  }

  // 3) select (matching-information sets the select id to the q.id earlier)
  const select = document.getElementById(qid);
  if (select && select.value && select.value.trim() !== "") return true;

  // 4) dropzones / boxes (you used id on dropzone divs for many types)
  const dropzone = document.getElementById(String(qid));
  if (dropzone) {
    const text = dropzone.textContent.trim();
    // If it has visible content, consider it answered. Also check dataset.item if used.
    if (text !== "" && text.toLowerCase() !== "empty") return true;
    if (dropzone.dataset && dropzone.dataset.item && dropzone.dataset.item !== "") return true;
  }

  // 5) fallback: any input *inside* an element that carries the question id as parent (p tag with data-question-id etc)
  const questionParent = document.querySelector(`[data-question-id="${qid}"]`);
  if (questionParent) {
    const innerInputs = questionParent.querySelectorAll("input, select, textarea");
    for (const el of innerInputs) {
      if (el.type === "text" && el.value.trim() !== "") return true;
      if ((el.type === "radio" || el.type === "checkbox") && el.checked) return true;
      if (el.tagName.toLowerCase() === "select" && el.value && el.value.trim() !== "") return true;
    }
  }

  return false;
}

// Toggle state of qnav button for single question id
function updateQNavState(qid) {
  const btn = document.querySelector(`.qnav-btn[data-qid="${qid}"]`);
  if (!btn) return;
  if (isQuestionAnswered(qid)) {
    btn.classList.add("attempted");
  } else {
    btn.classList.remove("attempted");
  }
}

// Build part -> question small buttons once DOM is ready
// Build part -> question small buttons once DOM is ready
function createPartQuestionNavButtons() {
  for (let part = 1; part <= 4; part++) {
    const partEl = document.getElementById(`part-${part}`);
    if (!partEl) continue;

    // collect question ids inside this part
    const qEls = partEl.querySelectorAll("[data-question-id], [id]");
    const qIds = [];

    qEls.forEach(el => {
  const attr = el.getAttribute("data-question-id");
  if (!attr) return;

  // split by space to handle multiple ids
  const ids = attr.split(" ")
    .map(s => s.match(/\d+/)?.[0])
    .filter(Boolean);

  ids.forEach(idNum => {
    if (!qIds.includes(idNum)) qIds.push(idNum);
  });
});

    // Sort ids numerically
    qIds.sort((a, b) => Number(a) - Number(b));

    console.log(qIds);

    // find the bottom navbar's question-button-container for this part
    const container = document.querySelector(`.question-button-container[data-part="${part}"]`);
    if (!container) continue;

    // clear existing
    container.innerHTML = "";

    // create buttons
    qIds.forEach(qid => {
      const b = document.createElement("button");
      b.className = "qnav-btn";
      b.type = "button";
      b.setAttribute("data-qid", qid);
      b.textContent = qid;

      // click -> scroll to the question element
      b.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const targetEl = getQuestionElementById(qid);
        if (targetEl) {
          const parentPartMatch = targetEl.closest(".part");
          if (parentPartMatch) {
            const idAttr = parentPartMatch.id || "";
            const whichPart = idAttr.match(/\d+/);
            if (whichPart) showPart(Number(whichPart[0]));
          }
          targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
          // mark visual current
          document.querySelectorAll('.qnav-btn.current').forEach(x => x.classList.remove('current'));
          b.classList.add('current');
        }
      });

      container.appendChild(b);

      // initial state: set attempted if needed
      //setTimeout(() => updateQNavState(qid), 10);
    });
  }
}

// Add listeners for inputs (text, radio, selects) so qnav state updates live
function attachAnswerListeners() {
  // text inputs
  document.querySelectorAll('input[type="text"]').forEach(inp=>{
    // trigger on input
    inp.addEventListener('input', () => {
      const qid = inp.getAttribute('data-question-id') || inp.getAttribute('placeholder') || extractNumeric(inp);
      if (qid) updateQNavState(String(qid));
    });
  });

  // radio / checkbox groups -> on change
  document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(inp=>{
    inp.addEventListener('change', () => {
      const name = inp.name;
      if (name) {
        // if name contains digits, extract the first number
        const found = String(name).match(/\d+/);
        if (found) updateQNavState(found[0]);
        else updateQNavState(name);
      }
    });
  });

  // selects (matching-information)
  
  document.querySelectorAll('select').forEach(sel => {
    const triggerUpdate = () => {
      const id = sel.id || (sel.getAttribute && sel.getAttribute('name'));
      
      // VALIDATION:
      // 1. Must have an ID/Name
      // 2. index must be > 0 (this ignores the first "Select..." option)
      // 3. value must not be empty or "0"
      const hasRealValue = sel.selectedIndex > 0 && sel.value !== "" && sel.value !== "0";

      if (id && hasRealValue) {
        updateQNavState(String(id));
      }
    };

    // Run on load: now it strictly ignores the first option
    triggerUpdate();

    // Listen for future changes
    sel.addEventListener('change', triggerUpdate);
  });
}

// helper: try extract numeric id from element attributes
function extractNumeric(el) {
  if (!el) return null;
  const attrs = ['data-question-id','id','name','placeholder'];
  for (const a of attrs) {
    const v = el.getAttribute && el.getAttribute(a);
    if (!v) continue;
    const found = String(v).match(/\d+/);
    if (found) return found[0];
  }
  return null;
}

/* --- IMPORTANT: replace or augment your existing handleDrop to call updateQNavState on affected qids.
   If you already have a handleDrop function, replace it with the following version below.
*/

function handleDrop(e){
  if (e.stopPropagation) e.stopPropagation();

  if (dragElement !== this) {
    const draggedGroup = dragElement.getAttribute("data-class");
    const targetGroup = this.getAttribute("data-class");

    if(draggedGroup !== targetGroup){
      this.classList.add("invalid-drop");
      setTimeout(() => this.classList.remove("invalid-drop"), 1000);
      return false;
    } else{
      const draggedHTML = dragElement.innerHTML;
      const draggedItem = dragElement.getAttribute("data-item");

      const targetHTML = this.innerHTML;
      const targetItem = this.getAttribute("data-item");

      // Swap
      dragElement.innerHTML = targetHTML;
      dragElement.setAttribute("data-item", targetItem || "");

      this.innerHTML = draggedHTML;
      this.setAttribute("data-item", draggedItem || "");

      // Reapply events
      addDragEvents(dragElement);
      addDragEvents(this);

      // Update data-initial attr (if you use it)
      if (dragElement.dataset) dragElement.dataset.initial = dragElement.dataset.initial || "filled";
      if (this.dataset) this.dataset.initial = this.dataset.initial || "filled";

      // After swap, try to detect if these two elements correspond to questions (they often have id attributes equal to question ids)
      // If elements have an id that is numeric, update their qnav states.
      const idsToUpdate = new Set();
      const aId = dragElement.getAttribute('id');
      const bId = this.getAttribute('id');
      if (aId) { const f = aId.match(/\d+/); if (f) idsToUpdate.add(f[0]); }
      if (bId) { const f = bId.match(/\d+/); if (f) idsToUpdate.add(f[0]); }

      // Also check parent question containers for data-question-id
      [dragElement, this].forEach(el => {
        const qparent = el.closest('[data-question-id]');
        if (qparent) {
          const qid = qparent.getAttribute('data-question-id') || (qparent.getAttribute('id') && qparent.getAttribute('id').match(/\d+/) && qparent.getAttribute('id').match(/\d+/)[0]);
          if (qid) idsToUpdate.add(qid);
        }
      });

      // call update for all discovered ids
      idsToUpdate.forEach(id => updateQNavState(id));
    }
  }
}

/* --- Setup: run on DOMContentLoaded so that dynamic questions are already rendered --- */
document.addEventListener("DOMContentLoaded", () => {
  // create the small buttons inside each Part nav
  createPartQuestionNavButtons();

  // attach listeners for text, radio, select changes
  attachAnswerListeners();

  // also attach a MutationObserver for dropzones or areas that may change content dynamically
  const observer = new MutationObserver(muts => {
    muts.forEach(m => {
      // when nodes change, try to update states for any question ids found in mutated subtree
      const el = m.target;
      const ids = Array.from(el.querySelectorAll('[data-question-id], [id]')).map(x => {
        const idv = x.getAttribute('data-question-id') || x.getAttribute('id');
        const f = idv && String(idv).match(/\d+/);
        return f ? f[0] : null;
      }).filter(Boolean);
      ids.forEach(id => updateQNavState(id));
    });
  });

  // observe the whole test-content region (dropzones, inputs etc.)
  const observeRoot = document.getElementById('test-content') || document.body;
  observer.observe(observeRoot, { childList: true, subtree: true, characterData: true });

  // initial scan for all qnav states (in case some inputs are prefilled)
  /*
  document.querySelectorAll('.qnav-btn').forEach(b => {
    const qid = b.getAttribute('data-qid');
    updateQNavState(qid);
  });
  */
});

/* Expose updateQNavState if you want to call it manually elsewhere */
window.updateQNavState = updateQNavState;

//highlight button


function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


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
