function random(min,max){
return Math.floor(Math.random()*(max-min+1))+min;
}

function generateExercises(){
document.querySelectorAll(".exercise").forEach(box=>{
let a=random(1,10);
let b=random(1,10);
box.dataset.answer=a+b;
box.querySelector(".q").innerText=a+" + "+b;
box.querySelector("input").value="";
box.classList.remove("correct","wrong");
});
}