//part vars













//fullscreen check





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



//popup to start writing


//part logic











//timer logic




//timer logic (timer specific)
 





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


//const questionData = localStorage.getItem("data");
//const parsedQuestions = JSON.parse(questionData);






const dataRetriever = async function(){
  try{
    const res = await fetch("/api/pracDataWriting");
    const data = await res.json();

    return data;
  }catch(err){
    alert(err);
  }
}

let data;
let questions;
let questionType;

async function main(){


    const submitBtn = document.getElementById("finishBtn");
const submitModal = document.getElementById("submit-warning-modal");
submitBtn.addEventListener("click", async function(e){
  e.preventDefault();
  submitModal.style.display = "flex";
})





 const submitOkButton = document.getElementById("submit-ok-btn");
 const submitStayButton = document.getElementById("submit-stay-btn");

 submitOkButton.addEventListener("click", async (e) => {
    e.preventDefault();

    // Generate the PDF for the user's records
    await generateWritingPDF();
    submitModal.style.display = "none";

});


 submitStayButton.addEventListener("click", async(e)=>{
  e.preventDefault();
  submitModal.style.display = "none";
 })


window.addEventListener("keydown",function (e) {
    if (e.key === "F3" || (e.ctrlKey && e.key === "f") || (e.ctrlKey && e.key === "F")) { 
        e.preventDefault();
    }
})
    data = await dataRetriever();
    console.log(data.type);
    questionType = data.type;
    questions = data.writing.questions;


    if(questionType == 1){
    const partHeader = document.getElementById("part-header-1");
    partHeader.innerHTML= `
    <h2>Part 1</h2>
       <p class="part-header-p">You should spend about 20 minutes on this task. Write at least <strong>150 WORDS.</strong></p>
    `
} else{
    const partHeader = document.getElementById("part-header-1");
    partHeader.innerHTML= `
    <h2>Part 2</h2>
       <p class="part-header-p">You should spend about 40 minutes on this task. Write at least <strong>250 WORDS.</strong></p>
    `
}

    
questions.forEach((q, index)=>{
    if(q.part == 1){
        const infoPanel = document.getElementById("info-panel-1");

        if(q.image){
            infoPanel.innerHTML += `
                            <p>${q.question}</p>
        `
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        q.image.forEach((img, idx)=>{
            imageContainer.innerHTML += `<img src="${img}">`
        })
        infoPanel.appendChild(imageContainer);
        }else{
            infoPanel.innerHTML += `
                            <p>${q.question}</p>
        `
        }
        
        
        
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


async function generateWritingPDF() {
    // Required libraries must be loaded in the HTML head
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const margin = 15;
    const pageWidth = 210 - (margin * 2);
    let currentY = 20;

    // 1. Header Styling
    doc.setFontSize(22);
    doc.setTextColor(75, 193, 197); // Matches your #4BC1C5 navbar
    doc.text("IELTS Writing Test Report", margin, currentY);
    currentY += 15;

    // 2. Process the Question Content (Including Images from your data)
    const infoPanel = document.getElementById('info-panel-1');
    
    try {
        // useCORS is essential to load the .webp image from your data array
        const infoCanvas = await html2canvas(infoPanel, { 
            scale: 2,
            useCORS: true, 
            logging: false 
        });
        
        const infoImgData = infoCanvas.toDataURL('image/png');
        const infoHeight = (infoCanvas.height * pageWidth) / infoCanvas.width;

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text("Writing Task Prompt:", margin, currentY);
        currentY += 7;

        // Draw the prompt and image
        doc.addImage(infoImgData, 'PNG', margin, currentY, pageWidth, infoHeight);
        currentY += infoHeight + 15;
    } catch (err) {
        console.error("Image rendering failed, proceeding with text only.", err);
        doc.text("Question prompt available in online record.", margin, currentY);
        currentY += 10;
    }

    // 3. Candidate's Response
    const studentAnswer = document.getElementById('writer-1').value;
    const wordCount = document.getElementById('wordCount-1').textContent;

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Candidate's Response:", margin, currentY);
    currentY += 10;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    // Wrap text to fit A4 width
    const splitText = doc.splitTextToSize(studentAnswer, pageWidth);
    
    // Check if response exceeds current page height
    if (currentY + (splitText.length * 5) > 280) {
        doc.addPage();
        currentY = 20;
    }
    
    doc.text(splitText, margin, currentY);

    // 4. Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    const finalY = currentY + (splitText.length * 6) + 10;
    doc.text(`--- ${wordCount} ---`, margin, finalY < 285 ? finalY : 285);

    // 5. Download
    doc.save("IELTS_Writing_Result.pdf");



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
}

}


document.addEventListener("DOMContentLoaded", async()=>{
  await main();
})







