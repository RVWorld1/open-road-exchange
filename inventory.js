
const STORAGE_KEY="openRoadInventory";
function loadInventory(){
  const d=localStorage.getItem(STORAGE_KEY);
  return d?JSON.parse(d):[];
}
let inventory=loadInventory();
const list=document.getElementById("inventoryList");
function render(){
  list.innerHTML="";
  inventory.forEach(i=>{
    const div=document.createElement("div");
    div.className="inventory-card";
    div.innerHTML=`<h3>${i.title}</h3><p>${i.year} - ${i.type}</p><p>${i.price}</p>`;
    list.appendChild(div);
  });
}
render();
