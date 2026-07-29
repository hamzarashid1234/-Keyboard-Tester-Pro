const key=document.getElementById("key");
const code=document.getElementById("code");
const status=document.getElementById("status");
const count=document.getElementById("count");

let presses=0;

document.addEventListener("keydown",e=>{

presses++;

count.innerText=presses;

key.innerText=e.key===" "?"Space":e.key;

code.innerText=e.code;

status.innerText="Pressed";

document.querySelectorAll(".key").forEach(k=>{

if(

k.dataset.key.toLowerCase()==e.key.toLowerCase()

){

k.classList.add("active");

}

});

});

document.addEventListener("keyup",()=>{

status.innerText="Released";

document.querySelectorAll(".key").forEach(k=>{

k.classList.remove("active");

});

});