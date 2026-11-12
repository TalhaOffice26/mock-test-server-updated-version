const part1 = document.getElementById("part-1");
const part1Margin = document.getElementById("part-margin-1");


window.addEventListener("keydown",function (e) {
    if (e.key === "F3" || (e.ctrlKey && e.key === "f") || (e.ctrlKey && e.key === "F")) { 
        e.preventDefault();
    }
    
})
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

//dynamic questions logic
const questionContainer = document.getElementById("test-content");





 



    //timer logic (timer blunt)







/*
const questionData = localStorage.getItem("data")
const parsedQuestionData = JSON.parse(questionData);
console.log(parsedQuestionData.listening.questions);
*/

//dataset prototype

const dataRetriever = async function(){
  try{
    const res = await fetch("/api/pracDataListening");
    const data = await res.json();

    return data;
  }catch(err){
    alert(err);
  }
}

let data;
let questionType;
let questions;
let instructions;
let answers;


async function main(){
  data = await dataRetriever();
  console.log(data.type)

  questionType = data.type;

const partHeaderP = document.getElementById("part-header-p");

partHeaderP.textContent = questionType;

questions = data.listening.questions;
instructions = data.listening.instructions;
answers = data.listening.answers;




async function getAudioSrc(){
  const res = await fetch(`/practice-audio?pracNumber=${data.pracNumber}&type=${questionType}`)

  const src = await res.json();
  return src.src;
}

const audioSrc = await getAudioSrc();

const audioElement = document.getElementById("listening-practice-audio");

audioElement.setAttribute("src", audioSrc);



const answerExplanations = data.listening.answerExplanations
    
//dataset prototype
//question types

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


})





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
  if(q.type === "mcq-one-choice"){
    const mcqContainerDiv = groupDiv.querySelector(".mcq-container-one-choice");
    q.questions.forEach((question, index)=>{
      const mcqContainer = document.createElement("div");
      mcqContainer.classList.add("mcq");

      mcqContainer.innerHTML += `<p><strong>${q.id[index]}.</strong> ${question}</p>`
      q.options[index].forEach((option, idx)=>{
        mcqContainer.innerHTML += `
        <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="${q.id[index]}" data-question-id="${q.id[index]}" value="${idx+1}">&nbsp;&nbsp;${option}</label><br>`
      })
      mcqContainerDiv.appendChild(mcqContainer);
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
      matchingOptions.innerHTML += `<div class="box" data-class="feature-matching" data-item="${option}">${option}</div>`
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


function showScore(score, total){
  const scoreDiv = document.getElementById("user-score");
  const totalDiv = document.getElementById("total-questions");

  scoreDiv.textContent = score;
  totalDiv.textContent = total;

  const scoreContainer = document.getElementById("score-container");
  scoreContainer.style.display = "block";
}


function renderCorrectAnswers() {
    const createExplanationIcon = (qid) => {
        const idKey = String(qid);
        if (answerExplanations[idKey]) {
            const icon = document.createElement('span');
            icon.className = 'explanation-icon';
            icon.innerHTML = 'i'; 
            
            const tooltip = document.createElement('span');
            tooltip.className = 'explanation-tooltip';
            tooltip.innerHTML = `<strong>Explanation:</strong><br>${answerExplanations[idKey][0]}`;
            
            icon.appendChild(tooltip);
            return icon;
        }
        return null;
    };

    let score = 0;
    const totalQuestions = Object.keys(answers).length;

    // Helper to prevent duplicate icons
    const addIconOnce = (container, qid) => {
        if (!container.querySelector(`.icon-id-${qid}`)) {
            const icon = createExplanationIcon(qid);
            if (icon) {
                icon.classList.add(`icon-id-${qid}`);
                container.appendChild(icon);
            }
        }
    };

    // 1. Text Inputs & Blanks
    document.querySelectorAll('input.blank-input').forEach(input => {
        const qid = String(input.getAttribute('placeholder') || input.getAttribute('data-question-id'));
        if (!answers[qid]) return;

        const userVal = input.value.trim().toLowerCase();
        const correctList = answers[qid].map(v => String(v).toLowerCase());
        const isCorrect = correctList.includes(userVal);

        if (isCorrect) score++;
        else if (userVal !== "") input.classList.add('wrong-answer-input');

        // Check if review label already exists to prevent double icons/labels
        if (!input.nextElementSibling?.classList.contains('inline-review-wrapper')) {
            const reviewWrapper = document.createElement('span');
            reviewWrapper.className = 'inline-review-wrapper';
            reviewWrapper.innerHTML = `<span class="review-label">[Ans: ${answers[qid][0]}]</span>`;
            addIconOnce(reviewWrapper, qid);
            input.after(reviewWrapper);
        }
        input.disabled = true;
    });

    // 2. Radios and Checkboxes
    Object.keys(answers).forEach(qid => {
        const idKey = String(qid);
        const correctChoices = answers[idKey].map(v => String(v).toLowerCase());
        
        // Use a more specific selector to avoid catching text inputs
        const inputs = document.querySelectorAll(`input[type="radio"][data-question-id~="${idKey}"], input[type="checkbox"][data-question-id~="${idKey}"]`);
        
        let pointAwarded = false;

        inputs.forEach(input => {
            const val = input.value.toLowerCase();
            const isCorrect = correctChoices.includes(val);
            const isChecked = input.checked;

            if (isChecked && isCorrect && !pointAwarded) {
                score++;
                pointAwarded = true;
            }

            // FIX: Identify the specific container (label or table cell)
            const container = input.closest('label') || input.closest('td');

            if (isCorrect) {
                // To stop the "Whole Sentence" highlight, target a specific span if it exists
                // or just highlight the area immediately around the radio
                container.classList.add('correct-answer-highlight');
                addIconOnce(container, idKey);
            } else if (isChecked && !isCorrect) {
                container.classList.add('wrong-answer-highlight');
            }
            input.disabled = true;
        });
    });

    // 3. Drag & Drop (List of Headings)
    document.querySelectorAll('.dropzone').forEach(zone => {
        const qid = String(zone.getAttribute('data-question-id') || zone.id);
        const userItem = (zone.getAttribute('data-item') || "").toLowerCase();
        console.log(userItem);
        const correctList = answers[qid] ? answers[qid].map(v => String(v).toLowerCase()) : [];
        const isCorrect = correctList.includes(userItem);
        console.log(correctList, isCorrect)
        if(isCorrect) score++;

        if (userItem !== "" && userItem !== "empty" && !isCorrect) {
            zone.classList.add('wrong-answer-dropzone');
        }

        if (answers[qid]) {
            const correctOverlay = document.createElement('div');
            correctOverlay.className = 'review-dropzone-label';
            correctOverlay.innerHTML = `Correct: ${answers[qid][0]}`;
            const icon = createExplanationIcon(qid);
            if (icon) correctOverlay.appendChild(icon);
            zone.appendChild(correctOverlay);
            zone.classList.add('reviewed-zone');
        }
        zone.setAttribute("draggable", "false");
    });


    // --- NEW: Replace Finish with Retry ---
    const finishBtn = document.getElementById('finishBtn'); // Replace with your actual button ID
    if (finishBtn) {
        // Create the Retry button
        const retryBtn = document.createElement('button');
        retryBtn.innerHTML = 'Retry';
        retryBtn.className = 'btn btn-outline-dark btn-sm'; // Use a new class for styling
        
        // Function to reload the page
        retryBtn.onclick = () => {
            window.location.reload();
        };

        // Replace the finish button with the retry button
        finishBtn.parentNode.replaceChild(retryBtn, finishBtn);
    }


    showScore(score, totalQuestions);
}



const submitBtn = document.getElementById("finishBtn");
const submitModal = document.getElementById("submit-warning-modal");
submitBtn.addEventListener("click", async function(e){
  e.preventDefault();
  submitModal.style.display = "flex";
})

 const submitOkButton = document.getElementById("submit-ok-btn");
 const submitStayButton = document.getElementById("submit-stay-btn");


submitStayButton.addEventListener("click", async(e)=>{
  e.preventDefault();
  submitModal.style.display = "none";
 })


 submitOkButton.addEventListener("click", async (e) => {
    e.preventDefault();
    submitModal.style.display = "none";
    
    
   // Precise timer
    
    // Run the grading and render correct answers
    renderCorrectAnswers();
    
    // Scroll to top so they can start reviewing from Part 1
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log("Test submitted and review mode activated.");
});



}

const backBtn = document.getElementById("backBtn");

if (backBtn) {
    backBtn.addEventListener("click", () => {
        // Option A: Go back to previous history state
        window.history.back();
        
        // Option B: Redirect to a specific dashboard URL
        // window.location.href = "/mock-test"; 
    });
}







/*
const questions = [
    {
    "part": 1,
    "group": 11,
    "heading": "Local foodshops",
    "subheadings": ["Where to go", "Fist market", "Organic shop", "Supermarket"],
    "paragraphs": [ ["-- Kite place - near the [blank]"], 
                    ["-- cross the [blank] and turn right", "-- best to go before [blank] pm, earlier than closing time"], 
                    ["-- called [blank]", "-- below a restaurant in the large, grey building", "-- look for the large [blank] outside"], 
                    ["take a [blank] minibus, number 289"]],
    "id": [1, 2, 3, 4, 5, 6],
    "type": "note-completion",
    "answer": ["a", "b", "c", "d", "e", "f"]
    },
    {
    "part": 1,
    "group": 12,
    "type": "mcq-one-choice",
    "id": [7, 8, 9, 10],
    "questions": ["The museum building was originally", "The university uses part of the museum building as", "What does the guide say about the entrance fee?", "What are visitors advised to leave in the cloakroom?"],
    "options": [["a factory.", "a private home.", "a hall of residence."], 
                ["teaching rooms.", "a research library.", "administration offices."], 
                ["Visitors decide whether or not they wish to pay.", "Only children and students receive a discount.", "The museum charges extra for special exhibitions."], 
                ["cameras", "coats", "bags"], 
                ],
  },

  {
    "part": 1,
    "group": 13,
    "type": "feature-matching",
    "id": [11, 12, 13, 14, 15, 16],
    "options": ["Parents must supervise their children.", 
                "There are new things to see.", 
                "It is closed today.",
                "This is only for school groups.",
                "There is a quiz for visitors.",
                "It features something created by students.",
                "An expert is here today.",
                "There is a one-way system."],
    "features": ["Four Seasons", "Farmhouse Kitchen", "A Year on the Farm", "Wagon Walk", "Bees are Magic", "The Pond"],
},
{
    "part": 1,
    "group": 14,
    "type": "mcq-two-choice-updated",
    "id": [[17, 18]],
    "questions": [["Which TWO educational skills were shown in the video of children doing origami?"]],
    "options": [["solving problems", "following instructions", "working cooperatively", "learning through play", "developing hand-eye coordination"], 
                ]
  },

  {
        "part": 1,
        "group": 15,
        "type": "diagram-labelling",
        "image": "https://pub-35f6e385af654edaa1c5aded83150048.r2.dev/external-images/cambridge-ielts-20-academic-reading-test-3_17-20.png",
        "options": ["A", "B", "C", "D", "E", "F", "G"],
        "id": [19, 20, 21, 22],
        "labels": ["bridge foundations",
                   "rubbish pit",
                   "meeting hall",
                   "fish pond",
        ]
    },
]
const instructions = [
     {
    "group" : 11,
    "instruction" : "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.",
  },
  {
    "group" : 12,
    "instruction" : "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.",
  },
  {
    "group" : 13,
    "instruction" : "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.",
  },
  {
    "group" : 14,
    "instruction" : "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.",
  },
  {
    "group" : 15,
    "instruction" : "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.",
  },
]
const answers = {
    1: ["harbour", "harbor"],
    2: ["bridge"],
    3: ["3.30", "3:30", "three thirty", "half 3", "tree"],
    4: ["Rose", "rose"],
    5: ["sign"],
    6: ["purple"],
    7: ["1"],
    8: ["2"],
    9: ["3"],
    10: ["1"],
    11: ["It is closed today."],
    12: ["feature"],
    13: ["feature"],
    14: ["feature"],
    15: ["feature"],
    16: ["feature"],
    17: ["3"],
    18: ["2"],
    19: ["A"],
    20: ["B"],
    21: ["A"],
    22: ["B"],
    
    
}
*/


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


async function initializeApp() {
    // 2. Wait for your main content to load/render
    await main(); 

    // 3. NOW bind the drag events to the elements main() just created
    items = document.querySelectorAll(".box");
  itemsForDiagram = document.querySelectorAll(".diagram-box")
  itemsForDiagram.forEach((item)=>{
    addDragEvents(item)
  })
  items.forEach((item)=>{
    addDragEvents(item)
  })

    // 4. Initialize other features
    attachAnswerListeners();
    
    // Initial scan for qnav buttons
    document.querySelectorAll('.qnav-btn').forEach(b => {
        const qid = b.getAttribute('data-qid');
        updateQNavState(qid);
    });

    console.log("App fully initialized.");
}


document.addEventListener("DOMContentLoaded", initializeApp);

