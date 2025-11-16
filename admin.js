
const STORAGE_KEY="openRoadInventory";
const ADMIN_USER="admin";
const ADMIN_PASS="openroad123";

function loadInventory(){
  const d=localStorage.getItem(STORAGE_KEY);
  return d?JSON.parse(d):[];
}
function saveInventory(list){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(list));
}

let inventory=loadInventory();
const loginSection=document.getElementById("loginSection");
const adminSection=document.getElementById("adminSection");

document.getElementById("loginBtn").onclick=()=>{
  let u=document.getElementById("adminUser").value;
  let p=document.getElementById("adminPass").value;
  if(u===ADMIN_USER && p===ADMIN_PASS){
    loginSection.style.display="none";
    adminSection.style.display="block";
    renderTable();
  } else {
    document.getElementById("loginError").textContent="Invalid login";
  }
};

function renderTable(){
  const body=document.getElementById("inventoryTableBody");
  body.innerHTML="";
  inventory.forEach((item)=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td>${item.title}</td>
      <td>${item.type}</td>
      <td>${item.year}</td>
      <td>${item.price}</td>
      <td>${item.status}</td>
      <td><button onclick="editItem('${item.id}')">Edit</button>
          <button onclick="deleteItem('${item.id}')">Delete</button></td>
    `;
    body.appendChild(tr);
  });
}

function deleteItem(id){
  inventory=inventory.filter(i=>i.id!==id);
  saveInventory(inventory);
  renderTable();
}

function editItem(id){
  const it=inventory.find(i=>i.id===id);
  if(!it)return;
  document.getElementById("vehicleId").value=it.id;
  document.getElementById("title").value=it.title;
  document.getElementById("type").value=it.type;
  document.getElementById("year").value=it.year;
  document.getElementById("price").value=it.price;
  document.getElementById("mileage").value=it.mileage;
  document.getElementById("stock").value=it.stock;
  document.getElementById("status").value=it.status;
  document.getElementById("image").value=it.image;
  document.getElementById("description").value=it.description;
}

document.getElementById("vehicleForm").onsubmit=(e)=>{
  e.preventDefault();
  const id=document.getElementById("vehicleId").value || Date.now().toString();
  const data={
    id,
    title:document.getElementById("title").value,
    type:document.getElementById("type").value,
    year:document.getElementById("year").value,
    price:document.getElementById("price").value,
    mileage:document.getElementById("mileage").value,
    stock:document.getElementById("stock").value,
    status:document.getElementById("status").value,
    image:document.getElementById("image").value,
    description:document.getElementById("description").value,
  };
  const idx=inventory.findIndex(i=>i.id===id);
  if(idx>=0) inventory[idx]=data;
  else inventory.push(data);
  saveInventory(inventory);
  renderTable();
  document.getElementById("vehicleForm").reset();
};

document.getElementById("resetBtn").onclick=()=>document.getElementById("vehicleForm").reset();
