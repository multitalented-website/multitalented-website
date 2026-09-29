
document.addEventListener("DOMContentLoaded",()=>{
  const form=document.getElementById("repairForm"); if(!form)return;
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const data=new FormData(form);
    const message=`Hello MULTITALENTED,\n\nI would like to request a phone repair.\n\nCustomer Name: ${data.get("name")}\nPhone Number: ${data.get("phone")}\nDevice Brand: ${data.get("brand")}\nDevice Model: ${data.get("model")}\nRepair Type: ${data.get("repairType")}\nProblem Description: ${data.get("problem")}\nPreferred Contact: ${data.get("contactMethod")}\n\nPlease advise on availability, assessment and next steps.`;
    document.getElementById("repairStatus").textContent="Preparing your WhatsApp repair request...";
    openWhatsApp(message);
  });
});
