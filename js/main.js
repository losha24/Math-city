// רישום Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
  .then(() => console.log('Service Worker רשום בהצלחה'))
  .catch(err => console.log('שגיאה ברישום Service Worker:', err));
}

// התחלת המשחק
function startGame(){
    document.getElementById("startScreen").style.display="none";
    document.getElementById("gameScreen").style.display="block";

    generateMath();
    updateStats();
}

// יצירת 4 תרגילים 2x2
let exercises=[];

function generateMath(){
    exercises=[];
    let area=document.getElementById("mathArea");
    area.innerHTML="";

    for(let i=0;i<4;i++){
        let m=randomMath();
        exercises.push(m);

        let div=document.createElement("div");
        div.className="mathBox";

        div.innerHTML=`
            <div>${m.q}</div>
            <input type="number" id="ans${i}" placeholder="תשובה">
        `;

        area.appendChild(div);
    }
}

// בדיקה של התשובות
function checkAnswers(){
    let correct=0;

    for(let i=0;i<4;i++){
        let box=document.getElementsByClassName("mathBox")[i];
        let val=parseInt(document.getElementById("ans"+i).value);

        // ניקוי צבע קודם
        box.classList.remove("correct","wrong");

        if(val===exercises[i].a){
            box.classList.add("correct");
            correct++;
        } else {
            box.classList.add("wrong");
            // רוטט ותנסה שוב
            box.classList.add("shake");
            setTimeout(()=>{ box.classList.remove("shake"); },500);
        }
    }

    if(correct>0){
        addPoints(correct);
    }

    // מחליף תרגילים חדשים
    setTimeout(generateMath,1000);
}

// הוספת נקודות
function addPoints(p){
    let pts=load("points",0)+p;
    save("points",pts);

    addCoins(p*2); // מטבעות לפי נקודות
    updateStats();
}

// הוספת מטבעות
function addCoins(c){
    let coins=load("coins",0)+c;
    save("coins",coins);
}

// עדכון סטטיסטיקה בר
function updateStats(){
    document.getElementById("points").innerText=load("points",0);
    document.getElementById("coins").innerText=load("coins",0);

    let lvl=Math.floor(load("points",0)/50)+1;
    document.getElementById("level").innerText=lvl;
}

// איפוס המשחק
function resetGame(){
    localStorage.clear();
    location.reload();
}

// הצגת סטטיסטיקה
function showStats(){
    let pts = load("points",0);
    let coins = load("coins",0);
    let lvl = Math.floor(pts/50)+1;
    alert(`רמה: ${lvl}\nנקודות: ${pts}\nמטבעות: ${coins}`);
}

// גלגל מזל – ניתן כל 14 תרגילים נכונים
function spinReward(){
    let spins=load("spinCounter",0);
    spins++;
    if(spins<14){
        document.getElementById("rewardText").innerText="🎡 עוד לא הגיע הזמן לקבל פרס";
        save("spinCounter",spins);
        return;
    }

    // קבלת פרס
    let r=Math.floor(Math.random()*3);
    let coinsReward = (r+1)*10;
    addCoins(coinsReward);

    document.getElementById("rewardText").innerText=`🎡 קיבלת ${coinsReward} מטבעות!`;
    save("spinCounter",0);
}

// מתנה יומית
function dailyReward(){
    let today=new Date().toDateString();
    let last=load("daily","");

    if(today===last){
        document.getElementById("rewardText").innerText="כבר קיבלת היום מתנה יומית";
        return;
    }

    save("daily",today);
    addCoins(20);
    document.getElementById("rewardText").innerText="🎁 קיבלת 20 מטבעות";
}

// עדכון גרסה – אם אין גרסה חדשה רק רענון
async function checkUpdate(){
    try{
        let res=await fetch("version.json");
        let data=await res.json();

        let localVer=load("version","0");
        if(localVer!==data.version){
            save("version",data.version);
            location.reload(); // גרסה חדשה – רענון
        } else {
            location.reload(); // אין שינוי – רק רענון
        }
    } catch(e){
        console.log("שגיאה בבדיקת גרסה:",e);
        location.reload();
    }
}
