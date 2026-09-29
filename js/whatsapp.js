
// Configure this once with the real business WhatsApp number.
// Use international format without +, spaces or leading zero.
// Example: "2348012345678"
const WHATSAPP_NUMBER = "2347071731665";

function formatNaira(value){
  if(value === null || value === undefined || value === "") return "Price on request";
  return new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(Number(value));
}

function openWhatsApp(message){
  if(WHATSAPP_NUMBER.includes("X")){
    alert("Please configure the real MULTITALENTED WhatsApp number in js/whatsapp.js first.");
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url,"_blank","noopener");
}

function productWhatsAppMessage(product){
  const price = product.price == null ? "Price on request" : formatNaira(product.price);
  return `Hello MULTITALENTED,\n\nI would like to order:\n\nProduct: ${product.model} ${product.variant}\nPrice: ${price}\n\nPlease confirm availability and ordering details.`;
}

function generalWhatsApp(){
  openWhatsApp("Hello MULTITALENTED,\n\nI would like to make an enquiry about your phones, gadgets or repair services.");
}
