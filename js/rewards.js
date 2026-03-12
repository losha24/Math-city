function dailyGift(){
let today=new Date().toDateString();
let last=localStorage.getItem("gift");

if(last===today){
document.getElementById("message").innerText="כבר קיבלת היום";
return;
}

let reward=random(20,50);
coins+=reward;

localStorage.setItem("gift",today);

document.getElementById("message").innerText="מתנה יומית "+reward;

updateStats();
saveGame();
}

function spinWheel(){
coins+=random(10,50);
document.getElementById("message").innerText="גלגל מזל!";
updateStats();
saveGame();
}