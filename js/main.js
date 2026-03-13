let level=1, points=0, coins=0, correctAnswers=0, parentMode=false;
let shopItems=[
  {id:1,name:"פריט 1",price:10,icon:"⭐"},
  {id:2,name:"פריט 2",price:15,icon:"🍎"},
  {id:3,name:"פריט 3",price:20,icon:"🎁"},
  {id:4,name:"פריט 4",price:25,icon:"💎"},
  {id:5,name:"פריט 5",price:30,icon:"🍀"},
  {id:6,name:"פריט 6",price:12,icon:"🔔"},
  {id:7,name:"פריט 7",price:18,icon:"⚡"},
  {id:8,name:"פריט 8",price:22,icon:"🎉"},
  {id:9,name:"פריט 9",price:27,icon:"💡"}
];

function startGame(){
  document.getElementById('startScreen').style.display='none';
  document.getElementById('gameScreen').style.display='block';
  generateExercise(); updateStats(); loadShop();
}

function generateExercise(){
  const a=Math.floor(Math.random()*10), b=Math.floor(Math.random()*10);
  document.getElementById('exercise').textContent=`${a}+${b}`;
  document.getElementById('answer').value='';
  document.getElementById('answer').parentElement.classList.remove('correct','wrong');
}

function checkAnswer(){
  const ex=document.getElementById('exercise');
  const ans=document.getElementById('answer');
  const correct=eval(ex.textContent);
  if(Number(ans.value)===correct){
    ans.parentElement.classList.add('correct');
    points++; coins+=2; correctAnswers++;
    if(correctAnswers%14===0) spinReward();
    generateExercise();
    updateStats();
  } else{
    ans.parentElement.classList.add('wrong','shake');
    setTimeout(()=>{ans.parentElement.classList.remove('shake');},500);
  }
}

function updateStats(){
  document.getElementById('level').textContent=level;
  document.getElementById('points').textContent=points;
  document.getElementById('coins').textContent=coins;
}

function resetGame(){level=1; points=0; coins=0; correctAnswers=0; updateStats(); generateExercise();}

function checkUpdate(){ location.reload(); }

function spinReward(){ document.getElementById('rewardText').textContent="קיבלת מתנה מגלגל מזל!"; }

function dailyReward(){ document.getElementById('rewardText').textContent="קיבלת מתנה יומית!"; }

function loadShop(){
  const container=document.getElementById('shopItems');
  container.innerHTML='';
  shopItems.forEach(item=>{
    const div=document.createElement('div');
    div.className='shopItem';
    if(coins<item.price) div.classList.add('disabled');
    div.innerHTML=`${item.icon}<br>${item.name}<br>${item.price}💰`;
    if(parentMode){
      const edit=document.createElement('button'); edit.textContent='ערוך'; edit.onclick=()=>alert("ערוך פריט "+item.id); div.appendChild(edit);
      const del=document.createElement('button'); del.textContent='מחק'; del.onclick=()=>alert("מחק פריט "+item.id); div.appendChild(del);
    }
    container.appendChild(div);
  });
}

function toggleParentMode(){ parentMode=!parentMode; loadShop(); }
