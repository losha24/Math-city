// רישום Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker רשום בהצלחה'))
    .catch(err => console.log('שגיאה ברישום Service Worker:', err));
}

// פונקציות שמירה וטעינה בלוקאל
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function load(key, defaultValue) {
  let v = localStorage.getItem(key);
  return v ? JSON.parse(v) : defaultValue;
}

// התחלת המשחק
function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  generateMath();
  updateStats();
}

// מערך תרגילים
let exercises = [];
let solvedCounter = 0; // למעקב על גלגל פרסים

// יצירת 4 תרגילים 2x2
function generateMath() {
  exercises = [];
  let area = document.getElementById("mathArea");
  area.innerHTML = "";

  for (let i = 0; i < 4; i++) {
    let m = randomMath();
    exercises.push(m);

    let div = document.createElement("div");
    div.className = "mathBox";

    div.innerHTML = `
      <div>${m.q}</div>
      <input type="number" id="ans${i}" placeholder="תשובה">
    `;

    area.appendChild(div);
  }
}

// יצירת תרגיל רנדומלי פשוט
function randomMath() {
  let a = Math.floor(Math.random() * 10) + 1;
  let b = Math.floor(Math.random() * 10) + 1;
  return { q: `${a} + ${b} = ?`, a: a + b };
}

// בדיקה של כל התשובות
function checkAnswers() {
  let correct = 0;

  for (let i = 0; i < 4; i++) {
    let box = document.getElementsByClassName("mathBox")[i];
    let val = parseInt(document.getElementById("ans" + i).value);

    box.classList.remove("correct", "wrong");

    if (val === exercises[i].a) {
      box.classList.add("correct");
      correct++;
    } else {
      box.classList.add("wrong");
      box.classList.add("shake");
      setTimeout(() => box.classList.remove("shake"), 500);
    }
  }

  if (correct > 0) {
    addPoints(correct);
    solvedCounter += correct;
    if (solvedCounter >= 14) {
      spinReward();
      solvedCounter = 0;
    }
  }

  setTimeout(generateMath, 1000);
}

// הוספת נקודות ומטבעות
function addPoints(points) {
  let pts = load("points", 0) + points;
  save("points", pts);

  let coins = load("coins", 0) + points * 2;
  save("coins", coins);

  updateStats();
}

// עדכון הסטטיסטיקה
function updateStats() {
  document.getElementById("points").innerText = load("points", 0);
  document.getElementById("coins").innerText = load("coins", 0);
  document.getElementById("level").innerText = Math.floor(load("points", 0) / 50) + 1;
}

// איפוס המשחק
function resetGame() {
  localStorage.clear();
  location.reload();
}

// הצגת סטטיסטיקה
function showStats() {
  let pts = load("points", 0);
  let coins = load("coins", 0);
  let lvl = Math.floor(pts / 50) + 1;
  alert(`רמה: ${lvl}\nנקודות: ${pts}\nמטבעות: ${coins}`);
}

// גלגל מזל – מתנה כל 14 תרגילים נכונים
function spinReward() {
  let r = Math.floor(Math.random() * 3) + 1;
  let coinsReward = r * 10;
  addPoints(0); // נקודות לא משתנות
  save("coins", load("coins", 0) + coinsReward);
  document.getElementById("rewardText").innerText = `🎡 קיבלת ${coinsReward} מטבעות!`;
}

// מתנה יומית
function dailyReward() {
  let today = new Date().toDateString();
  let last = load("daily", "");

  if (today === last) {
    document.getElementById("rewardText").innerText = "כבר קיבלת היום מתנה יומית";
    return;
  }

  save("daily", today);
  addPoints(10); // 10 מטבעות יומיות
  document.getElementById("rewardText").innerText = "🎁 קיבלת 10 מטבעות!";
}

// עדכון גרסה מקצועי
async function checkUpdate() {
  try {
    let res = await fetch("version.json");
    let data = await res.json();

    let localVer = load("version", "0");
    if (localVer !== data.version) {
      save("version", data.version);
      location.reload(); // גרסה חדשה
    } else {
      location.reload(); // רק רענון
    }
  } catch (e) {
    console.log("שגיאה בבדיקת גרסה:", e);
    location.reload();
  }
}

// פונקציות ניהול הורים לחנות
function addShopItem(name, price, icon) {
  let shop = load("shop", []);
  shop.push({ name, price, icon });
  save("shop", shop);
  renderShop();
}

function deleteShopItem(index) {
  let shop = load("shop", []);
  shop.splice(index, 1);
  save("shop", shop);
  renderShop();
}

function editShopItem(index, name, price, icon) {
  let shop = load("shop", []);
  shop[index] = { name, price, icon };
  save("shop", shop);
  renderShop();
}

// הצגת חנות
function renderShop() {
  let shop = load("shop", []);
  let container = document.getElementById("shopArea");
  if (!container) return;
  container.innerHTML = "";
  shop.forEach((item, i) => {
    let div = document.createElement("div");
    div.className = "shopItem";
    div.innerHTML = `
      <img src="${item.icon}" width="50" height="50">
      <span>${item.name} - ${item.price} מטבעות</span>
      <button onclick="editShopItem(${i}, prompt('שם חדש'), prompt('מחיר חדש'), prompt('אייקון חדש'))">ערוך</button>
      <button onclick="deleteShopItem(${i})">מחק</button>
    `;
    container.appendChild(div);
  });
}
