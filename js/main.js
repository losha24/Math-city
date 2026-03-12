// נתוני משחק
let level = 1, points = 0, coins = 0;
let correctAnswersCount = 0, parentMode = false;

// התחלת המשחק
function startGame() {
    document.getElementById('startScreen').style.display='none';
    document.getElementById('gameScreen').style.display='block';
    generateExercises();
    updateStats();
    loadShop();
}

// יצירת 4 תרגילים 2x2
function generateExercises() {
    const area = document.getElementById('mathArea');
    area.innerHTML = '';
    for(let i=0;i<4;i++){
        const div = document.createElement('div');
        div.className='mathBox';
        div.innerHTML = `<span id="ex${i}">${Math.floor(Math.random()*10)}+${Math.floor(Math.random()*10)}</span>
        <input type="number" id="ans${i}" />`;
        area.appendChild(div);
    }
}

// בדיקה של כל התרגילים
function checkAnswers() {
    let allCorrect=true;
    for(let i=0;i<4;i++){
        const ex = document.getElementById(`ex${i}`);
        const ans = document.getElementById(`ans${i}`);
        const correct = eval(ex.textContent);
        if(parseInt(ans.value)===correct){
            ex.parentElement.classList.add('correct');
            ex.parentElement.classList.remove('wrong','shake');
            points++; coins++; correctAnswersCount++;
        } else {
            ex.parentElement.classList.add('wrong','shake');
            ex.parentElement.classList.remove('correct');
            allCorrect=false;
        }
        ans.value='';
    }
    if(correctAnswersCount>=14){
        spinReward();
        correctAnswersCount=0;
    }
    updateStats();
    generateExercises();
}

// עדכון סטטיסטיקה
function updateStats() {
    document.getElementById('level').textContent = level;
    document.getElementById('points').textContent = points;
    document.getElementById('coins').textContent = coins;
}

// גלגל מזל
function spinReward(){
    document.getElementById('rewardText').textContent = "קיבלת פרס! 🎁";
}

// מתנה יומית
function dailyReward(){
    document.getElementById('rewardText').textContent = "מתנה יומית! 🎁";
}

// חנות
const shopItemsData=[
    {name:"פריט 1",price:5,icon:"🎯"},
    {name:"פריט 2",price:8,icon:"🛡️"},
    {name:"פריט 3",price:3,icon:"💎"},
    {name:"פריט 4",price:7,icon:"⚡"},
    {name:"פריט 5",price:6,icon:"🔥"},
    {name:"פריט 6",price:4,icon:"🍎"},
    {name:"פריט 7",price:9,icon:"🎵"},
    {name:"פריט 8",price:2,icon:"🌟"},
    {name:"פריט 9",price:1,icon:"🪙"},
];

function loadShop(){
    const div=document.getElementById('shopItems');
    div.innerHTML='';
    shopItemsData.forEach((item,i)=>{
        const it = document.createElement('div');
        it.className='shopItem';
        if(coins<item.price) it.classList.add('disabled');
        it.innerHTML=`<span>${item.icon}</span><br>${item.name}<br>${item.price} 💰`;
        if(parentMode){
            it.innerHTML+=`<br><button onclick="editItem(${i})">ערוך</button>
            <button onclick="deleteItem(${i})">מחק</button>`;
        }
        div.appendChild(it);
    });
}

function toggleParentMode(){
    parentMode=!parentMode;
    loadShop();
}

function editItem(index){
    const name=prompt("שם פריט:",shopItemsData[index].name);
    const price=prompt("מחיר:",shopItemsData[index].price);
    if(name) shopItemsData[index].name=name;
    if(price) shopItemsData[index].price=parseInt(price);
    loadShop();
}

function deleteItem(index){
    if(confirm("למחוק פריט?")) shopItemsData.splice(index,1);
    loadShop();
}

// איפוס משחק
function resetGame(){
    level=1; points=0; coins=0; correctAnswersCount=0;
    updateStats();
    generateExercises();
}

// עדכון גרסה
function checkUpdate(){
    fetch('version.json').then(r=>r.json()).then(v=>{
        const current="1.0.2";
        if(v.version!==current){alert("גרסה חדשה מותקנת"); location.reload();} 
        else location.reload();
    });
}
