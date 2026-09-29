
document.addEventListener("DOMContentLoaded",()=>{
  if(!window.MULTITALENTED_PRODUCTS || !document.getElementById("productGrid")) return;
  const els={
    search:document.getElementById("searchInput"),brand:document.getElementById("brandFilter"),
    model:document.getElementById("modelFilter"),ram:document.getElementById("ramFilter"),
    storage:document.getElementById("storageFilter"),sort:document.getElementById("sortFilter")
  };
  const fill=(select,values)=>values.filter(Boolean).sort().forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;select.appendChild(o)});
  fill(els.brand,[...new Set(MULTITALENTED_PRODUCTS.map(p=>p.brand))]);
  fill(els.ram,[...new Set(MULTITALENTED_PRODUCTS.map(p=>p.ram))]);
  fill(els.storage,[...new Set(MULTITALENTED_PRODUCTS.map(p=>p.storage))]);
  const params=new URLSearchParams(location.search); if(params.get("brand")) els.brand.value=params.get("brand");
  function refreshModels(){const current=els.model.value;els.model.innerHTML='<option value="">All models</option>';let list=MULTITALENTED_PRODUCTS;if(els.brand.value)list=list.filter(p=>p.brand===els.brand.value);fill(els.model,[...new Set(list.map(p=>p.model))]);if([...els.model.options].some(o=>o.value===current))els.model.value=current;}
  function render(){
    refreshModels();
    let list=[...MULTITALENTED_PRODUCTS];
    const q=els.search.value.trim().toLowerCase();
    if(q)list=list.filter(p=>[p.brand,p.model,p.variant,p.storage,p.ram].filter(Boolean).join(" ").toLowerCase().includes(q));
    if(els.brand.value)list=list.filter(p=>p.brand===els.brand.value);
    if(els.model.value)list=list.filter(p=>p.model===els.model.value);
    if(els.ram.value)list=list.filter(p=>p.ram===els.ram.value);
    if(els.storage.value)list=list.filter(p=>p.storage===els.storage.value);
    if(els.sort.value==="price-asc")list.sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));
    if(els.sort.value==="price-desc")list.sort((a,b)=>(b.price??-1)-(a.price??-1));
    if(els.sort.value==="name")list.sort((a,b)=>(a.brand+" "+a.model+" "+a.variant).localeCompare(b.brand+" "+b.model+" "+b.variant));
    else if(els.sort.value==="featured")list.sort((a,b)=>Number(b.featured)-Number(a.featured));
    document.getElementById("resultCount").textContent=`${list.length} product${list.length===1?"":"s"}`;
    const grid=document.getElementById("productGrid"); grid.innerHTML=list.map(productCard).join("");
    document.getElementById("emptyState").classList.toggle("hidden",list.length!==0);
    grid.querySelectorAll("[data-product]").forEach(bindProductActions);
  }
  [els.search,els.brand,els.model,els.ram,els.storage,els.sort].forEach(x=>x.addEventListener("input",render));
  document.getElementById("clearFilters").addEventListener("click",()=>{els.search.value="";els.brand.value="";els.model.value="";els.ram.value="";els.storage.value="";els.sort.value="featured";render()});
  render();
});

window.openProductModal=function(p){
  const modal=document.getElementById("productModal"),content=document.getElementById("modalContent");
  if(!modal||!content)return;
  const image=p.image && !p.image.endsWith("placeholder.svg") ? `<img src="${p.image}" alt="${escapeHtml(p.model+" "+p.variant)}">` : `<div class="product-placeholder">${escapeHtml(p.brand)}<br>MULTITALENTED</div>`;
  content.innerHTML=`<div class="modal-product"><div class="product-image">${image}</div><div><div class="product-brand">${escapeHtml(p.brand)}</div><h2 id="modalTitle">${escapeHtml(p.model)}</h2><p>${escapeHtml(p.variant)}</p><p><strong>RAM:</strong> ${escapeHtml(p.ram||"Not supplied")}</p><p><strong>Storage:</strong> ${escapeHtml(p.storage||"Not supplied")}</p><p class="price">${p.price==null?"Price on request":formatNaira(p.price)}</p><p class="muted">${p.price==null?"The supplied catalogue image did not show a price for this item.":"Catalogue price supplied by owner."}</p><button class="btn btn-dark" id="modalWhatsapp">Order on WhatsApp</button></div></div>`;
  modal.classList.remove("hidden");modal.setAttribute("aria-hidden","false");
  document.getElementById("modalWhatsapp").addEventListener("click",()=>openWhatsApp(productWhatsAppMessage(p)));
};
document.addEventListener("click",e=>{if(e.target.matches("[data-close-modal]")){const m=document.getElementById("productModal");if(m){m.classList.add("hidden");m.setAttribute("aria-hidden","true")}}});
