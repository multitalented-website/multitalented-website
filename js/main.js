
document.addEventListener("DOMContentLoaded",()=>{
  const year=document.getElementById("year"); if(year) year.textContent=new Date().getFullYear();
  const toggle=document.getElementById("menuToggle"), nav=document.getElementById("mainNav");
  if(toggle&&nav){toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});}
  const general=document.getElementById("generalWhatsapp"); if(general) general.addEventListener("click",generalWhatsApp);
  const featured=document.getElementById("featuredProducts");
  if(featured && window.MULTITALENTED_PRODUCTS){
    const list=window.MULTITALENTED_PRODUCTS.filter(p=>p.featured && p.price!==null).slice(0,4);
    featured.innerHTML=list.map(productCard).join("");
    featured.querySelectorAll("[data-product]").forEach(bindProductActions);
  }
});

function productCard(p){
  const image=p.image && !p.image.endsWith("placeholder.svg") ? `<img src="${p.image}" alt="${escapeHtml(p.model+" "+p.variant)}" loading="lazy">` : `<div class="product-placeholder">${escapeHtml(p.brand)}<br>MULTITALENTED</div>`;
  const price=p.price==null?"Price on request":formatNaira(p.price);
  const status=p.price==null?"Price not supplied":p.availability;
  return `<article class="product-card">
    <div class="product-image">${image}</div>
    <div class="product-body">
      <div class="product-brand">${escapeHtml(p.brand)}</div>
      <h3>${escapeHtml(p.model)}</h3>
      <div class="variant">${escapeHtml(p.variant)}</div>
      <div class="price">${price}</div>
      <div class="availability">● ${escapeHtml(status)}</div>
      <div class="product-actions">
        <button class="btn btn-light" data-product="${p.id}" data-action="view">View Details</button>
        <button class="btn btn-dark" data-product="${p.id}" data-action="whatsapp">Order on WhatsApp</button>
      </div>
    </div>
  </article>`;
}
function bindProductActions(btn){
  btn.addEventListener("click",()=>{
    const p=window.MULTITALENTED_PRODUCTS.find(x=>x.id===btn.dataset.product);
    if(!p)return;
    if(btn.dataset.action==="whatsapp") openWhatsApp(productWhatsAppMessage(p));
    else if(window.openProductModal) window.openProductModal(p);
  });
}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
