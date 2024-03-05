//-------//
//-Tiers-//
//-------//
class Tiers{
  constructor(name, color, members){
    this.name = name;
    this.color = color;
    this.members = members;
  }
}
let tiers = [new Tiers("S", "B9F2FF", []), new Tiers("A", "FFD700", []), new Tiers("B", "C0C0C0", [])];
//-------//
//Members//
//-------//
class Members{
  constructor(name, description, image){
    this.name = name;
    this.description = description;
    this.image = image;
  }
}
let aMembers = [];
let rMembers = [];
//====//
//Grow//
//====//
function grow(){
    if (document.documentElement.scrollTop > 150) {
        document.getElementById("description").style.width = "100%";
      } else {
        document.getElementById("description").style.width = "95%";
      }
}
//===============//
//Create New Tier//
//===============//
function createNewTier(){
  tiers[tiers.length] = new Tiers("", "808080", []);
  tierer();
}
//============//
//Fit Contetnt//
//============//
function fitContent(number){
  tiers[number].name = document.getElementsByClassName("tiername")[number].value;
  let fontsize = 4;
  let adjust = 0.8;
  if(document.getElementsByClassName("tiername")[number].value.length > 4){
    for(let x = 0; x < document.getElementsByClassName("tiername")[number].value.length - 4; x++){
      fontsize = fontsize * adjust;
      adjust = 1 - (1 - adjust) * 0.9;
    }
  }
  document.getElementsByClassName("tiername")[number].style.fontSize = fontsize + "rem";
}
//======//
//Tierer//
//======//
function tierer(){
  let scroll = document.documentElement.scrollTop;
  rMembers = aMembers;
  while(document.getElementsByClassName("tier").length > 0){
    document.getElementsByClassName("tier")[0].remove();
  }
  while(document.getElementsByClassName("member").length > 0){
    document.getElementsByClassName("member")[0].remove();
  }
  for(const x in tiers){
    let t = document.createElement("div");
    t.classList.add("tier")
    let tL = document.createElement("div");
    tL.classList.add("tierlistname");
    let i = document.createElement("input");
    i.classList.add("tiername");
    i.style.order = "1";
    i.style.backgroundColor = "#" + tiers[x].color;
    tL.style.backgroundColor = "#" + tiers[x].color;
    i.value = tiers[x].name;
    tL.appendChild(i);
    let d = document.createElement("div");
    d.classList.add("placeble");
    d.style.backgroundColor = "#" + tiers[x].color;
    d.ondrop = function(){drop(event)};
    d.ondragover = function(){allowDrop(event)};
    let b = document.createElement("div");
    let bC = document.createElement("div");
    let bB = document.createElement("div");
    let cB = document.createElement("input");
    b.classList.add("buttons");
    bC.classList.add("button");
    bC.classList.add("small");
    bC.style.backgroundColor = "#" + tiers[x].color;    
    bC.onclick = function(){changePosition(x, -1)};
    bB.classList.add("button");
    bB.classList.add("small");
    bB.style.backgroundColor = "#" + tiers[x].color;    
    bB.onclick = function(){changePosition(x, 1)};
    cB.classList.add("button");
    cB.classList.add("big");
    cB.style.backgroundColor = "#" + tiers[x].color;
    cB.style.color = "#" + tiers[x].color;
    cB.value = tiers[x].color;
    cB.onchange = function(){colorChange(x)};
    cB.onclick = function(){colorButtonIn(x)};
    cB.onblur = function(){colorButtonOut(x)};
    b.appendChild(bC);
    b.appendChild(cB);
    b.appendChild(bB);
    t.appendChild(b);
    t.appendChild(tL);
    t.appendChild(d);
    i.onchange = function(){fitContent(x)};
    if(hex(x)){
      i.style.color = "black";
    } else{
      i.style.color = "white";
    }

    //=========//
    //Membering//
    //=========//
    for(const y in tiers[x].members){
      let o = document.createElement("img");
      o.src = tiers[x].members[y].image;
      o.classList.add("member");
      o.alt = tiers[x].members[y].name;
      o.id = tiers[x].members[y].name;
      o.onmouseover = function(){showCharacter(this)}
      o.draggable = true;
      o.ondragstart = function(){drag(event)};
      tL.appendChild(o);
      rMembers = rMembers.remove(tiers[x].members[y]);
    }
    document.getElementById("tierlist").appendChild(t);
  }
  let L = document.createElement("div");
  L.classList.add("tier");
  L.innerText = "+";
  L.onclick = function(){createNewTier()};
  //============//
  //More Members//
  //============//
  for(const x in rMembers){
    let o = document.createElement("img");
      o.src = rMembers[x].image;
      o.classList.add("member");
      o.alt = rMembers[x].name;
      o.id = rMembers[x].name;
      o.onmouseover = function(){showCharacter(this)}
      o.draggable = true;
      o.ondragstart = function(){drag(event)};
      document.getElementById("rest").appendChild(o);
  }
  let m = document.createElement("div");
  m.classList.add("member");
  m.innerText = "+";
  m.onclick = function(){bring()}
  document.getElementById("rest").appendChild(m);
  document.getElementById("tierlist").appendChild(L);
  document.documentElement.scrollTop = scroll;
}
//============//
//Color change//
//============//
function colorChange(number) {
  let isColor = false;
  if(document.getElementsByClassName("big")[number].value.length == 6){
    for(let x of document.getElementsByClassName("big")[number].value){
      if(x.toUpperCase() in ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]){
        isColor = true;
      }
    }
  }
  if(isColor){
    tiers[number].color = document.getElementsByClassName("big")[number].value.toUpperCase();
  }
  tierer();
}
//===================//
//Color Change Button//
//===================//
function colorButtonIn(number) {
  if(hex(number)){
    document.getElementsByClassName("big")[number].style.color = "black";
  } else{
    document.getElementsByClassName("big")[number].style.color = "white";
  }
}
function colorButtonOut(number) {
  document.getElementsByClassName("big")[number].style.color = "#" + tiers[number].color;
}
//===//
//hex//
//===//
function hex(number){
  switch(tiers[number].color[0]){
    case '8': return true;
    case '9': return true;
    case 'A': return true;
    case 'B': return true;
    case 'C': return true;
    case 'D': return true;
    case 'E': return true;
    case 'F': return true;
  }
  switch(tiers[number].color[2]){
    case '8': return true;
    case '9': return true;
    case 'A': return true;
    case 'B': return true;
    case 'C': return true;
    case 'D': return true;
    case 'E': return true;
    case 'F': return true;
  }
  switch(tiers[number].color[4]){
    case '8': return true;
    case '9': return true;
    case 'A': return true;
    case 'B': return true;
    case 'C': return true;
    case 'D': return true;
    case 'E': return true;
    case 'F': return true;
  }
  return false;
}
//===============//
//Change Position//
//===============//
function changePosition(x, opr){
  if(parseInt(x) + parseInt(opr) < 0){
    return;
  }else if(parseInt(x) + parseInt(opr) > tiers.length - 1){
    return;
  }
  let next = parseInt(x) + parseInt(opr);
  let nextTier = tiers[next];
  tiers[next] = tiers[x];
  tiers[x] = nextTier;
  tierer();
}
//========//
//Creation//
//========//
function bring(){
  document.getElementById("creation").classList.add("activeCreation");
}
function lift(){
  document.getElementById("creation").classList.remove("activeCreation");
}
//=============//
//New Character//
//=============//
function newCharacter(){
  aMembers[aMembers.length] = new Members(document.getElementsByClassName("panelTop")[0].value,
  document.getElementById("memberDescription").value,
  document.getElementsByClassName("panelTop")[1].value);
  tierer();
}
//==============//
//Show Character//
//==============//
function showCharacter(m){
  const checkAlt = (x) => x.name == m.alt;
  a = aMembers[aMembers.findIndex(checkAlt)];
  document.getElementById("tierlistName").innerText = a.name;
  document.getElementById("tierlistName").style.fontSize = "4rem";
  document.getElementById("tierlistImage").src = a.image;
  document.getElementById("tierlistDescription").innerText = a.description;
}
//============//
//Change Image//
//============//
function changeImage(){
  document.getElementById("memberImage").src = document.getElementsByClassName("panelTop")[1].value;
  document.getElementById("memberImage").alt = document.getElementsByClassName("panelTop")[0].value;
}
//=============//
//Drag and Drop//
//=============//
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}