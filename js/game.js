let level=1;
let points=0;
let coins=0;
let correctCount=0;

function checkAnswers(){
let wrong=false;

document.querySelectorAll(".exercise").forEach(box=>{
let val=parseInt(box.querySelector("input").value);
let ans=parseInt(box.dataset.answer);

if(val===ans){
box.classList.add("correct");
points++;
coins+=2;
correctCount++;
}else{
box.classList.add("wrong");
wrong=true;
}
});

if(!wrong){
generateExercises();
}

if(correctCount>=14){
coins+=random(10,40);
correctCount=0;
document.getElementById("message").innerText="קיבלת פרס!";
}

updateStats();
saveGame();
}

function updateStats(){
level=Math.floor(points/20)+1;
document.getElementById("level").innerText=level;
document.getElementById("points").innerText=points;
document.getElementById("coins").innerText=coins;
}

function showStats(){
alert("רמה "+level+"\nנקודות "+points+"\nמטבעות "+coins);
}

function resetGame(){
localStorage.clear();
location.reload();
}