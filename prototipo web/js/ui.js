/* ui.js
   Interfaz común: barra de mensajes, sonidos, confeti, burbujas, avisos estilo Wii U, puntos del usuario y widgets (sliders, tarjetas de color). */
const say=h=>$("#bar").innerHTML=h;let timer,TP=null,RD=null,AC;
const beep=(f,d=.09)=>{try{AC=AC||new AudioContext();const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;g.gain.setValueAtTime(.07,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}catch(e){}};
document.addEventListener("click",e=>{if(e.target.closest("button,.mt"))beep(660,.07)});
function confetti(){const c=["#c04ee0","#e84fb0","#ff9a2e","#7bd62b","#2fa8e0","#f2d21e"];for(let i=0;i<34;i++){const s=document.createElement("span");s.className="cf";s.style.cssText=`left:${rnd(5,95)}%;background:${c[i%6]};--x:${ri(-80,80)}px;animation-delay:${rnd(0,.4)}s`;document.body.append(s);setTimeout(()=>s.remove(),2300)}beep(880,.2)}
for(let i=0;i<16;i++){const b=document.createElement("i"),z=ri(30,110);b.className="bub";b.style.cssText=`width:${z}px;height:${z}px;left:${ri(0,98)}%;animation-duration:${ri(14,32)}s;animation-delay:-${ri(0,30)}s`;$("#bubs").append(b)}
const hudU=()=>{$("#pts").textContent="⭐ "+(S.pt||0)+" pts"};
const toast=h=>{const t=$("#toast");t.innerHTML=h;t.classList.add("on");beep(990,.15);clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),2800)};
function addPts(n){n=Math.round(n);if(n<=0)return;const o=S.pt||0;S.pt=o+n;save();hudU();ARC.forEach(a=>{if(a[3]>o&&a[3]<=S.pt)toast("🔓 ¡Desbloqueaste: "+a[0]+"!")})}
const sw=(l,id,c)=>`<div class="tile"><small>${l}</small><div class="sw" id="${id}" style="background:${c||"#fff"}"></div></div>`;
function sliders(c,defs,f){c.innerHTML=defs.map(d=>`<label>${d[1]}<input type="range" id="s_${d[0]}" min="${d[2]}" max="${d[3]}" value="${d[4]}"><b></b></label>`).join("");
 const get=()=>Object.fromEntries(defs.map(d=>[d[0],+$("#s_"+d[0]).value]));
 c.oninput=()=>{defs.forEach(d=>{const e=$("#s_"+d[0]);e.nextElementSibling.textContent=e.value});f(get())};c.oninput();return get}
