function saveGame(){
localStorage.setItem("mathcity",JSON.stringify({
level,
points,
coins,
correctCount
}));
}

function loadGame(){
let data=localStorage.getItem("mathcity");
if(!data) return;

let d=JSON.parse(data);

level=d.level;
points=d.points;
coins=d.coins;
correctCount=d.correctCount;
}