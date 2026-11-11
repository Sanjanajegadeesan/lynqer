// ===== CONFIG: change these =====
const CONFIG={whatsapp:"917430000123",email:"admin@thedeliveryboy.in"};
document.querySelector('.burger')?.addEventListener('click',()=>document.querySelector('nav').classList.toggle('open'));
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
function count(el){const t=+el.dataset.n,s=el.dataset.s||'';let n=0;const st=Math.ceil(t/60);const i=setInterval(()=>{n=Math.min(t,n+st);el.textContent=n+s;if(n>=t)clearInterval(i)},25)}
document.querySelectorAll('[data-n]').forEach(count);
const form=document.getElementById('enquiry');
if(form){
 const msg=document.getElementById('msg');
 const show=(t,err)=>{msg.textContent=t;msg.className='msg'+(err?' err':'');msg.style.display='block'};
 const data=()=>{const f=new FormData(form);return{name:f.get('name').trim(),phone:f.get('phone').trim(),email:f.get('email').trim(),service:f.get('service'),city:f.get('city').trim(),message:f.get('message').trim()}};
 const valid=d=>{if(!d.name||!/^[+\d\s-]{10,15}$/.test(d.phone)){show('Enter your name and a valid phone number.',true);return false}return true};
 document.getElementById('sendWa').addEventListener('click',()=>{const d=data();if(!valid(d))return;
  const t=`*New Enquiry - The Delivery Boy / Lynqer*%0A*Name:* ${encodeURIComponent(d.name)}%0A*Phone:* ${encodeURIComponent(d.phone)}%0A*Email:* ${encodeURIComponent(d.email)}%0A*Interested in:* ${encodeURIComponent(d.service)}%0A*City:* ${encodeURIComponent(d.city)}%0A*Message:* ${encodeURIComponent(d.message)}`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${t}`,'_blank');show('Opening WhatsApp… tap Send to deliver your message.')});
 document.getElementById('sendMail').addEventListener('click',async()=>{const d=data();if(!valid(d))return;
  show('Sending…');
  try{const r=await fetch(`https://formsubmit.co/ajax/${CONFIG.email}`,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({_subject:`New enquiry: ${d.service} - ${d.name}`,_template:'table',...d})});
   const j=await r.json();if(!r.ok||j.success==="false")throw 0;show('Thank you! Your email was sent. We will call you shortly.');form.reset()}
  catch(e){const b=encodeURIComponent(`Name: ${d.name}\nPhone: ${d.phone}\nCity: ${d.city}\nInterested in: ${d.service}\n\n${d.message}`);
   location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent('Enquiry: '+d.service)}&body=${b}`;show('Opening your email app as a fallback…')}});
}
