
const CART_KEY = "multitalented_cart";
function getCart(){try{return JSON.parse(localStorage.getItem(CART_KEY))||[]}catch{return[]}}
function addToCart(productId){
  const cart=getCart(); const item=cart.find(x=>x.id===productId);
  if(item)item.quantity+=1; else cart.push({id:productId,quantity:1});
  localStorage.setItem(CART_KEY,JSON.stringify(cart));
}
function cartCount(){return getCart().reduce((n,x)=>n+x.quantity,0)}
window.MULTITALENTED_CART={getCart,addToCart,cartCount};
