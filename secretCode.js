const input = document.getElementById("input");
const form = document.getElementById("form");
const giveUp= document.getElementById("give-up");
const restart=document.getElementById("restart");
const finalAswer=document.getElementById("final-answer");
const results= document.getElementById("results");
const submit = document.getElementById("submit-button");

let secretCode= makeRandomCode();

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    checkAnswer();
    input.value="";
    // console.log(secretCode)
    window.scrollTo(0,document.body.scrollHeight);
})

function makeRandomCode(){
    let i=0;
    let code="";

    while(i<4){
        let randonNumber= Math.floor(Math.random() * 10);
        
        if(! code.includes(randonNumber)){
            code+=randonNumber.toString();
            i++;
        }
    }

    return code;
}

function checkAnswer(){
    let answer=(input.value).split('');
    let answerText="";

    answer.forEach((element,index)=>{
        if(secretCode.includes(element)){
            answerText+=(secretCode.indexOf(element) == index) ? "*" : "-";
        }
    })
    showAnswerText(input.value, answerText.split('').sort().join(""));
    if(answerText=="****"){
        winner();
    }
}

function showAnswerText(answer, answerText){
    results.innerHTML+=`<li class="list-group-item">${answer}: ${answerText}</li>`
}

function winner(){
    giveUp.disabled=true;
    submit.disabled=true;
    finalAswer.innerHTML="<p class='text-center fs-5'>Felicidades!!<br>Encontraste el código!!</p>";
}

giveUp.addEventListener('click',()=>{
    submit.disabled=true;
    finalAswer.innerHTML=`<p class="text-center fs-5">El código es: ${secretCode}</p>`
})

restart.addEventListener('click', ()=>{
    submit.disabled=false;
    giveUp.disabled=false;
    finalAswer.innerHTML="";
    results.innerHTML="";
})

