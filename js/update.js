async function checkUpdate(){

let res=await fetch("version.json?"+Date.now());
let data=await res.json();

let current=localStorage.getItem("version");

if(current!==data.version){
localStorage.setItem("version",data.version);
location.reload(true);
}else{
location.reload();
}
}

function installApp(){
alert("התקן דרך הדפדפן");
}