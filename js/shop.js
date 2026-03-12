let shopOpen=false;

let shopItems=[
{name:"כדור",price:10,icon:"⚽"},
{name:"גלידה",price:15,icon:"🍦"},
{name:"ספר",price:20,icon:"📚"},
{name:"בלון",price:12,icon:"🎈"},
{name:"צעצוע",price:25,icon:"🧸"},
{name:"כוכב",price:40,icon:"⭐"},
{name:"רובוט",price:50,icon:"🤖"},
{name:"קוביה",price:35,icon:"🎲"},
{name:"עוגה",price:18,icon:"🍰"}
];

function toggleShop(){
let shop=document.getElementById("shop");
shopOpen=!shopOpen;
shop.style.display=shopOpen?"grid":"none";
if(shopOpen) renderShop();
}

function renderShop(){
let shop=document.getElementById("shop");
shop.innerHTML="";

shopItems.forEach((item,i)=>{
let div=document.createElement("div");
div.className="shopItem";
div.innerHTML=item.icon+"<br>"+item.name+"<br>"+item.price;
div.onclick=()=>buyItem(i);
shop.appendChild(div);
});
}

function buyItem(i){
let item=shopItems[i];
if(coins<item.price) return;
coins-=item.price;
alert("קנית "+item.name);
updateStats();
saveGame();
}